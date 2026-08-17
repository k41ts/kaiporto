import { EntryForm } from "@/components/studio/EntryForm";

export const dynamic = "force-dynamic";

export default function NewEntryPage() {
  return (
    <>
      <div className="studio-head">
        <h1>Entri baru</h1>
      </div>
      <EntryForm />
    </>
  );
}
