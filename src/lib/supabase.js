import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please check .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to handle Supabase responses with consistent error logging
 * @param {Promise} request - The Supabase query promise
 * @returns {Promise<{data: any, error: any}>}
 */
export const handleSupabase = async (request) => {
  try {
    const { data, error } = await request;
    if (error) {
      console.error("Supabase API Error:", error.message, error.details);
    }
    return { data, error };
  } catch (err) {
    console.error("Unexpected Supabase Error:", err);
    return { data: null, error: err };
  }
};
