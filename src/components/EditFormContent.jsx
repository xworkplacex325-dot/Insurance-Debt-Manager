import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FORMS_QUERY_KEY, useUpdateForm } from "./formsManagement";
import { useModal } from "./useModal";
import { useLanguage } from "../contexts/LanguageContext";

export default function EditFormContent({ form }) {
  const { close } = useModal();
  const queryClient = useQueryClient();
  const { updateForm } = useUpdateForm();
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: form.company_name ?? form.companyName ?? "",
      formNumber: form.id ?? form.formNumber ?? "",
      formDate: form.form_date ?? form.formDate ?? "",
      debit: form.debit ?? false,
      debtValue: form.debt_value ?? "",
      monthlyCharge: form.monthly_charge ?? "",
    },
  });

  const isDebit = watch("debit");
  const watchedDebtValue = watch("debtValue");
  const watchedMonthlyCharge = watch("monthlyCharge");

  // Real-time calculation of months of debt
  const debtVal = parseFloat(watchedDebtValue);
  const monthlyChg = parseFloat(watchedMonthlyCharge);
  const monthsOfDebt =
    isDebit && !isNaN(debtVal) && !isNaN(monthlyChg) && monthlyChg > 0
      ? (debtVal / monthlyChg).toFixed(2)
      : null;

  const { mutate, isPending } = useMutation({
    mutationFn: updateForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FORMS_QUERY_KEY });
      toast.success(t("form.updateSuccess") || "Form updated successfully");
      close();
    },
    onError: (err) => {
      toast.error(err?.message || t("form.updateError") || "Failed to update form");
    },
  });

  const onSubmit = (values) => {
    const payload = {
      originalId: form.id, // Keep track of the original primary key ID for querying
      id: values.formNumber.trim(), // The new primary key ID
      company_name: values.companyName.trim(),
      form_date: values.formDate,
      debit: values.debit,
      debt_value: values.debit ? (values.debtValue === "" ? null : Number(values.debtValue)) : null,
      monthly_charge: values.debit ? (values.monthlyCharge === "" ? null : Number(values.monthlyCharge)) : null,
    };
    mutate(payload);
  };

  return (
    <div className="pt-2">
      <h2
        className="mb-4 font-headline text-xl font-bold text-on-surface
          dark:text-slate-50"
      >
        {t("form.editTitle")}
      </h2>
      <p className="mb-6 text-sm text-on-surface-variant dark:text-slate-400">
        {t("form.editDesc")}
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Company Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="edit-form-company-name"
            className="ml-1 font-label text-xs font-bold uppercase tracking-wider
              text-on-surface-variant dark:text-slate-400"
          >
            {t("dash.colCompany")}
          </label>
          <input
            id="edit-form-company-name"
            type="text"
            autoComplete="organization"
            className="w-full rounded-lg border border-outline-variant/20
              bg-surface-container-lowest px-4 py-3 text-on-surface
              placeholder-slate-400 outline-none transition-all focus:ring-4
              focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950
              dark:text-slate-50 dark:placeholder-slate-600"
            placeholder="e.g. Stellar Dynamics"
            disabled={isPending}
            aria-invalid={errors.companyName ? "true" : "false"}
            {...register("companyName", {
              required: "Company name is required",
              setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
            })}
          />
          {errors.companyName && (
            <p className="ml-1 text-xs font-medium text-error dark:text-error-container">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Company ID Field (Fully Editable) */}
        <div className="space-y-2">
          <label
            htmlFor="edit-form-number"
            className="ml-1 font-label text-xs font-bold uppercase tracking-wider
              text-on-surface-variant dark:text-slate-400"
          >
            {t("dash.colFormNumber")}
          </label>
          <input
            id="edit-form-number"
            type="text"
            className="w-full rounded-lg border border-outline-variant/20
              bg-surface-container-lowest px-4 py-3 text-on-surface
              placeholder-slate-400 outline-none transition-all focus:ring-4
              focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950
              dark:text-slate-50 dark:placeholder-slate-600"
            placeholder="e.g. ABC-123456"
            disabled={isPending}
            aria-invalid={errors.formNumber ? "true" : "false"}
            {...register("formNumber", {
              required: "Company ID is required",
              setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
            })}
          />
          {errors.formNumber && (
            <p className="ml-1 text-xs font-medium text-error dark:text-error-container">
              {errors.formNumber.message}
            </p>
          )}
        </div>

        {/* Form Date Field */}
        <div className="space-y-2">
          <label
            htmlFor="edit-form-date"
            className="ml-1 font-label text-xs font-bold uppercase tracking-wider
              text-on-surface-variant dark:text-slate-400"
          >
            {t("dash.colFormDate")}
          </label>
          <input
            id="edit-form-date"
            type="date"
            className="w-full rounded-lg border border-outline-variant/20
              bg-surface-container-lowest px-4 py-3 text-on-surface outline-none
              transition-all focus:ring-4 focus:ring-primary/10 dark:border-slate-800
              dark:bg-slate-950 dark:text-slate-50"
            disabled={isPending}
            aria-invalid={errors.formDate ? "true" : "false"}
            {...register("formDate", { required: "Form date is required" })}
          />
          {errors.formDate && (
            <p className="ml-1 text-xs font-medium text-error dark:text-error-container">
              {errors.formDate.message}
            </p>
          )}
        </div>

        {/* Debit Status Toggle Switch */}
        <div
          className="flex items-center justify-between rounded-xl border
            border-outline-variant/10 bg-surface-container-low/40 p-4 transition-colors
            dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="flex flex-col gap-0.5">
            <span className="font-label text-sm font-bold text-on-surface dark:text-slate-200">
              {t("form.debitLabel")}
            </span>
            <span className="text-[11px] text-outline dark:text-slate-400">
              Toggle if this form is marked for active debit auditing.
            </span>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              disabled={isPending}
              {...register("debit")}
            />
            <div
              className="peer h-6 w-11 rounded-full bg-slate-200 transition-all
                after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5
                after:rounded-full after:border after:border-gray-300 after:bg-white
                after:transition-all after:content-[''] peer-checked:bg-primary
                peer-checked:after:translate-x-full peer-checked:after:border-white
                peer-focus:outline-none dark:bg-slate-800 dark:after:bg-slate-300"
            ></div>
          </label>
        </div>

        {/* Dynamic Debt Value & Monthly Charge Fields (Smooth Animation styling) */}
        {isDebit && (
          <div
            className="space-y-4 rounded-xl border border-primary/10 bg-primary/5 p-4
              animate-in fade-in slide-in-from-top-4 duration-300"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="edit-form-debt-value"
                  className="ml-1 font-label text-xs font-bold uppercase tracking-wider
                    text-on-surface-variant dark:text-slate-400"
                >
                  {t("form.debtValue")}
                </label>
                <input
                  id="edit-form-debt-value"
                  type="number"
                  step="any"
                  className="w-full rounded-lg border border-outline-variant/20
                    bg-surface-container-lowest px-4 py-3 text-on-surface
                    placeholder-slate-400 outline-none transition-all focus:ring-4
                    focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950
                    dark:text-slate-50 dark:placeholder-slate-600"
                  placeholder="e.g. 15000"
                  disabled={isPending}
                  {...register("debtValue", {
                    required: isDebit ? "Debt value is required when marked as debit" : false,
                    min: { value: 0, message: "Debt value must be non-negative" },
                  })}
                />
                {errors.debtValue && (
                  <p className="ml-1 text-xs font-medium text-error dark:text-error-container">
                    {errors.debtValue.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="edit-form-monthly-charge"
                  className="ml-1 font-label text-xs font-bold uppercase tracking-wider
                    text-on-surface-variant dark:text-slate-400"
                >
                  {t("form.monthlyCharge")}
                </label>
                <input
                  id="edit-form-monthly-charge"
                  type="number"
                  step="any"
                  className="w-full rounded-lg border border-outline-variant/20
                    bg-surface-container-lowest px-4 py-3 text-on-surface
                    placeholder-slate-400 outline-none transition-all focus:ring-4
                    focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950
                    dark:text-slate-50 dark:placeholder-slate-600"
                  placeholder="e.g. 1000"
                  disabled={isPending}
                  {...register("monthlyCharge", {
                    required: isDebit ? "Monthly charge is required when marked as debit" : false,
                    min: { value: 0.01, message: "Monthly charge must be greater than zero" },
                  })}
                />
                {errors.monthlyCharge && (
                  <p className="ml-1 text-xs font-medium text-error dark:text-error-container">
                    {errors.monthlyCharge.message}
                  </p>
                )}
              </div>
            </div>

            {/* Real-time Calculation Indicator & Warnings */}
            {monthsOfDebt !== null && (
              <div
                className="mt-2 flex flex-col gap-2 rounded-lg bg-surface-container-lowest/60
                  p-3 dark:bg-slate-950/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-secondary dark:text-slate-400">
                    {t("form.monthsOfDebt")}:
                  </span>
                  <span
                    className={`text-sm font-black ${
                      parseFloat(monthsOfDebt) > 12
                        ? "text-error dark:text-red-400"
                        : "text-tertiary dark:text-teal-400"
                    }`}
                  >
                    {monthsOfDebt} {t("form.monthsOfDebtSuffix")}
                  </span>
                </div>
                {parseFloat(monthsOfDebt) > 12 && (
                  <div
                    className="flex items-center gap-1.5 text-[11px] font-bold text-error
                      dark:text-red-400 animate-pulse"
                  >
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    <span>{t("form.exceedsWarning")}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div
          className="mt-6 flex justify-end border-t border-outline-variant/10 pt-4
            dark:border-slate-800"
        >
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white
              shadow-md transition-colors hover:brightness-110 disabled:cursor-not-allowed
              disabled:opacity-60"
          >
            {isPending ? t("form.submitting") : t("form.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
