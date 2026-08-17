import Link from "next/link";
import { getAllEntriesForStudio } from "@/lib/content";
import { deleteEntry } from "../actions";

export const dynamic = "force-dynamic";

const PILL: Record<string, string> = { published: "live", draft: "draft", archived: "arch" };

export default async function StudioIndex() {
  const entries = await getAllEntriesForStudio();

  return (
    <>
      <div className="studio-head">
        <h1>Work</h1>
        <Link href="/studio/entry/new" className="studio-btn">
          + Entri baru
        </Link>
      </div>

      <div className="studio-table-wrap">
        {entries.length === 0 ? (
          <p className="empty-row">
            Belum ada entri. Bikin yang pertama — grid di situs bakal nyusun sendiri begitu ada isinya.
          </p>
        ) : (
          <table className="studio-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Tipe</th>
                <th>Perangkat</th>
                <th>Tahun</th>
                <th>Status</th>
                <th>Urut</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.slug}>
                  <td>
                    <Link href={`/studio/entry/${entry.slug}`}>{entry.title}</Link>
                    {entry.featured && <span className="pill live" style={{ marginLeft: 8 }}>Sorotan</span>}
                  </td>
                  <td>{entry.type === "note" ? "Note" : "Build"}</td>
                  <td>{entry.device === "none" ? "—" : entry.device}</td>
                  <td className="mono tnum">{entry.year}</td>
                  <td>
                    <span className={`pill ${PILL[entry.status]}`}>{entry.status}</span>
                  </td>
                  <td className="mono tnum">{entry.order}</td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <form action={deleteEntry} style={{ display: "inline" }}>
                      <input type="hidden" name="slug" value={entry.slug} />
                      <button type="submit" className="studio-btn danger">
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="note">
        Grid di situs nyusun ulang sendiri dari jumlah entri yang statusnya <strong>published</strong>.
        Sisa baris yang nggak penuh diisi kartu bergaris putus-putus — isinya diatur di Profil.
      </p>
    </>
  );
}
