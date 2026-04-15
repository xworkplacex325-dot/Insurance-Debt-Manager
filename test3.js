import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mkiblobbfynexxdrywwn.supabase.co";
const supabaseKey = "sb_publishable_H4YZMRueGfEUpd9yzSH2Pg_qxgFOlpy";

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: selectData } = await supabase.from("users").select("*").eq("status", "pending").limit(1);
  console.log("Pending user:", selectData);

  if (selectData && selectData.length > 0) {
    const userId = selectData[0].id;
    console.log("Attempting update on id:", userId);
    
    // We append .select() to force supabase to return the updated rows. If RLS blocks it, length is 0.
    const { data: updateData, error: updateError } = await supabase
      .from("users")
      .update({ status: "approved" })
      .eq("id", userId)
      .select();

    console.log("Update Error:", updateError);
    console.log("Returned updated rows:", updateData);
  }
}

test();
