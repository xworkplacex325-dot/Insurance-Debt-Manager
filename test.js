import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mkiblobbfynexxdrywwn.supabase.co";
const supabaseKey = "sb_publishable_H4YZMRueGfEUpd9yzSH2Pg_qxgFOlpy";

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from("users").select("*");
  console.log("All users:", data);
  console.log("All users error:", error);

  const { data: data2, error: error2 } = await supabase.from("users").select("*").eq("username", "ahmed_rakha").single();
  console.log("Single ahmed_rakha:", data2);
  console.log("Single error:", error2);
}

test();
