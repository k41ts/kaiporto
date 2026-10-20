import Image from "next/image";
import Link from "next/link";
import { Barcode } from "@/components/site/Barcode";
import { CopyEmail } from "@/components/site/CopyEmail";
import { Decode } from "@/components/site/Decode";
import { credits, profile } from "@/content/site";

/** Poster merah penutup, dipakai di beranda dan halaman Work. */
export function Contact({ backHome = false }: { backHome?: boolean }) {
  return (
    <footer className="close" id="contact" aria-labelledby="contact-title">
      <Decode className="vk kj" text="連絡" />
      <div>
        <span className="sec-tag" style={{ color: "var(--black)" }}><span className="kj" lang="ja" style={{ color: "#fff" }}>連絡</span>Contact</span>
        <h2 id="contact-title" data-rv style={{ marginTop: 12 }}>Let’s build it</h2>
        <div className="p-rule" />
        <Barcode seed={276} />
        <div className="copyline" data-rv>
          <span className="mail">{profile.email}</span>
          <CopyEmail />
          {backHome ? <Link className="pill" href="/">Back to home</Link> : <a className="pill" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
        </div>
        <div className="warn" data-rv>
          <p><b>Note:</b> a rough idea is enough to start. Tell me who will use it and what it must do on day one. I reply within a day.</p>
        </div>
      </div>
      <div className="bot">
        <Image src="/img/g-oni-red.jpg" alt="Side profile of a matte black oni mask with long horns and bared fangs" width={1024} height={1024} sizes="(max-width: 760px) 100vw, 45vw" />
      </div>
      <div className="credits">
        <span>© 2026 {profile.name}, Jakarta</span>
        <p>{credits}</p>
      </div>
    </footer>
  );
}
