import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (for storage, realtime — NOT auth)
// Auth is handled by NextAuth
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    // Return a mock client in development when keys aren't set
    console.warn("[Supabase] Missing credentials — using mock mode");
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}
