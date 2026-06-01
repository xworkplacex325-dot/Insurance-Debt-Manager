import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useSupabaseUser, isUserAdmin, logout } from "../hooks/useSupabaseUser";
import { supabase } from "../hooks/useSupabase";
import { useLanguage } from "../contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { useUploadAvatar } from "../hooks/useUploadAvatar"; // ✅ import hook

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "appearance", label: "Appearance" },
];

export default function Settings() {
  const { t } = useLanguage();
  const { theme, setTheme, toggleTheme } = useTheme();
  const {
    data: authPayload,
    isLoading: authLoading,
    isError: authError,
    error: authErr,
  } = useSupabaseUser();

  const user = authPayload?.user ?? null;
  const appUser = authPayload?.appUser ?? null;
  const admin = isUserAdmin(user, appUser);
  const [activeTab, setActiveTab] = useState("profile");

  // ✅ Avatar fetch
  const { data: avatar } = useQuery({
    queryKey: ["avatar", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("avatars")
        .select("*")
        .eq("user_id", user?.id)
        .single();
      if (error && error.code !== "PGRST116") throw error;
      return data ?? null;
    },
    enabled: !!user?.id,
  });

  // ✅ Use the hook — just pass userId
  const { avatarMutation } = useUploadAvatar(user?.id);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    avatarMutation.mutate(file); // ✅ file goes here now
  };

  function handleSignOut() {
    logout();
  }

  return (
    <div className="flex min-h-screen bg-background pt-20 text-on-surface dark:bg-slate-950 dark:text-slate-50">
      <nav className="fixed top-0 z-50 mx-auto flex w-full max-w-screen-2xl items-center justify-between border-b border-transparent bg-slate-50/80 px-8 py-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {t("app.title")}
          </span>
          <div className="ml-10 hidden items-center space-x-8 md:flex">
            <a className="rounded-lg px-3 py-1 text-slate-500 transition-colors hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50" href="/">
              {t("nav.dashboard")}
            </a>
            <span className="rounded-lg border-b-2 border-blue-700 px-3 py-1 font-bold text-blue-700 dark:border-blue-400 dark:text-blue-400">
              {t("nav.settings")}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4 space-y-0">
          <button onClick={toggleTheme} className="flex items-center justify-center rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50">
            <span className="material-symbols-outlined">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-700">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                {appUser?.username || user?.email || t("role.guest")}
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {admin ? t("role.administrator") : t("role.registryUser")}
              </p>
            </div>
            {/* ✅ Show avatar in navbar or fallback to initials */}
            <div className="h-10 w-10 rounded-full overflow-hidden">
              {avatar?.url ? (
                <img src={avatar.url} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-800 text-sm font-bold text-slate-300">
                  {(appUser?.username || user?.email || "?").charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <aside className="fixed bottom-0 top-20 hidden h-full w-64 flex-col space-y-8 bg-slate-100 p-6 dark:bg-slate-900/80 lg:flex">
        <div className="space-y-1">
          <p className="mb-4 px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-outline dark:text-slate-500">
            {t("nav.navigation")}
          </p>
          <a className="group flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50" href="/">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium">{t("nav.dashboard")}</span>
          </a>
          {admin && (
            <>
              <Link to="/admin" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50">
                <span className="material-symbols-outlined">group</span>
                <span className="font-medium">{t("nav.userApprovals")}</span>
              </Link>
              <Link to="/admin/users" className="group flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50">
                <span className="material-symbols-outlined">manage_accounts</span>
                <span className="font-medium">{t("nav.appUsers")}</span>
              </Link>
            </>
          )}
        </div>
        <div className="mt-auto space-y-1">
          <span className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 font-semibold text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-400">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium">{t("nav.settings")}</span>
          </span>
          <button type="button" onClick={handleSignOut} className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-medium">{t("nav.signOut")}</span>
          </button>
        </div>
      </aside>

      <main className="mx-auto w-full max-w-5xl flex-1 p-8 md:p-12 lg:ml-64 lg:p-16 dark:bg-transparent">
        <header className="mb-8">
          <h1 className="mb-2 text-5xl font-extrabold tracking-tighter text-on-surface dark:text-slate-50">
            {t("settings.title")}
          </h1>
          <p className="text-lg font-medium text-on-surface-variant dark:text-slate-400">
            {t("settings.subtitle")}
          </p>
        </header>

        <div className="mb-10 flex flex-wrap gap-2 border-b border-outline-variant/20 pb-px dark:border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-t-lg px-4 py-2.5 text-sm font-bold transition-colors ${
                activeTab === tab.id
                  ? "bg-surface-container-low text-primary dark:bg-slate-800 dark:text-blue-400"
                  : "text-on-surface-variant hover:bg-surface-container-low/60 dark:text-slate-400 dark:hover:bg-slate-800/50"
              }`}
            >
              {t(tab.id === "profile" ? "settings.tabProfile" : "settings.tabAppearance")}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="space-y-16">
            <section>
              <div className="mb-8 flex items-baseline justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{t("settings.profileTitle")}</h2>
                <span className="text-xs font-bold uppercase tracking-widest text-outline">Account</span>
              </div>
              {authLoading ? (
                <p className="text-sm text-on-surface-variant dark:text-slate-400">Loading account…</p>
              ) : authError ? (
                <div className="rounded-lg border border-error-container/40 bg-error-container/10 p-4 text-sm text-on-error-container dark:text-error-container">
                  <p className="font-semibold">Could not load profile</p>
                  <p className="mt-1">{authErr?.message}</p>
                </div>
              ) : !user ? (
                <p className="text-sm text-on-surface-variant dark:text-slate-400">
                  You are not signed in.{" "}
                  <a className="font-bold text-primary underline-offset-2 hover:underline" href="/login">Sign in</a>
                </p>
              ) : (
                <div className="space-y-8 rounded-xl bg-surface-container-low p-8 dark:bg-slate-900">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                        {t("settings.fullName")}
                      </label>
                      <input
                        key={appUser?.username ?? "un"}
                        readOnly
                        className="w-full cursor-not-allowed rounded-lg border border-outline-variant/15 bg-surface-container-lowest px-4 py-3 outline-none dark:border-slate-800 dark:bg-slate-950"
                        type="text"
                        defaultValue={appUser?.username ?? ""}
                        placeholder="—"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                        {t("settings.email")}
                      </label>
                      <input
                        key={user.id}
                        readOnly
                        className="w-full cursor-not-allowed rounded-lg border border-outline-variant/15 bg-surface-container-lowest px-4 py-3 outline-none dark:border-slate-800 dark:bg-slate-950"
                        type="email"
                        defaultValue={user.email ?? ""}
                      />
                    </div>
                  </div>

                  <div className="relative space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                      {t("settings.access")}
                    </label>
                    <p className="text-sm text-on-surface dark:text-slate-200">
                      {admin ? (
                        <span className="font-semibold text-primary dark:text-blue-400">{t("role.administrator")}</span>
                      ) : appUser?.status === "pending" ? (
                        <span className="text-on-surface-variant">{t("settings.awaitingApproval")}</span>
                      ) : (
                        <span>{t("role.activeUser")}</span>
                      )}
                    </p>

                    {/* ✅ Avatar section */}
                    <div className="absolute top-0 right-0 flex items-center gap-4">
                      {avatar?.url ? (
                        <img src={avatar.url} alt="avatar" className="h-16 w-16 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700" />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-xl font-bold text-slate-300">
                          {(appUser?.username || user?.email || "?").charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="space-y-1">
                        <label htmlFor="avatar" className="text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                          Change Avatar
                        </label>
                        <input
                          type="file"
                          id="avatar"
                          accept="image/*"
                          disabled={avatarMutation.isPending} // ✅ disable while uploading
                          onChange={handleAvatarChange}
                          className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
                        />
                        {avatarMutation.isPending && (
                          <p className="text-xs text-slate-400">Uploading...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="space-y-16">
            <section>
              <div className="mb-8 flex items-baseline justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{t("settings.themeTitle")}</h2>
                <span className="text-xs font-bold uppercase tracking-widest text-outline">Theme</span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div onClick={() => setTheme("light")} className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-white p-6 transition-all dark:bg-slate-100 ${theme === "light" ? "border-primary" : "border-transparent hover:border-slate-300"}`}>
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">light_mode</span>
                      <span className="font-bold text-on-surface">{t("settings.lightMode")}</span>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-4 ${theme === "light" ? "border-primary bg-white" : "border-slate-300"}`} />
                  </div>
                </div>
                <div onClick={() => setTheme("dark")} className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-slate-900 p-6 transition-all ${theme === "dark" ? "border-primary" : "border-transparent hover:border-slate-700"}`}>
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400">dark_mode</span>
                      <span className="font-bold text-white">{t("settings.darkMode")}</span>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-4 ${theme === "dark" ? "border-primary bg-slate-900" : "border-slate-700"}`} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}