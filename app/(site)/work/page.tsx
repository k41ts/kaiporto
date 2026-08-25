import type { Metadata } from "next";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getProfile, getPublishedEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and technical notes: systems built from scratch, systems repaired, and what I learned along the way.",
  alternates: { canonical: "/work" },
};

export const revalidate = 60;

export default async function WorkPage() {
  const [profile, entries] = await Promise.all([getProfile(), getPublishedEntries()]);

  return (
    <>
      <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span className="eyebrow">Work</span>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 500, letterSpacing: "-0.035em" }}>
          What I have built, and why it was built that way
        </h1>
        <p className="lede">
          Full case studies and shorter technical notes, mixed together. Open any of them to read
          the story — including the parts that failed first.
        </p>
      </section>

      {/* Nggak ada cabang "kosong" di sini dengan sengaja: waktu belum ada entri,
          grid nampilin kartu hantu. Pengunjung lihat rencana, bukan situs rusak. */}
      <WorkGrid entries={entries} ghosts={profile.ghosts} priorityFirst stacked />
    </>
  );
}
