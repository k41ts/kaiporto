import Link from "next/link";
import { supabaseReady } from "@/lib/supabase/config";
import { signOut } from "../actions";

function SetupNotice() {
  return (
    <div className="studio-setup">
      <span className="eyebrow">Studio belum nyambung</span>
      <h1>Dua variabel ini belum diisi</h1>
      <p className="note">
        Situs publiknya tetap jalan — sekarang lagi baca dari <span className="mono">content/site.ts</span>.
        Studio baru bisa dipakai setelah <span className="mono">.env.local</span> diisi:
      </p>
      <pre className="mono">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...`}
      </pre>
      <p className="note">
        Dua nilai itu ada di dashboard Supabase → Project Settings → API Keys. Ambil kunci{" "}
        <strong>publishable</strong> (atau <strong>anon</strong>) — <strong>jangan</strong> yang{" "}
        <span className="mono">service_role</span>, itu rahasia dan nggak boleh masuk ke kode yang jalan di browser.
      </p>
      <Link href="/" className="studio-btn ghost">
        ← Balik ke situs
      </Link>
    </div>
  );
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseReady) return <SetupNotice />;

  return (
    <div className="studio-shell">
      <header className="studio-bar">
        <div className="lights" aria-hidden="true">
          <span className="light light-red" />
          <span className="light light-yellow" />
          <span className="light light-green" />
        </div>
        <span className="path">
          studio<b> / portofolio</b>
        </span>
        <span style={{ flex: 1 }} />
        <Link href="/" className="tb-btn" target="_blank">
          Lihat situs ↗
        </Link>
        <form action={signOut}>
          <button type="submit" className="tb-btn">
            Keluar
          </button>
        </form>
      </header>

      <div className="studio-body">
        <aside className="studio-nav">
          <span className="side-label">Konten</span>
          <Link href="/studio" className="side-item">
            Work
          </Link>
          <Link href="/studio/entry/new" className="side-item">
            Entri baru
          </Link>
          <span className="side-label">Situs</span>
          <Link href="/studio/profile" className="side-item">
            Profil &amp; peran
          </Link>
        </aside>
        <main className="studio-main">{children}</main>
      </div>
    </div>
  );
}
