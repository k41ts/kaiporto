import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeviceFrame } from "@/components/work/DeviceFrame";
import { Gallery } from "@/components/work/Gallery";
import { getAllSlugs, getEntry, getNeighbours, getProfile, getSiteUrl } from "@/lib/content";
import type { Entry } from "@/lib/types";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry(slug);
  if (!entry) return { title: "Not found" };

  const title = entry.seoTitle ?? entry.title;
  const description = entry.seoDescription ?? entry.summary;

  // Kartu share nggak mewarisi gambar dari layout: begitu halaman ini nulis
  // openGraph sendiri, yang nggak disebut di sini hilang. Jadi gambarnya
  // ditulis ulang — cover entri kalau ada, foto profil kalau belum.
  const profile = await getProfile();
  const image = entry.cover?.src ?? profile.photo;
  const imageAlt = entry.cover?.alt || profile.photoAlt;

  return {
    title,
    description,
    alternates: { canonical: `/work/${entry.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/work/${entry.slug}`,
      publishedTime: entry.publishedAt,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** Baris yang diawali "## " jadi subjudul; sisanya paragraf biasa. */
function Prose({ body }: { body: string[] }) {
  return (
    <div className="prose">
      {body.map((block, i) =>
        block.startsWith("## ") ? (
          <h2 key={i}>{block.slice(3)}</h2>
        ) : (
          <p key={i}>{block}</p>
        ),
      )}
    </div>
  );
}

function Rail({ entry }: { entry: Entry }) {
  const rows: { k: string; v: React.ReactNode }[] = [];
  if (entry.role) rows.push({ k: "Role", v: entry.role });
  rows.push({ k: "Year", v: <span className="mono tnum">{entry.year}</span> });
  if (entry.client) rows.push({ k: "Client", v: entry.client });
  if (entry.duration) rows.push({ k: "Duration", v: entry.duration });
  if (entry.stack.length) rows.push({ k: "Stack", v: entry.stack.join(" · ") });
  entry.links.forEach((link) =>
    rows.push({
      k: link.label,
      v: (
        <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
          Open ↗
        </a>
      ),
    }),
  );

  return (
    <aside className="rail g-card">
      {rows.map((row) => (
        <div className="rail-row" key={row.k}>
          <span className="k">{row.k}</span>
          <span className="v">{row.v}</span>
        </div>
      ))}
    </aside>
  );
}

export default async function EntryPage({ params }: Params) {
  const { slug } = await params;
  const entry = await getEntry(slug);
  if (!entry) notFound();

  const { prev, next } = await getNeighbours(slug);
  const siteUrl = getSiteUrl();
  const isNote = entry.type === "note";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isNote ? "Article" : "CreativeWork",
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.publishedAt,
    url: `${siteUrl}/work/${entry.slug}`,
    inLanguage: "id-ID",
    author: { "@id": `${siteUrl}/#person` },
    keywords: entry.stack.join(", "),
    // Gambar yang sama dengan kartu share. Tanpa ini, hasil pencarian yang
    // punya thumbnail nggak tau gambar mana yang mewakili entri ini.
    ...(entry.cover?.src ? { image: entry.cover.src } : {}),
  };

  return (
    <>
      {!isNote && (
        // Bingkai HP dibatasi lebarnya. Kalau dibiarin selebar kolom, rasio
        // 9:18.5 bikin tingginya hampir 1800px — satu tangkapan layar makan
        // seluruh layar sebelum tulisannya kelihatan.
        <div className="detail-cover" data-device={entry.device}>
          <DeviceFrame
            ratio={entry.device === "mobile" ? "mobile" : "banner"}
            shot={entry.cover}
            priority
            sizes={entry.device === "mobile" ? "260px" : "(max-width: 860px) 100vw, 880px"}
          />
        </div>
      )}

      <article className="article">
        <div className="article-body">
          <span className="eyebrow">
            {isNote ? "Note" : "Case study"} · {entry.year}
          </span>
          <h1>{entry.title}</h1>
          <p className="lede">{entry.summary}</p>
          {entry.pullquote && <p className="pullquote">{entry.pullquote}</p>}
          <Prose body={entry.body} />

          {entry.gallery.length > 0 && <Gallery shots={entry.gallery} device={entry.device} />}

          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
              borderTop: "1px solid var(--line)",
              paddingTop: 16,
              marginTop: 8,
            }}
            aria-label="Other entries"
          >
            {prev ? (
              <Link href={`/work/${prev.slug}`} className="note" style={{ color: "var(--accent)" }}>
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/work/${next.slug}`} className="note" style={{ color: "var(--accent)" }}>
                {next.title} →
              </Link>
            )}
          </nav>
        </div>

        <Rail entry={entry} />
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
