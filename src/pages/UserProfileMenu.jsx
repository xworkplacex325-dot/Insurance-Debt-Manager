import { useSupabaseUser, logout } from "../hooks/useSupabaseUser";
import { useLanguage } from "../contexts/LanguageContext";

export default function UserProfileMenu() {
  const { data } = useSupabaseUser();
  const { t } = useLanguage();
  const currentUser = data?.appUser;

  return (
    <div className="min-h-screen bg-surface pt-20 text-on-surface">
      <header
        className="fixed top-0 z-50 w-full bg-slate-50/80 shadow-sm backdrop-blur-xl
          dark:bg-slate-900/80 dark:shadow-none"
      >
        <div
          className="mx-auto flex w-full max-w-screen-2xl items-center justify-between
            px-8 py-4"
        >
          <div className="flex items-center gap-8">
            <span
              className="text-2xl font-bold tracking-tight text-slate-900
                dark:text-slate-50"
            >
              {t("app.title")}
            </span>
            <div className="hidden items-center gap-6 md:flex">
              <nav className="flex gap-6">
                <a
                  className="border-b-2 border-blue-700 text-xs font-bold uppercase
                    tracking-wider text-blue-700 dark:text-blue-400"
                  href="/"
                >
                  {t("nav.dashboard")}
                </a>
                <a
                  className="text-xs uppercase tracking-wider text-slate-500
                    transition-colors hover:bg-slate-200/50"
                  href="/settings"
                >
                  {t("nav.settings")}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* User Profile Modal/Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] flex items-start
          justify-end pr-8 pt-20"
      >
        <div
          className="animate-in fade-in slide-in-from-top-4 pointer-events-auto w-80
            origin-top-right transform overflow-hidden rounded-xl border
            border-outline-variant/10 bg-surface-container-lowest
            shadow-[0_40px_80px_rgba(44,52,55,0.12)] transition-all duration-200"
        >
          {/* Modal Header */}
          <div className="flex flex-col items-center p-6 pb-4 text-center">
            <div className="relative mb-4">
              <img
                alt="User profile avatarLarge"
                className="h-20 w-20 rounded-full object-cover ring-4
                  ring-surface-container-low"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCmVLuV2o76yzygw7hHJx7uVGE40ykkAIc9qU1HL17Xg6iPAbn26MtTEFy2Ym3FnYlp4rGE7_KJNK0dQycaPopyzDB2JlL_qrJ146A1p4NCnOJHo0hOze9Asqu7TMCQ3kzWu4QLzfcvQe3UGAclI2pOVQLsrh1bUPnilGp0vde6TlyABy61QPO1p6cqs7pt3dU8FrT0ePFM8YX_qs5dDeJmbU93o6qcR6ReyLK4o9_dqfBI1UCEbaR_wo0bAQLYsGI1LcNCiR_c0tB"
              />
              <div
                className="absolute bottom-0 right-1 h-5 w-5 rounded-full border-4
                  border-surface-container-lowest bg-tertiary"
              ></div>
            </div>
            <h4 className="text-xl font-bold tracking-tight text-on-surface">{currentUser?.username || t("role.guest")}</h4>
            <p className="text-sm font-medium text-on-surface-variant">
              @{currentUser?.username || "guest"}
            </p>
            <div
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10
                px-3 py-1"
            >
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              <span
                className="text-[10px] font-bold uppercase tracking-widest text-primary"
              >
                {t("role.administrator")}
              </span>
            </div>
          </div>
          {/* Modal Menu Options */}
          <div className="bg-surface-container-low/50 p-4">
            <div className="space-y-1">
              <a
                className="group flex w-full items-center justify-between rounded-lg
                  bg-surface-container-lowest p-4 transition-all duration-200
                  hover:bg-primary hover:text-on-primary"
                href="/settings"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary
                      group-hover:text-on-primary"
                  >
                    settings
                  </span>
                  <span className="text-sm font-semibold">{t("nav.settings")}</span>
                </div>
                <span
                  className="material-symbols-outlined text-lg text-outline-variant
                    group-hover:text-on-primary/60"
                >
                  chevron_right
                </span>
              </a>
              <a
                className="group flex w-full items-center justify-between rounded-lg
                  bg-surface-container-lowest p-4 transition-all duration-200
                  hover:bg-error hover:text-on-error"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-error
                      group-hover:text-on-error"
                  >
                    logout
                  </span>
                  <span className="text-sm font-semibold">{t("nav.signOut")}</span>
                </div>
                <span
                  className="material-symbols-outlined text-lg text-outline-variant
                    group-hover:text-on-error/60"
                >
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Dim Layer */}
      <div className="fixed inset-0 z-[90] bg-on-background/5 backdrop-blur-[2px]"></div>
    </div>
  );
}
