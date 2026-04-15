import { useSupabaseUser } from "./useSupabaseUser";

/**
 * @typedef {'loading' | 'unauthenticated' | 'no_profile_row' | 'pending' | 'rejected' | 'approved' | 'error'} AuthGateState
 */

/**
 * Central gate: session + public.users row (status / role).
 * Use inside protected shell only (after public routes).
 */
export function useAuthGate() {
  const { data, isPending, isError, error } = useSupabaseUser();

  if (isPending) {
    return { state: "loading", user: null, appUser: null, error: null };
  }

  if (isError) {
    return {
      state: "error",
      user: null,
      appUser: null,
      error: error ?? new Error("Failed to load session"),
    };
  }

  const user = data?.user ?? null;
  const appUser = data?.appUser ?? null;

  if (!user) {
    return { state: "unauthenticated", user: null, appUser: null, error: null };
  }

  if (!appUser) {
    return { state: "no_profile_row", user, appUser: null, error: null };
  }

  if (appUser.status === "rejected") {
    return { state: "rejected", user, appUser, error: null };
  }

  if (appUser.status === "pending") {
    return { state: "pending", user, appUser, error: null };
  }

  if (appUser.status === "approved") {
    return { state: "approved", user, appUser, error: null };
  }

  return { state: "pending", user, appUser, error: null };
}
