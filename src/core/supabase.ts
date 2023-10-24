import { createClient } from "@supabase/supabase-js";
import { Database } from "lib/database.types";

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
)