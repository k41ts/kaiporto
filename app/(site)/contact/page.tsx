import type { Metadata } from "next";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "The fastest ways to start a conversation about a project.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 60;

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <>
      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span className="eyebrow">Contact</span>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 500, letterSpacing: "-0.035em" }}>
          Tell me about the project
        </h1>
        <p className="lede">
          No polished brief needed. One paragraph about what you want built and when it needs to run
          is enough for me to tell you whether I am the right person for it.
        </p>
        <span className="status" data-available={profile.available}>
          <i />
          {profile.availableLabel}
        </span>
      </section>

      <section className="contact-grid" data-reveal>
        <a className="contact-card g-card" href={`mailto:${profile.email}`}>
          <span className="k">Email</span>
          <span className="v">{profile.email}</span>
          <span className="note">Best for anything that needs detail.</span>
        </a>

        {profile.socials.map((social) => (
          <a
            className="contact-card g-card"
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="k">{social.label}</span>
            <span className="v">Open ↗</span>
            <span className="note">
              {social.label === "WhatsApp" ? "For anything that needs an answer today." : "More of my work."}
            </span>
          </a>
        ))}
      </section>
    </>
  );
}
