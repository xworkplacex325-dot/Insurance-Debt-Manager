import { supabase } from "../hooks/useSupabase";

/** Shared React Query key for forms list + invalidation after mutations. */
export const FORMS_QUERY_KEY = ["debt-forms"];

export const useAddForm = () => {
  const addForm = async ({ companyName, formNumber, formDate, addedBy, debit, debtValue, monthlyCharge }) => {
    const { data, error } = await supabase
      .from("debt-forms")
      .insert({
        company_name: companyName.trim(),
        id: formNumber.trim(),
        form_date: formDate,
        added_by: addedBy,
        debit: debit ?? false,
        debt_value: debit ? (debtValue === "" ? null : Number(debtValue)) : null,
        monthly_charge: debit ? (monthlyCharge === "" ? null : Number(monthlyCharge)) : null,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  };
  return { addForm };
};
export const useGetForms = () => {
  const getForms = async () => {
    const { data, error } = await supabase
      .from("debt-forms")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw error;
    return data ?? [];
  };
  return { getForms };
};
export const useUpdateForm = () => {
  const updateForm = async ({ originalId, ...form }) => {
    const { data, error } = await supabase.from("debt-forms").update(form).eq("id", originalId);
    if (error) throw error;
    return data;
  };
  return { updateForm };
};
export const useDeleteForm = () => {
  const deleteForm = async (id) => {
    const { data, error } = await supabase.from("debt-forms").delete().eq("id", id);
    if (error) throw error;
    return data;
  };
  return { deleteForm };
};
