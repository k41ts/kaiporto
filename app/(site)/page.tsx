import Image from "next/image";
import Link from "next/link";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getProfile, getPublishedEntries } from "@/lib/content";

/** Konten dari database ikut kebawa ke halaman statis; disegarkan tiap menit. */
export const revalidate = 60;

export default async function HomePage() {
  const [profile, entries] = await Promise.all([getProfile(), getPublishedEntries()]);
  const featured = entries.slice(0, 3);

  return (
    <>
      <section className="hero" data-reveal>
        <div className="hero-photo">
          <Image
            src={profile.photo}
            alt={profile.photoAlt}
            width={352}
            height={352}
            priority
            sizes="(max-width: 720px) 132px, 176px"
          />
        </div>

        <div className="hero-copy">
          <span className="status" data-available={profile.available}>
            <i />
            {profile.availableLabel}
          </span>

          <h1>
            {profile.name} — {profile.headline}
          </h1>

          {profile.bio.map((line, i) => (
            <p key={i} className="lede">
              {line}
            </p>
          ))}

          <div className="chips">
            {profile.skills.map((skill, i) => (
              <span key={skill} className={i === 0 ? "chip solid" : "chip"}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="role-row" data-reveal>
        {profile.roles.map((role) => (
          <div className="role g-card" key={role.key}>
            <span className="k">{role.key}</span>
            <span className="t">{role.title}</span>
            <span className="d">{role.description}</span>
          </div>
        ))}
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="section-head">
          <h2>Selected work</h2>
          <Link href="/work" className="link-more">
            See all →
          </Link>
        </div>
        <WorkGrid entries={featured} ghosts={profile.ghosts} priorityFirst />
      </section>
    </>
  );
}
