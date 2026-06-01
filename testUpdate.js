import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mkiblobbfynexxdrywwn.supabase.co";
const supabaseKey = "sb_publishable_H4YZMRueGfEUpd9yzSH2Pg_qxgFOlpy";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpdate() {
  console.log("Fetching first form...");
  const { data: forms, error: fetchError } = await supabase
    .from("debt-forms")
    .select("*")
    .limit(1);

  if (fetchError) {
    console.error("Fetch Error:", fetchError);
    return;
  }

  if (!forms || forms.length === 0) {
    console.log("No forms found.");
    return;
  }

  const form = forms[0];
  console.log("Original Form:", form);

  const payload = {
    id: form.id,
    company_name: "test_update_" + Math.floor(Math.random() * 1000),
    form_date: form.form_date,
    debit: form.debit,
    debt_value: form.debt_value,
    monthly_charge: form.monthly_charge,
  };

  console.log("Attempting update with payload:", payload);
  const { data: updateData, error: updateError } = await supabase
    .from("debt-forms")
    .update(payload)
    .eq("id", form.id)
    .select();

  console.log("Update call result:");
  console.log("Returned Data:", updateData);
  console.log("Returned Error:", updateError);

  console.log("Fetching the same form again to verify:");
  const { data: refetchedForms } = await supabase
    .from("debt-forms")
    .select("*")
    .eq("id", form.id);
  console.log("Refetched Form:", refetchedForms?.[0]);
}

testUpdate();
