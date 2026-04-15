import { Link } from "react-router-dom";

export default function AccountRejectedPage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-background p-6
        text-on-surface dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="max-w-md rounded-2xl border border-error-container/30 bg-error-container/10 p-10 dark:border-error/30 dark:bg-error/10">
        <span className="material-symbols-outlined mb-4 text-4xl text-error dark:text-error-container">
          block
        </span>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Account not approved</h1>
        <p className="mb-6 text-on-surface-variant dark:text-slate-400">
          Your registration was reviewed and was not approved. If you believe this is a mistake,
          contact your registry administrator.
        </p>
        <Link
          to="/login"
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4
            py-3 text-center text-sm font-bold text-on-primary transition-colors
            hover:brightness-110"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
