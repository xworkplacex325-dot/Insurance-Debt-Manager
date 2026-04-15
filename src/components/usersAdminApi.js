import { supabase } from "../hooks/useSupabase";

export const PENDING_USERS_QUERY_KEY = ["users", "pending"];

export async function fetchPendingUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, email, created_at, status, role")
    .eq("status", "pending")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function updateUserStatus(userId, status) {
  const { error } = await supabase.from("users").update({ status }).eq("id", userId);
  if (error) throw error;
}
