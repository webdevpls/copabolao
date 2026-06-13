import { createClient } from "@supabase/supabase-js"

const url  = import.meta.env.VITE_SUPABASE_URL
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error(
    "[Supabase] VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não definidas.\n" +
    "Crie um arquivo .env.local com essas variáveis."
  )
}

export const supabase = createClient(url, key)
