-- Paste in Supabase SQL Editor (run the whole block).
-- 1) Resolves Auth email from auth.users (no public.users.email column needed).
-- 2) NOTIFY forces PostgREST to reload so "schema cache" errors go away.

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

-- Backwards-compatible alias (same body) if anything still calls the old name
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

-- Reload PostgREST schema cache (fixes "Could not find the function ... in the schema cache")
select pg_notify('pgrst', 'reload schema');
