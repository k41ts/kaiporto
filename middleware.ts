import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Nyegerin cookie sesi dan ngunci /studio. Halaman publik nggak disentuh —
 * middleware yang ikut campur di sana cuma bikin lambat tanpa guna.
 *
 * Nilai di bawah sengaja dibaca langsung, bukan diimpor dari
 * lib/supabase/config, walaupun isinya sama persis.
 *
 * Alasannya: middleware dibungkus jadi Edge Function waktu deploy, dan
 * bundler-nya nggak nerjemahin path alias "@/". Impor alias di sini bikin
 * Vercel nganggap file itu paket eksternal yang nggak didukung, lalu
 * menggagalkan deploy — padahal `next build` di lokal lolos, karena
 * pembungkusan Edge Function-nya cuma jalan di sisi Vercel.
 *
 * Kalau dua baris ini diubah, ubah juga di lib/supabase/config.ts.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
const supabaseReady = SUPABASE_URL.length > 0 && SUPABASE_KEY.length > 0;

export async function middleware(request: NextRequest) {
  if (!supabaseReady) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/studio/login";

  if (!user && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/studio/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/studio";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/studio/:path*"],
};
