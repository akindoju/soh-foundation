// /lib/supabaseAdmin.ts

import { createClient } from "@supabase/supabase-js"

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase URL or Service Role Key in environment variables")
  }

  return createClient(supabaseUrl, serviceRoleKey)
}
