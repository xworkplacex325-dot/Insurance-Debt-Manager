import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../hooks/useSupabase";
import { sanitizeUsername } from "../utils/username";
import { toast } from "react-toastify";
import { useLanguage } from "../contexts/LanguageContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const safeUser = sanitizeUsername(username);
    if (!safeUser) {
      toast.error("Choose a username using letters, numbers, and underscores only (no spaces).");
      return;
    }

    setSubmitting(true);
    try {
      // Direct insertion to the public.users table as pending status
      const { error } = await supabase.from("users").insert([
        {
          username: safeUser.slice(0, 120),
          password: password,
          status: "pending",
          role: "user",
        },
      ]);

      if (error) {
        // Handle common unique constraint error gracefully if someone already registered the username
        if (error.code === "23505") {
          throw new Error("This username is already taken. Please choose another one.");
        }
        throw error;
      }

      toast.success("Account created. Sign in after an admin approves your access.");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err?.message ?? "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-background p-6
        text-on-background"
    >
      <main className="w-full max-w-[440px]">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight">{t("register.title")}</h1>
          <p className="text-sm text-on-surface-variant">{t("register.subtitle")}</p>
        </div>

        <div className="rounded-xl bg-surface-container-lowest p-10 shadow-sm dark:bg-slate-900">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-on-surface-variant" htmlFor="reg-username">
                {t("login.username")}
              </label>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-500">
                {t("register.usernameHint")}
              </p>
              <input
                id="reg-username"
                required
                className="w-full rounded-lg border border-transparent bg-surface-container-low
                  px-4 py-3 text-on-surface outline-none focus:ring-4 focus:ring-primary/10
                  dark:bg-slate-800 dark:text-slate-100"
                value={username}
                onChange={(e) => setUsername(sanitizeUsername(e.target.value))}
                autoComplete="username"
                placeholder="e.g. jane_smith"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-on-surface-variant" htmlFor="reg-password">
                {t("login.password")}
              </label>
              <input
                id="reg-password"
                type="password"
                required
                minLength={6}
                className="w-full rounded-lg border border-transparent bg-surface-container-low
                  px-4 py-3 text-on-surface outline-none focus:ring-4 focus:ring-primary/10
                  dark:bg-slate-800 dark:text-slate-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary py-3 font-bold text-on-primary transition-colors
                hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? t("register.creating") : t("login.register")}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-on-surface-variant">
            {t("register.alreadyHaveAccount")}{" "}
            <Link className="font-bold text-primary hover:underline" to="/login">
              {t("register.signIn")}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
