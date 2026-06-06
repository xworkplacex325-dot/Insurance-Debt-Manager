import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../components/Modal";
import NewFormContent from "../components/NewFormContent";
import EditFormContent from "../components/EditFormContent";
import { FORMS_QUERY_KEY, useGetForms, useDeleteForm } from "../components/formsManagement";
import { useTheme } from "../contexts/ThemeContext";
import { useSupabaseUser, logout, isUserAdmin } from "../hooks/useSupabaseUser";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "react-toastify";





function formatFormDate(value) {
  if (!value) return "—";
  const s = typeof value === "string" ? value : String(value);
  const d = new Date(s.includes("T") ? s : `${s}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/** Red badge when the form date is on or before “today minus 6 calendar months”. */
function isFormDateSixOrMoreMonthsOld(value) {
  if (!value) return false;

  const formDay = new Date(value);
  if (Number.isNaN(formDay.getTime())) return false;

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  return formDay <= sixMonthsAgo;
}

export default function DashboardFormsList() {
  const { data: userData } = useSupabaseUser();
  const currentUser = userData?.appUser;
  const admin = isUserAdmin(userData?.user, currentUser);
  const userId = userData?.user?.id;
  const { t, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const { getForms } = useGetForms();
  const { deleteForm } = useDeleteForm();

  const { data: forms = [], isPending, isError } = useQuery({
    queryKey: FORMS_QUERY_KEY,
    queryFn: getForms,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FORMS_QUERY_KEY });
      toast.success(t("form.deleteSuccess") || "Form deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(t("form.deleteError") || "Failed to delete form. Check database policies.");
    }
  });

  const [search, setSearch] = useState("");

  const filteredForms = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return forms;
    return forms.filter((row) => {
      const company = String(row.company_name ?? row.companyName ?? "").toLowerCase();
      const id = String(row.id ?? row.form_number ?? row.formNumber ?? "").toLowerCase();
      const by = String(row.added_by ?? row.addedBy ?? row.added_by_name ?? "").toLowerCase();
      return company.includes(q) || id.includes(q) || by.includes(q);
    });
  }, [forms, search]);

  return (
    <div
      className="min-h-screen bg-background transition-colors duration-300
        dark:bg-slate-950"
    >
      {/* TopNavBar Component */}
      <header
        className="fixed top-0 z-50 w-full border-b border-transparent bg-slate-50/80
          shadow-sm backdrop-blur-xl transition-colors duration-300
          dark:border-slate-800 dark:bg-slate-900/90"
      >
        <div
          className="mx-auto flex w-full max-w-screen-2xl items-center justify-between
            px-8 py-4"
        >
          <div className="flex items-center gap-8">
            <span
              className="font-headline text-2xl font-bold tracking-tight text-slate-900
                transition-colors dark:text-slate-50"
            >
              {t("app.title")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center rounded-full p-2
                  text-slate-500 transition-colors hover:bg-slate-200/50
                  dark:text-slate-400 dark:hover:bg-slate-800/50"
              >
                <span className="material-symbols-outlined">
                  {theme === "dark" ? "light_mode" : "dark_mode"}
                </span>
              </button>
              <button
                className="rounded-full p-2 text-slate-500 transition-colors
                  hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50"
              >
                <span className="material-symbols-outlined" data-icon="notifications">
                  notifications
                </span>
              </button>
              <button
                className="rounded-full p-2 text-slate-500 transition-colors
                  hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50"
              >
                <span className="material-symbols-outlined" data-icon="help">
                  help
                </span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
            <div className="ml-2 flex items-center gap-3">
              <div className="text-right">
                <p
                  className="font-headline text-sm font-bold text-slate-900
                    transition-colors dark:text-slate-50"
                >
                  {currentUser?.username || t("role.guest")}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">@{currentUser?.username || "guest"}</p>
              </div>
              <img
                alt="User profile avatar"
                className="h-10 w-10 rounded-full border-2 border-primary-container
                  object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZUouBigZHbWuoy7OKEomuc7cSMlLAhKepHIectYrUYlor7ukvkCzbTk6sk3T6eCtMUxOSgo2Kjzi19nJjWVgh9FkzJQbkFhfpMN4tCw5elrRUrODtMFb4XHY3J9GOEaqxyud5QTBduVZdjPKXB585afDFz_IeIB-NXvPV1W6_pchc_a6KToumFlVMdCKyJoaKY5s9wKRjDp4awrHWRqHxkjBZKZzUfDh4366hnU7dZCSKx2RS3kkamfz1yRirXg9qUh9KBVNWXKDt"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen overflow-hidden pt-20">
        {/* SideNavBar Component */}
        <aside
          className="sticky top-0 flex h-full w-64 flex-col space-y-8 border-r
            border-transparent bg-slate-100 p-6 transition-colors duration-300
            dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="flex items-center gap-3 px-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg
                bg-primary-container text-white"
            >
              <span className="material-symbols-outlined" data-icon="auto_stories">
                auto_stories
              </span>
            </div>
            <div>
              <h2
                className="font-headline text-lg font-black leading-tight text-slate-900
                  transition-colors dark:text-slate-50"
              >
                {t("role.adminTitle")}
              </h2>
              <p
                className="font-label text-[10px] uppercase tracking-wider
                  text-slate-500"
              >
                {t("role.adminSubtitle")}
              </p>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            <a
              className="flex items-center gap-3 rounded-lg bg-white px-4 py-3
                font-semibold text-blue-700 shadow-sm transition-all duration-200
                ease-in-out dark:bg-slate-800/80 dark:text-blue-400"
              href="/"
            >
              <span className="material-symbols-outlined" data-icon="dashboard">
                dashboard
              </span>
              <span className="font-label text-sm">{t("nav.dashboard")}</span>
            </a>
            {admin && (
              <>
                <a
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600
                    transition-all duration-200 ease-in-out hover:bg-slate-200
                    hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800
                    dark:hover:text-slate-50"
                  href="/admin"
                >
                  <span className="material-symbols-outlined" data-icon="group">
                    group
                  </span>
                  <span className="font-label text-sm">{t("nav.userApprovals")}</span>
                </a>
                <a
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600
                    transition-all duration-200 ease-in-out hover:bg-slate-200
                    hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800
                    dark:hover:text-slate-50"
                  href="/admin/users"
                >
                  <span className="material-symbols-outlined" data-icon="manage_accounts">
                    manage_accounts
                  </span>
                  <span className="font-label text-sm">{t("nav.appUsers")}</span>
                </a>
              </>
            )}
          </nav>
          <div
            className="space-y-1 border-t border-slate-200/50 pt-6
              dark:border-slate-800/50"
          >
            <a
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-600
                transition-all duration-200 ease-in-out hover:bg-slate-200
                hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800
                dark:hover:text-slate-50"
              href="/settings"
            >
              <span className="material-symbols-outlined" data-icon="settings">
                settings
              </span>
              <span className="font-label text-sm">{t("nav.settings")}</span>
            </a>
            <button
              onClick={logout}
              className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-600
                transition-all duration-200 ease-in-out hover:bg-slate-200
                hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800
                dark:hover:text-slate-50"
            >
              <span className="material-symbols-outlined" data-icon="logout">
                logout
              </span>
              <span className="font-label text-sm">{t("nav.signOut")}</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          className="flex-1 overflow-y-auto bg-background p-10 pb-24 transition-colors
            duration-300 dark:bg-transparent"
        >
          <header className="mb-12 flex items-end justify-between">
            <div className="max-w-2xl">
              <h1
                className="mb-4 font-headline text-5xl font-extrabold leading-none
                  tracking-tight text-on-surface transition-colors dark:text-slate-50"
              >
                {t("dash.title")}
              </h1>
              <p
                className="max-w-xl text-lg leading-relaxed text-secondary
                  transition-colors dark:text-slate-400"
              >
                {t("dash.description")}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="rounded-lg border-none bg-white px-6 py-3 font-semibold
                  text-on-surface shadow-sm transition-colors
                  hover:bg-surface-container-low dark:bg-slate-800 dark:text-slate-50
                  dark:hover:bg-slate-700"
              >
                {t("dash.exportReport")}
              </button>
              <Modal>
                <Modal.Open opens="new-form">
                  <button
                    className="rounded-lg bg-gradient-to-r from-primary
                      to-primary-container px-6 py-3 font-semibold text-white shadow-lg
                      shadow-primary/20 transition-transform hover:scale-[0.98]"
                  >
                    {t("dash.addNewForm")}
                  </button>
                </Modal.Open>
                <Modal.Window name="new-form">
                  <NewFormContent />
                </Modal.Window>
              </Modal>
            </div>
          </header>

          {/* Table Actions / Search */}
          <div className="mb-4 flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <span
                className="material-symbols-outlined absolute left-4 top-1/2
                  -translate-y-1/2 text-[20px] text-outline dark:text-slate-500"
              >
                search
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("dash.searchPlaceholder")}
                autoComplete="off"
                dir={language === "ar" ? "rtl" : "ltr"}
                className="w-full rounded-xl border border-outline-variant/15
                  bg-surface-container-lowest py-3 pl-11 pr-4 text-sm text-on-surface
                  shadow-sm outline-none transition-all placeholder:text-outline/70
                  focus:border-primary focus:ring-4 focus:ring-primary/10
                  dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
              />
            </div>

            {/* Optional Filter Button (Visual consistency) */}
            <button
              className="flex items-center gap-2 rounded-xl border
                border-outline-variant/15 bg-surface-container-lowest px-4 py-3 text-sm
                font-bold text-on-surface-variant shadow-sm transition-colors
                hover:bg-surface-container-low dark:border-slate-800 dark:bg-slate-900
                dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              {t("dash.filter")}
            </button>
          </div>

          {/* Administrative Data Table */}
          <section
            className="rounded-2xl border border-outline-variant/10
              bg-surface-container-lowest p-2 shadow-sm dark:border-slate-800
              dark:bg-slate-900"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container-high dark:bg-slate-800/80">
                    <th
                      className="rounded-tl-xl px-8 py-5 font-label text-[10px]
                        font-bold uppercase tracking-wider text-secondary
                        transition-colors dark:text-slate-400"
                    >
                      {t("dash.colCompany")}
                    </th>
                    <th
                      className="px-8 py-5 font-label text-[10px] font-bold uppercase
                        tracking-wider text-secondary transition-colors
                        dark:text-slate-400"
                    >
                      {t("dash.colFormNumber")}
                    </th>
                    <th
                      className="px-8 py-5 font-label text-[10px] font-bold uppercase
                        tracking-wider text-secondary transition-colors
                        dark:text-slate-400"
                    >
                      {t("dash.colFormDate")}
                    </th>
                    <th
                      className="px-8 py-5 font-label text-[10px] font-bold uppercase
                        tracking-wider text-secondary transition-colors
                        dark:text-slate-400"
                    >
                      {t("dash.colAddedBy")}
                    </th>
                    <th
                      className={`px-8 py-5 font-label
                        text-[10px] font-bold uppercase tracking-wider text-secondary
                        transition-colors dark:text-slate-400 ${language === "ar" ? "text-left rounded-tl-xl" : "text-right rounded-tr-xl"}`}
                    >
                      {t("dash.colActions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-0">
                  {isPending ? (
                    <tr>
                      <td
                        className="px-8 py-10 text-center text-sm text-secondary
                          dark:text-slate-400"
                        colSpan={5}
                      >
                        {t("dash.loading")}
                      </td>
                    </tr>
                  ) : isError ? (
                    <tr>
                      <td
                        className="px-8 py-10 text-center text-sm text-error
                          dark:text-error-container"
                        colSpan={5}
                      >
                        {t("dash.error")}
                      </td>
                    </tr>
                  ) : forms.length === 0 ? (
                    <tr>
                      <td
                        className="px-8 py-10 text-center text-sm text-secondary
                          dark:text-slate-400"
                        colSpan={5}
                      >
                        {t("dash.empty")}
                      </td>
                    </tr>
                  ) : filteredForms.length === 0 ? (
                    <tr>
                      <td
                        className="px-8 py-10 text-center text-sm text-secondary
                          dark:text-slate-400"
                        colSpan={5}
                      >
                        {t("dash.noSearchMatch")}
                      </td>
                    </tr>
                  ) : (
                    filteredForms.map((row, index) => {
                      const company =
                        row.company_name ?? row.companyName ?? "—";
                      const formNo =
                        row.form_number ?? row.formNumber ?? row.id ?? "—";
                      const rawDate = row.form_date ?? row.formDate;
                      const addedBy =
                        row.added_by ?? row.addedBy ?? row.added_by_name ?? "—";
                      const staleBySixMonths = isFormDateSixOrMoreMonthsOld(rawDate);
                      const monthsOfDebt = row.debit && row.monthly_charge > 0
                        ? (row.debt_value / row.monthly_charge)
                        : 0;
                      const excessiveDebt = row.debit && monthsOfDebt > 12;
                      const markRed = staleBySixMonths || excessiveDebt;
                      const zebra =
                        index % 2 === 1
                          ? "bg-surface-container-low/30 dark:bg-slate-800/40"
                          : "";

                      return (
                        <tr
                          key={row.id ?? `${formNo}-${index}`}
                          className={`group transition-colors hover:bg-surface-container-low
                            dark:hover:bg-slate-800 ${zebra}`}
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-10 w-10 items-center justify-center
                                  rounded bg-slate-100 dark:bg-slate-950"
                              >
                                <span
                                  className="material-symbols-outlined text-slate-400
                                    dark:text-slate-500"
                                  data-icon="corporate_fare"
                                >
                                  corporate_fare
                                </span>
                              </div>
                              <span
                                className="font-headline text-lg font-bold text-on-surface
                                  transition-colors dark:text-slate-50"
                              >
                                {company}
                              </span>
                            </div>
                          </td>
                          <td
                            className="px-8 py-6 font-medium text-secondary transition-colors
                              dark:text-slate-400"
                          >
                            {formNo}
                          </td>
                          <td className="px-8 py-6">
                            <div
                              title={
                                excessiveDebt
                                  ? `Debt ratio exceeds 12 months (${monthsOfDebt.toFixed(1)} months)`
                                  : staleBySixMonths
                                    ? "Company record is more than 6 months old"
                                    : ""
                              }
                              className={`inline-flex items-center rounded-full px-4 py-1.5
                                font-label text-xs font-bold ${markRed
                                  ? `bg-error-container text-on-error-container
                                      dark:bg-error/40 dark:text-error-container`
                                  : `bg-tertiary-container text-on-tertiary-container
                                      dark:bg-tertiary/40 dark:text-tertiary-container`
                                }`}
                            >
                              {formatFormDate(rawDate)}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-6 w-6 rounded-full bg-secondary-container
                                  dark:bg-secondary-container/50"
                              ></div>
                              <span className="text-sm font-medium dark:text-slate-300">
                                {addedBy}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center gap-2 justify-end">
                              <Modal>
                                <Modal.Open opens={`edit-form-${row.id}`}>
                                  <button
                                    type="button"
                                    title={t("form.editTitle") || "Edit Form"}
                                    className="rounded-lg p-2 text-primary opacity-0
                                      transition-all hover:bg-primary/10 group-hover:opacity-100"
                                  >
                                    <span
                                      className="material-symbols-outlined"
                                      data-icon="edit"
                                    >
                                      edit
                                    </span>
                                  </button>
                                </Modal.Open>
                                <Modal.Window name={`edit-form-${row.id}`}>
                                  <EditFormContent form={row} />
                                </Modal.Window>
                              </Modal>
                              {admin && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const formId = row.id || row.form_number || row.formNumber;
                                    if (!formId) {
                                      toast.error("Error: Could not find Company ID to delete.");
                                      return;
                                    }
                                    if (window.confirm("Are you sure you want to delete this record?")) {
                                      deleteMutation.mutate(formId);
                                    }
                                  }}
                                  disabled={deleteMutation.isPending}
                                  className="rounded-lg p-2 text-error opacity-0
                                    transition-all hover:bg-error/10 group-hover:opacity-100 dark:text-red-400 dark:hover:bg-red-400/10"
                                >
                                  <span
                                    className="material-symbols-outlined text-[18px]"
                                    data-icon="delete"
                                  >
                                    delete
                                  </span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
