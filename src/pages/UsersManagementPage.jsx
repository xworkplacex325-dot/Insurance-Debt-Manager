import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../hooks/useSupabase";
import { useTheme } from "../contexts/ThemeContext";
import { useSupabaseUser, isUserAdmin, logout } from "../hooks/useSupabaseUser";
import { toast } from "react-toastify";
import { useLanguage } from "../contexts/LanguageContext";

export default function UsersManagementPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { data: authPayload } = useSupabaseUser();
  const appUser = authPayload?.appUser ?? null;
  const admin = isUserAdmin(authPayload?.user, appUser);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [updatingParams, setUpdatingParams] = useState(null);
  const [revealedPasswords, setRevealedPasswords] = useState({});

  useEffect(() => {
    if (authPayload === undefined) return;
    if (!admin) {
      toast.error("Unauthorized access.");
      navigate("/", { replace: true });
      return;
    }
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, authPayload, navigate]);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load users: " + error.message);
    } else {
      setUsers(data ?? []);
    }
    setLoading(false);
  }

  async function handleDelete(userId) {
    if (!window.confirm("Are you sure you want to permanently delete this user?")) return;

    setDeleting(userId);
    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) {
      toast.error("Failed to delete user. Please check database policies.");
    } else {
      toast.success("User deleted successfully.");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
    setDeleting(null);
  }

  async function handleToggleRole(user) {
    const newRole = user.role === "admin" ? "user" : "admin";
    const confirmMsg =
      newRole === "admin"
        ? "Make this user an administrator?"
        : "Remove administrator privileges from this user?";
    if (!window.confirm(confirmMsg)) return;

    setUpdatingParams(user.id);
    const { error } = await supabase
      .from("users")
      .update({ role: newRole })
      .eq("id", user.id);

    if (error) {
      toast.error("Failed to update role. Please check database policies.");
    } else {
      toast.success("User role updated successfully.");
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
    }
    setUpdatingParams(null);
  }

  function toggleReveal(userId) {
    setRevealedPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  }

  if (!admin) return null;

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
              {t("nav.appUsers")}
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
            className="group flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600
              transition-all duration-200 hover:bg-slate-200 hover:text-slate-900
              dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
          >
            <span className="material-symbols-outlined" data-icon="group">
              group
            </span>
            <span className="font-medium">{t("nav.userApprovals")}</span>
          </Link>
          <Link
            to="/admin/users"
            className="group flex items-center gap-3 rounded-lg bg-white px-4 py-3 font-semibold
              text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-400"
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
            {t("adminUsers.title")}
          </h1>
          <p className="text-lg font-medium text-on-surface-variant dark:text-slate-400">
            {t("adminUsers.subtitle")}
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
          ) : users.length === 0 ? (
            <div className="rounded-xl border border-dashed border-outline-variant p-10 text-center dark:border-slate-800">
              <p className="text-on-surface-variant dark:text-slate-400">
                {t("adminUsers.empty")}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {users.map((u) => {
                const isRevealed = revealedPasswords[u.id];
                return (
                  <div
                    key={u.id}
                    className="flex flex-col justify-between rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-lg font-bold text-on-primary-container dark:bg-primary/20 dark:text-blue-300">
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-headline text-lg font-bold text-on-surface dark:text-slate-100">
                          {u.username}
                        </h3>
                        <p className="text-sm font-medium text-on-surface-variant dark:text-slate-400 capitalize">
                          {u.role} ({u.status})
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="rounded-lg bg-surface-container-low p-3 dark:bg-slate-800/50">
                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-500">
                          {t("adminUsers.password")}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm tracking-wider dark:text-slate-300">
                            {isRevealed ? u.password : "••••••••"}
                          </span>
                          <button
                            onClick={() => toggleReveal(u.id)}
                            className="text-xs font-bold text-primary transition-colors hover:underline dark:text-blue-400"
                          >
                            {isRevealed ? t("adminUsers.hide") : t("adminUsers.show")}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleToggleRole(u)}
                          disabled={updatingParams === u.id || appUser.id === u.id}
                          className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10 disabled:opacity-50 dark:border-blue-500/50 dark:text-blue-400 dark:hover:bg-blue-400/10"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {u.role === "admin" ? "person_remove" : "shield_person"}
                          </span>
                          {updatingParams === u.id
                            ? t("adminUsers.updating")
                            : u.role === "admin"
                            ? t("adminUsers.removeAdmin")
                            : t("adminUsers.makeAdmin")}
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          disabled={deleting === u.id || appUser.id === u.id}
                          className="flex items-center gap-2 rounded-lg border border-error px-4 py-2 text-sm font-bold text-error transition-colors hover:bg-error/10 disabled:opacity-50 dark:border-red-500/50 dark:text-red-400 dark:hover:bg-red-400/10"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                          {deleting === u.id ? t("adminUsers.deleting") : t("adminUsers.delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
