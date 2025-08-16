
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// @ts-expect-error: Supabase types mismatch in server-side client
export const supabase = createClient(supabaseUrl, supabaseKey)