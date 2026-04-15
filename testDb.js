import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const SUPABASE_URL = "https://mkiblobbfynexxdrywwn.supabase.co";
const SUPABASE_KEY = "sb_publishable_H4YZMRueGfEUpd9yzSH2Pg_qxgFOlpy";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
  console.log("Inserting...");
  const { data: insData, error: insErr } = await supabase.from("debt-forms").insert({
    company_name: "test_delete_me",
    id: 999999,
    added_by: "test",
    form_date: "2026-01-01"
  }).select();
  if (insErr) console.error("Insert Err:", insErr);
  else console.log("Inserted:", insData);

  console.log("Deleting...");
  const { data: delData, error: delErr } = await supabase.from("debt-forms").delete().eq("id", 999999).select();
  if (delErr) console.error("Delete Err:", delErr);
  else console.log("Deleted:", delData);
}

check();
