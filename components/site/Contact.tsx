import { CopyEmail } from "@/components/site/CopyEmail";
import { Download, GitHub, LinkedIn } from "@/components/site/icons";
import { credits, profile } from "@/content/site";

/** Ajakan kontak dan footer, dipakai di beranda dan halaman Work. */
export function Contact() {
  return (
    <>
      <section className="sec tight" id="contact" aria-labelledby="contact-title">
        <div className="wrap">
          <div className="cta" data-rv>
            <div>
              <span className="eyebrow">Contact</span>
              <h2 id="contact-title">Hiring for 2027? Let&apos;s talk.</h2>
              <p>I&apos;m available full-time for 12 months in 2027 through the BINUS Enrichment Program. Email me with the role and team, and I&apos;ll send anything else you need. Freelance projects are welcome too.</p>
            </div>
            <div className="mailbox">
              <div className="mailrow">
                <span>{profile.email}</span>
                <CopyEmail className="btn primary sm" label="Copy" />
              </div>
              <div className="acts">
                <a className="btn sm" href={profile.cv} download>Download CV <Download size={14} /></a>
                <a className="btn sm" href={profile.linkedin} target="_blank" rel="noopener"><LinkedIn size={14} /> LinkedIn</a>
                <a className="btn sm" href={profile.github} target="_blank" rel="noopener"><GitHub size={14} /> GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="foot">
        <div className="wrap">
          <span>© 2026 {profile.name} · {profile.location}</span>
          <nav aria-label="Elsewhere">
            <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noopener">GitHub</a>
            <a href={profile.instagram} target="_blank" rel="noopener">Instagram</a>
          </nav>
          <p>{credits}</p>
        </div>
      </footer>
    </>
  );
}
