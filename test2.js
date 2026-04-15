import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mkiblobbfynexxdrywwn.supabase.co";
const supabaseKey = "sb_publishable_H4YZMRueGfEUpd9yzSH2Pg_qxgFOlpy";

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
    
  console.log("Error details:", error);
}

test();
