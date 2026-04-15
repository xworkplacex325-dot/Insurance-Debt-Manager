import { supabase } from "../hooks/useSupabase";

/** Shared React Query key for forms list + invalidation after mutations. */
export const FORMS_QUERY_KEY = ["debt-forms"];

export const useAddForm = () => {
  const addForm = async ({ companyName, formNumber, formDate, addedBy }) => {
    const { data, error } = await supabase
      .from("debt-forms")
      .insert({
        company_name: companyName.trim(),
        id: formNumber.trim(),
        form_date: formDate,
        added_by: addedBy,
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
  const updateForm = async (form) => {
    const { data, error } = await supabase.from("debt-forms").update(form).eq("id", form.id);
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
