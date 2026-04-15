import { useEffect, useState } from "react";
import { supabase } from "./useSupabase";
export const SUPABASE_USER_QUERY_KEY = ["supabase-user"];
// Simple user state stored in localStorage
export function useSupabaseUser() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return {
    data: {
      user: data,
      appUser: data,
    },
    isLoading: false,
    error: null,
  };
}

export function isUserAdmin(user, appUser) {
  return appUser?.role === "admin" || appUser?.is_admin === true;
}

// Call this on login page
export async function loginWithUsername(username, password) {
  const rawUsername = username.trim();
  const rawPassword = password.trim();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", rawUsername)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  if (!data || String(data.password) !== rawPassword) {
    throw new Error("Invalid username or password");
  }



  localStorage.setItem("user", JSON.stringify(data));
  return data;
}
// Call this on logout
export function logout() {
  localStorage.removeItem("user");
  window.location.href = "/login";
}