import { createClient } from "@supabase/supabase-js";

// Browser-side Supabase client (for realtime subscriptions)
// Uses the anon key — safe for client-side use
let client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("mock")) {
    console.warn("[Supabase] Missing credentials — realtime disabled");
    return null;
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
