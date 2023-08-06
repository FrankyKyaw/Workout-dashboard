import { createClient, SupabaseClient } from "@supabase/supabase-js";


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveHdwZmljbHliZXNmb2ZiY25kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1NTkwODYsImV4cCI6MTk5MzEzNTA4Nn0.CeoaOyiOAywTtEUFV7gNzmUzjrWz65l_kFLsBHR4t3c";


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;