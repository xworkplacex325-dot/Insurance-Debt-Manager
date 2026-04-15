import { logout } from "../hooks/useSupabaseUser";
import { useLanguage } from "../contexts/LanguageContext";

export default function PendingApprovalScreen({ subtitle }) {
  const { t } = useLanguage();
  function handleSignOut() {
    logout();
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-background
        p-6 text-on-surface dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="max-w-md rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <span
          className="material-symbols-outlined mb-4 text-4xl text-primary
            dark:text-blue-400"
        >
          hourglass_top
        </span>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">{t("pending.title")}</h1>
        <p className="mb-2 text-on-surface-variant dark:text-slate-400">
          {subtitle ?? t("pending.subtitle")}
        </p>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full rounded-lg border border-outline-variant px-4 py-3 text-sm font-bold
            transition-colors hover:bg-surface-container-high dark:border-slate-700"
        >
          {t("pending.signOut")}
        </button>
      </div>
    </div>
  );
}
