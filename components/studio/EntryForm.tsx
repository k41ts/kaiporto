"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { MediaField } from "@/components/studio/MediaField";
import { saveEntry, type ActionState } from "@/app/(studio)/studio/actions";
import type { Entry } from "@/lib/types";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="studio-btn" disabled={pending}>
      {pending ? "Nyimpen…" : children}
    </button>
  );
}

export function EntryForm({ entry }: { entry?: Entry }) {
  const [state, formAction] = useActionState<ActionState, FormData>(saveEntry, {});
  const isNew = !entry;

  return (
    <form action={formAction} className="studio-form">
      {state.error && <p className="alert error">{state.error}</p>}

      <fieldset className="fieldset">
        <legend>Dasar</legend>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="title">Judul</label>
            <input id="title" name="title" type="text" required defaultValue={entry?.title} />
          </div>
          <div className="field">
            <label htmlFor="slug">Slug</label>
            <input
              id="slug"
              name="slug"
              type="text"
              required
              pattern="[a-z0-9\-]+"
              defaultValue={entry?.slug}
              readOnly={!isNew}
            />
            <span className="hint">
              {isNew ? "Huruf kecil, angka, tanda hubung. Ini jadi URL-nya." : "Slug dikunci — ngubahnya bikin link lama mati."}
            </span>
          </div>
          <div className="field">
            <label htmlFor="type">Tipe</label>
            <select id="type" name="type" defaultValue={entry?.type ?? "build"}>
              <option value="build">Build — ada screenshot</option>
              <option value="note">Note — tulisan doang</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="device">Perangkat</label>
            <select id="device" name="device" defaultValue={entry?.device ?? "desktop"}>
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="both">Dua-duanya</option>
              <option value="none">Nggak ada (buat tulisan)</option>
            </select>
            <span className="hint">Ini yang nentuin bingkainya: browser 16:10 atau bodi HP 9:19.5.</span>
          </div>
          <div className="field wide">
            <label htmlFor="summary">Ringkasan</label>
            <textarea id="summary" name="summary" defaultValue={entry?.summary} style={{ minHeight: 64 }} />
            <span className="hint">Satu-dua kalimat. Kepakai di kartu grid dan deskripsi hasil pencarian.</span>
          </div>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>Isi</legend>
        <div className="grid-2">
          <div className="field wide">
            <label htmlFor="body">Badan artikel</label>
            <textarea id="body" name="body" className="tall" defaultValue={entry?.body.join("\n\n")} />
            <span className="hint">Pisahkan paragraf dengan baris kosong. Baris yang diawali &ldquo;## &rdquo; jadi subjudul.</span>
          </div>
          <div className="field wide">
            <label htmlFor="pullquote">Kutipan besar</label>
            <input id="pullquote" name="pullquote" type="text" defaultValue={entry?.pullquote} />
            <span className="hint">Opsional. Satu kalimat paling kuat dari tulisannya.</span>
          </div>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>Gambar</legend>
        <div className="grid-2">
          <MediaField
            srcName="cover_src"
            altName="cover_alt"
            label="Cover"
            initial={entry?.cover?.src ? [{ src: entry.cover.src, alt: entry.cover.alt }] : []}
            hint="Teks alt boleh dikosongin selama masih draft — baru wajib waktu diterbitkan."
          />
          <MediaField
            jsonName="gallery"
            label="Galeri screenshot"
            initial={entry?.gallery.map((g) => ({ src: g.src ?? "", alt: g.alt })) ?? []}
          />
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>Detail</legend>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="year">Tahun</label>
            <input id="year" name="year" type="number" min={2000} max={2100} defaultValue={entry?.year ?? new Date().getFullYear()} />
          </div>
          <div className="field">
            <label htmlFor="client">Klien</label>
            <input id="client" name="client" type="text" defaultValue={entry?.client} />
          </div>
          <div className="field">
            <label htmlFor="role">Peran</label>
            <input id="role" name="role" type="text" defaultValue={entry?.role} />
          </div>
          <div className="field">
            <label htmlFor="duration">Durasi</label>
            <input id="duration" name="duration" type="text" defaultValue={entry?.duration} />
          </div>
          <div className="field wide">
            <label htmlFor="stack">Stack</label>
            <input id="stack" name="stack" type="text" defaultValue={entry?.stack.join(", ")} />
            <span className="hint">Pisahkan dengan koma. Sebut juga di badan artikel — itu yang kebaca Google.</span>
          </div>
          <div className="field wide">
            <label htmlFor="links">Tautan</label>
            <textarea id="links" name="links" defaultValue={entry?.links.map((l) => `${l.label} | ${l.href}`).join("\n")} style={{ minHeight: 70 }} />
            <span className="hint">Satu per baris, format: <span className="mono">Situs | https://…</span></span>
          </div>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>Terbit &amp; SEO</legend>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={entry?.status ?? "draft"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="published_at">Tanggal terbit</label>
            <input id="published_at" name="published_at" type="date" defaultValue={entry?.publishedAt || undefined} />
          </div>
          <div className="field">
            <label htmlFor="order">Urutan</label>
            <input id="order" name="order" type="number" defaultValue={entry?.order ?? 0} />
            <span className="hint">Makin kecil makin atas.</span>
          </div>
          <div className="field">
            <label>Sorotan</label>
            <label className="check">
              <input type="checkbox" name="featured" defaultChecked={entry?.featured} />
              Naikin ke petak sorotan
            </label>
            <span className="hint">Grid nyusun ulang sendiri. Mobile &amp; tulisan nggak pernah jadi sorotan.</span>
          </div>
          <div className="field wide">
            <label htmlFor="seo_title">Judul SEO</label>
            <input id="seo_title" name="seo_title" type="text" defaultValue={entry?.seoTitle} />
            <span className="hint">Kosongin buat ikut judul di atas.</span>
          </div>
          <div className="field wide">
            <label htmlFor="seo_description">Deskripsi SEO</label>
            <textarea id="seo_description" name="seo_description" defaultValue={entry?.seoDescription} style={{ minHeight: 60 }} />
          </div>
        </div>
      </fieldset>

      <div className="form-actions">
        <SubmitButton>{isNew ? "Bikin entri" : "Simpan perubahan"}</SubmitButton>
        <Link href="/studio" className="studio-btn ghost">
          Batal
        </Link>
        {/* Error diulang di sini juga: form ini panjang, dan pesan yang cuma ada
            di paling atas nggak kebaca sama orang yang lagi mencet Simpan. */}
        {state.error && <span className="alert error">{state.error}</span>}
      </div>
    </form>
  );
}
