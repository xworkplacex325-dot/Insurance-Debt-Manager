import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function RejectedAccountRedirect() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    localStorage.removeItem("user");
    navigate("/account-rejected", { replace: true });
  }, [navigate]);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background text-on-surface
        dark:bg-slate-950 dark:text-slate-100"
    >
      <p className="text-sm text-on-surface-variant dark:text-slate-400">{t("rejected.signOut")}</p>
    </div>
  );
}
