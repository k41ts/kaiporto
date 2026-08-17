/**
 * Situsnya harus tetap jalan sebelum Supabase diisi. Selama dua variabel ini
 * kosong, lib/content.ts baca dari content/site.ts dan Studio bilang apa yang
 * kurang — bukan crash.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const supabaseReady = SUPABASE_URL.length > 0 && SUPABASE_KEY.length > 0;
