import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FORMS_QUERY_KEY, useAddForm } from "./formsManagement";
import { useModal } from "./useModal";
import { useSupabaseUser } from "../hooks/useSupabaseUser";
import { useLanguage } from "../contexts/LanguageContext";

export default function NewFormContent({ defaultDate }) {
  const resolvedDefaultDate = defaultDate ?? new Date().toISOString().split("T")[0];
  const { close } = useModal();
  const queryClient = useQueryClient();
  const { addForm } = useAddForm();
  
  const { data: authPayload } = useSupabaseUser();
  const username = authPayload?.appUser?.username || "Guest";
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      formNumber: "",
      formDate: resolvedDefaultDate,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FORMS_QUERY_KEY });
      toast.success("Form added successfully");
      reset({
        companyName: "",
        formNumber: "",
        formDate: resolvedDefaultDate,
      });
      close();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Failed to add form");
    },
  });

  const onSubmit = (values) => {
    mutate({ ...values, addedBy: username });
  };

  return (
    <div className="pt-2">
      <h2
        className="mb-4 font-headline text-xl font-bold text-on-surface
          dark:text-slate-50"
      >
        {t("form.createTitle")}
      </h2>
      <p className="mb-6 text-sm text-on-surface-variant dark:text-slate-400">
        {t("form.createDesc")}
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <label
            htmlFor="new-form-company-name"
            className="ml-1 font-label text-xs font-bold uppercase tracking-wider
              text-on-surface-variant dark:text-slate-400"
          >
            {t("dash.colCompany")}
          </label>
          <input
            id="new-form-company-name"
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
          {errors.companyName ? (
            <p className="ml-1 text-xs font-medium text-error dark:text-error-container">
              {errors.companyName.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="new-form-number"
            className="ml-1 font-label text-xs font-bold uppercase tracking-wider
              text-on-surface-variant dark:text-slate-400"
          >
            {t("dash.colFormNumber")}
          </label>
          <input
            id="new-form-number"
            type="text"
            autoComplete="off"
            className="w-full rounded-lg border border-outline-variant/20
              bg-surface-container-lowest px-4 py-3 text-on-surface
              placeholder-slate-400 outline-none transition-all focus:ring-4
              focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950
              dark:text-slate-50 dark:placeholder-slate-600"
            placeholder="e.g. #FRM-2024-001"
            disabled={isPending}
            aria-invalid={errors.formNumber ? "true" : "false"}
            {...register("formNumber", {
              required: "Form number is required",
              setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
            })}
          />
          {errors.formNumber ? (
            <p className="ml-1 text-xs font-medium text-error dark:text-error-container">
              {errors.formNumber.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="new-form-date"
            className="ml-1 font-label text-xs font-bold uppercase tracking-wider
              text-on-surface-variant dark:text-slate-400"
          >
            {t("dash.colFormDate")}
          </label>
          <input
            id="new-form-date"
            type="date"
            className="w-full rounded-lg border border-outline-variant/20
              bg-surface-container-lowest px-4 py-3 text-on-surface outline-none
              transition-all focus:ring-4 focus:ring-primary/10 dark:border-slate-800
              dark:bg-slate-950 dark:text-slate-50"
            disabled={isPending}
            aria-invalid={errors.formDate ? "true" : "false"}
            {...register("formDate", { required: "Form date is required" })}
          />
          {errors.formDate ? (
            <p className="ml-1 text-xs font-medium text-error dark:text-error-container">
              {errors.formDate.message}
            </p>
          ) : null}
        </div>

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
