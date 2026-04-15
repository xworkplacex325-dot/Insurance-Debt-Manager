import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthGate } from "../hooks/useAuthGate";
import PendingApprovalScreen from "../components/PendingApprovalScreen";
import RejectedAccountRedirect from "../components/RejectedAccountRedirect";

export default function ProtectedLayout() {
  const location = useLocation();
  const gate = useAuthGate();

  if (gate.state === "loading") {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-background text-on-surface
          dark:bg-slate-950 dark:text-slate-100"
      >
        <p className="text-sm text-on-surface-variant dark:text-slate-400">Loading session…</p>
      </div>
    );
  }

  if (gate.state === "error") {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center bg-background p-6
          text-on-surface dark:bg-slate-950"
      >
        <p className="mb-2 text-center text-sm font-semibold text-error dark:text-error-container">
          {gate.error?.message ?? "Could not verify your account."}
        </p>
        <p className="max-w-md text-center text-xs text-on-surface-variant dark:text-slate-400">
          Ensure <code className="rounded bg-black/10 px-1">public.users</code> exists and RLS
          policies are installed (see <code className="rounded bg-black/10 px-1">supabase/setup-users-approval.sql</code>
          ).
        </p>
      </div>
    );
  }

  if (gate.state === "unauthenticated") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (gate.state === "pending") {
    return <PendingApprovalScreen email={gate.user?.email} />;
  }

  if (gate.state === "no_profile_row") {
    return (
      <PendingApprovalScreen
        email={gate.user?.email}
        subtitle="We could not find your user record. Ask an administrator to sync your account or run the database setup script."
      />
    );
  }

  if (gate.state === "rejected") {
    return <RejectedAccountRedirect />;
  }

  return <Outlet />;
}
