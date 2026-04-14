import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export function useSupabase() {
  if (!supabase) {
    console.warn('Supabase URL and Anon Key are missing. Please provide them in your .env.local file.');
  }
  return { supabase };
}
