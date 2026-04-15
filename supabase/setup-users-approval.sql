-- =============================================================================
-- User approval system: public.users + RLS + auth trigger
-- Run in Supabase SQL Editor (or migrate). Adjust if public.users already exists.
-- =============================================================================

-- 1) TABLE -------------------------------------------------------------------
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  username text,
  created_at timestamptz not null default now()
);

alter table public.users add column if not exists status text default 'pending';
alter table public.users add column if not exists role text default 'user';

-- Normalize existing rows before adding CHECK constraints
update public.users set status = 'pending' where status is null or status = '';
update public.users set role = 'user' where role is null or role = '';

alter table public.users drop constraint if exists users_status_check;
alter table public.users
  add constraint users_status_check check (status in ('pending', 'approved', 'rejected'));

alter table public.users drop constraint if exists users_role_check;
alter table public.users add constraint users_role_check check (role in ('user', 'admin'));

alter table public.users enable row level security;

-- 2) HELPER (avoids RLS recursion on admin checks) ----------------------------
create or replace function public.is_users_admin ()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.users u
    where u.id = auth.uid()
      and u.role = 'admin'
  );
$$;

-- 3) RLS POLICIES ------------------------------------------------------------
drop policy if exists "Users read own row" on public.users;
create policy "Users read own row" on public.users for select using (auth.uid() = id);

drop policy if exists "Admins read all users" on public.users;
create policy "Admins read all users" on public.users for select using (public.is_users_admin());

drop policy if exists "Users insert own row" on public.users;
create policy "Users insert own row" on public.users for insert with check (auth.uid() = id);

drop policy if exists "Admins update user status" on public.users;
create policy "Admins update user status" on public.users for update
using (public.is_users_admin())
with check (public.is_users_admin());

-- 4) SYNC new auth users into public.users (server-side; pairs with client upsert)
create or replace function public.handle_auth_user_to_public_users ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, username, status, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'username', split_part(coalesce(new.email, ''), '@', 1)),
    'pending',
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_public_users on auth.users;
create trigger on_auth_user_created_public_users
  after insert on auth.users
  for each row
  execute procedure public.handle_auth_user_to_public_users ();

-- 5) BOOTSTRAP: promote your first admin (replace UUID from Authentication → Users)
-- update public.users set role = 'admin', status = 'approved' where id = 'YOUR-USER-UUID';

-- 6) OPTIONAL: Database Webhook → Edge Function notify-admin
-- In Dashboard: Database → Webhooks → Create hook on INSERT to public.users
-- URL: https://<project-ref>.supabase.co/functions/v1/notify-admin
-- HTTP Headers: Authorization: Bearer <anon or service role per your setup>
-- See supabase/functions/notify-admin/index.ts

-- 7) Login: map username → Supabase Auth email (reads auth.users; no public.users.email needed)
create or replace function public.get_login_email (login_handle text)
returns text
language sql
security definer
set search_path = public, auth
stable
as $$
  select au.email::text
  from auth.users au
  where lower(trim(coalesce(au.raw_user_meta_data->>'username', ''))) = lower(trim(login_handle))
     or lower(trim(split_part(au.email, '@', 1))) = lower(trim(login_handle))
     or lower(trim(au.email)) = lower(trim(login_handle))
  limit 1;
$$;

revoke all on function public.get_login_email (text) from public;
grant execute on function public.get_login_email (text) to anon;
grant execute on function public.get_login_email (text) to authenticated;

create or replace function public.lookup_login_email (p_username text)
returns text
language sql
security definer
set search_path = public, auth
stable
as $$
  select public.get_login_email (p_username);
$$;

revoke all on function public.lookup_login_email (text) from public;
grant execute on function public.lookup_login_email (text) to anon;
grant execute on function public.lookup_login_email (text) to authenticated;

select pg_notify('pgrst', 'reload schema');
