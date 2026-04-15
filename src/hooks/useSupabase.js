import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mkiblobbfynexxdrywwn.supabase.co";
const supabaseKey = "sb_publishable_H4YZMRueGfEUpd9yzSH2Pg_qxgFOlpy";
export const supabase = createClient(supabaseUrl, supabaseKey);
