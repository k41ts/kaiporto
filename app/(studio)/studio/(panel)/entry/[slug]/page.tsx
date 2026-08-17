import Link from "next/link";
import { notFound } from "next/navigation";
import { EntryForm } from "@/components/studio/EntryForm";
import { getEntryForStudio } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EditEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryForStudio(slug);
  if (!entry) notFound();

  return (
    <>
      <div className="studio-head">
        <h1>{entry.title}</h1>
        {entry.status === "published" && (
          <Link href={`/work/${entry.slug}`} className="studio-btn ghost" target="_blank">
            Lihat di situs ↗
          </Link>
        )}
      </div>
      <EntryForm entry={entry} />
    </>
  );
}
