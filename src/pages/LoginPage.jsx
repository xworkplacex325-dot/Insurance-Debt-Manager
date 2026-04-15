import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loginWithUsername } from "../hooks/useSupabaseUser";
import { useLanguage } from "../contexts/LanguageContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { t, language, toggleLanguage } = useLanguage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const user = JSON.parse(saved);
      if (user?.status === "approved") {
        navigate(from, { replace: true });
      }
    }
  }, [navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();

    const rawUsername = username.trim();
    const rawPassword = password.trim();

    if (!rawUsername || !rawPassword) {
      toast.error(t("login.instructions"));
      return;
    }

    setSubmitting(true);

    try {
      await loginWithUsername(rawUsername, rawPassword);
      toast.success(t("login.signIn") + " ✓");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-600/30 to-purple-600/30 blur-3xl opacity-50 dark:from-blue-600/20 dark:to-cyan-600/20"></div>
      
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute right-6 top-6 z-50 flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-sm font-bold shadow-sm backdrop-blur-md transition-all hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:bg-slate-900 md:right-10 md:top-10 lg:right-12 lg:top-12"
      >
        <span className="material-symbols-outlined text-[18px]">language</span>
        {language === "en" ? "عربي" : "EN"}
      </button>

      <main className="w-full max-w-[480px] p-6 lg:p-8">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20">
            <span className="material-symbols-outlined text-3xl">corporate_fare</span>
          </div>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t("app.title")}
          </h1>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
            {t("app.subtitle")}
          </p>
        </div>

        <div className="rounded-3xl border border-white/40 bg-white/60 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/60 dark:shadow-none sm:p-12">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("login.welcome")}</h2>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
              {t("login.instructions")}
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit} dir={language === "ar" ? "rtl" : "ltr"}>
            {/* Username */}
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {t("login.username")}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  person
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white/80 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-white"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. ahmed_rakha"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {t("login.password")}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  lock
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white/80 py-3.5 pl-12 pr-14 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-white"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-blue-600 dark:text-blue-400"
                >
                  {showPassword ? t("login.hide") : t("login.show")}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-transform active:scale-95 disabled:opacity-70 dark:bg-blue-600"
              type="submit"
              disabled={submitting}
            >
              {submitting ? t("login.signingIn") : t("login.signIn")}
            </button>
          </form>

          <footer className="mt-8 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
            {t("login.noAccount")}{" "}
            <Link to="/register" className="font-bold text-blue-600 hover:underline dark:text-blue-400">
              {t("login.register")}
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}