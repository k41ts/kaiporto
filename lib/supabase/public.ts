import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/lib/supabase/config";

/**
 * Klien anonim tanpa cookie, khusus buat baca konten publik.
 *
 * Kenapa dipisah dari lib/supabase/server.ts: klien yang berbasis cookie
 * manggil `cookies()`, dan itu maksa halaman jadi dinamis — waktu build,
 * pemanggilannya gagal dan datanya diam-diam jatuh ke content/site.ts.
 * Akibatnya halaman statis keisi data contoh. Klien ini nggak nyentuh cookie,
 * jadi halaman publik bisa tetap statis + ISR dan tetap baca database asli.
 */
export function createPublicClient() {
  return createSupabaseClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
