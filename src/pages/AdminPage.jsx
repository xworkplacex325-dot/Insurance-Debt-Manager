import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../hooks/useSupabase";
import { useTheme } from "../contexts/ThemeContext";
import { useSupabaseUser, isUserAdmin, logout } from "../hooks/useSupabaseUser";
import { toast } from "react-toastify";
import { useLanguage } from "../contexts/LanguageContext";

export default function AdminPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { data: authPayload } = useSupabaseUser();
  const appUser = authPayload?.appUser ?? null;
  const admin = true; // For now assuming admin, or we can use isUserAdmin(authPayload?.user, appUser);

  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPendingUsers() {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("status", "pending");

      if (error) {
        toast.error("Failed to load pending users.");
      } else {
        setPendingUsers(data || []);
      }
      setLoading(false);
    }
    fetchPendingUsers();
  }, []);

  async function handleAccept(id) {
    const { data, error } = await supabase
      .from("users")
      .update({ status: "approved" })
      .eq("id", id)
      .select();

    if (error || !data || data.length === 0) {
      toast.error("Failed to approve user. Please ensure your UPDATE RLS policy is configured.");
      return;
    }
    toast.success("User approved successfully!");
    setPendingUsers((prev) => prev.filter((u) => u.id !== id));
  }

  async function handleReject(id) {
    const { data, error } = await supabase
      .from("users")
      .update({ status: "rejected" })
      .eq("id", id)
      .select();

    if (error || !data || data.length === 0) {
      toast.error("Failed to reject user. Please ensure your UPDATE RLS policy is configured.");
      return;
    }
    toast.info("User rejected.");
    setPendingUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div
      className="flex min-h-screen bg-background pt-20 text-on-surface
        dark:bg-slate-950 dark:text-slate-50"
    >
      <nav
        className="fixed top-0 z-50 mx-auto flex w-full max-w-screen-2xl items-center
          justify-between border-b border-transparent bg-slate-50/80 px-8 py-4 shadow-sm
          backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90"
      >
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {t("app.title")}
          </span>
          <div className="ml-10 hidden items-center space-x-8 md:flex">
            <Link
              to="/"
              className="rounded-lg px-3 py-1 text-slate-500 transition-colors
                hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50"
            >
              {t("nav.dashboard")}
            </Link>
            <Link
              to="/settings"
              className="rounded-lg px-3 py-1 text-slate-500 transition-colors
                hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50"
            >
              {t("nav.settings")}
            </Link>
            <span
              className="rounded-lg border-b-2 border-blue-700 px-3 py-1 font-bold
                text-blue-700 dark:border-blue-400 dark:text-blue-400"
            >
              {t("nav.userApprovals")}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4 space-y-0">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full p-2 text-slate-500
              transition-colors hover:bg-slate-200/50 dark:text-slate-400
              dark:hover:bg-slate-800/50"
          >
            <span className="material-symbols-outlined">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-700">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                {appUser?.username || t("role.guest")}
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {admin ? t("role.administrator") : t("role.registryUser")}
              </p>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full
                bg-surface-container-highest text-sm font-bold text-on-surface-variant
                dark:bg-slate-800 dark:text-slate-300"
            >
              {(appUser?.username || "?").charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <aside
        className="fixed bottom-0 top-20 hidden h-full w-64 flex-col space-y-8
          bg-slate-100 p-6 dark:bg-slate-900/80 lg:flex"
      >
        <div className="space-y-1">
          <p
            className="mb-4 px-4 text-[10px] font-bold uppercase tracking-[0.1em]
              text-outline dark:text-slate-500"
          >
            {t("nav.navigation")}
          </p>
          <Link
            to="/"
            className="group flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600
              transition-all duration-200 hover:bg-slate-200 hover:text-slate-900
              dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
          >
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            <span className="font-medium">{t("nav.dashboard")}</span>
          </Link>
          <Link
            to="/admin"
            className="group flex items-center gap-3 rounded-lg bg-white px-4 py-3 font-semibold
              text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-400"
          >
            <span className="material-symbols-outlined" data-icon="group">
              group
            </span>
            <span className="font-medium">{t("nav.userApprovals")}</span>
          </Link>
          <Link
            to="/admin/users"
            className="group flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600
              transition-all duration-200 hover:bg-slate-200 hover:text-slate-900
              dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
          >
            <span className="material-symbols-outlined" data-icon="manage_accounts">
              manage_accounts
            </span>
            <span className="font-medium">{t("nav.appUsers")}</span>
          </Link>
        </div>
        <div className="mt-auto space-y-1">
          <Link
            to="/settings"
            className="group flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600
              transition-all duration-200 hover:bg-slate-200 hover:text-slate-900
              dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
          >
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
              <span className="font-medium">{t("nav.settings")}</span>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left
              text-slate-600 transition-all duration-200 hover:bg-slate-200
              hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800
              dark:hover:text-slate-50"
          >
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            <span className="font-medium">{t("nav.signOut")}</span>
          </button>
        </div>
      </aside>

      <main
        className="mx-auto w-full max-w-5xl flex-1 p-8 md:p-12 lg:ml-64 lg:p-16
          dark:bg-transparent"
      >
        <header className="mb-8">
          <h1 className="mb-2 text-5xl font-extrabold tracking-tighter text-on-surface dark:text-slate-50">
            {t("admin.title")}
          </h1>
          <p className="text-lg font-medium text-on-surface-variant dark:text-slate-400">
            {t("admin.subtitle")}
          </p>
        </header>

        <section className="mt-10">
          {loading ? (
            <div className="flex animate-pulse space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 rounded bg-slate-200 dark:bg-slate-800 w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-4 rounded bg-slate-200 dark:bg-slate-800 w-5/6"></div>
                </div>
              </div>
            </div>
          ) : pendingUsers.length === 0 ? (
            <div className="rounded-xl border border-dashed border-outline-variant p-10 text-center dark:border-slate-800">
              <p className="text-on-surface-variant dark:text-slate-400">
                {t("admin.empty")}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary dark:bg-slate-800 dark:text-blue-400">
                      {(u.username || "?").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-on-surface dark:text-slate-50">
                        {u.username}
                      </h3>
                      <p className="text-sm font-medium text-on-surface-variant dark:text-slate-400">
                        {t("admin.requestedAccess")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleReject(u.id)}
                      className="rounded-lg px-4 py-2 text-sm font-bold text-error transition-colors hover:bg-error/10 dark:text-red-400 dark:hover:bg-red-400/10"
                    >
                      {t("admin.reject")}
                    </button>
                    <button
                      onClick={() => handleAccept(u.id)}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary shadow-sm transition-colors hover:brightness-110 dark:bg-blue-600 dark:text-white"
                    >
                      {t("admin.accept")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
