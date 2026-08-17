"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

type Item = { src: string; alt: string };

/**
 * Unggah langsung dari browser ke Supabase Storage, lalu simpan URL publiknya
 * ke input tersembunyi supaya ikut kebawa waktu form dikirim.
 *
 * Kolom teks alt sengaja nempel di bawah tiap gambar, bukan jadi field terpisah
 * di tempat lain. Versi sebelumnya kepisah, dan akibatnya orang ngunggah gambar
 * lalu kena tolak waktu nyimpen tanpa tau kolom mana yang kurang.
 */
export function MediaField({
  srcName,
  altName,
  jsonName,
  label,
  hint,
  initial = [],
}: {
  /** Mode tunggal: nama input buat URL-nya. */
  srcName?: string;
  /** Mode tunggal: nama input buat teks alt-nya. */
  altName?: string;
  /** Mode banyak: satu input JSON berisi {src, alt}[]. */
  jsonName?: string;
  label: string;
  hint?: string;
  initial?: Item[];
}) {
  const multiple = Boolean(jsonName);
  const [items, setItems] = useState<Item[]>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldId = jsonName ?? srcName ?? "media";

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const uploaded: Item[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() ?? "png";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });

      if (error) {
        setError(error.message);
        setBusy(false);
        return;
      }

      const { data } = supabase.storage.from("media").getPublicUrl(path);
      uploaded.push({ src: data.publicUrl, alt: "" });
    }

    setItems((prev) => (multiple ? [...prev, ...uploaded] : uploaded.slice(-1)));
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  const remove = (i: number) => setItems((prev) => prev.filter((_, index) => index !== i));
  const setAlt = (i: number, alt: string) =>
    setItems((prev) => prev.map((item, index) => (index === i ? { ...item, alt } : item)));

  return (
    <div className="field wide">
      <label htmlFor={`${fieldId}-file`}>{label}</label>

      <div className="uploader">
        <input
          id={`${fieldId}-file`}
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => upload(e.target.files)}
          style={{ display: "none" }}
        />
        <button type="button" className="drop" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? "Lagi ngunggah…" : multiple ? "Pilih gambar (boleh banyak)" : "Pilih gambar"}
        </button>

        {error && <p className="alert error">{error}</p>}

        {items.map((item, i) => (
          <div className="media-row" key={item.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt="" className="media-thumb" />
            <div className="media-alt">
              <label htmlFor={`${fieldId}-alt-${i}`}>Teks alt</label>
              <input
                id={`${fieldId}-alt-${i}`}
                type="text"
                value={item.alt}
                placeholder="Jelasin isi gambarnya buat yang nggak bisa lihat"
                onChange={(e) => setAlt(i, e.target.value)}
              />
              {!item.alt && <span className="alt-warn">Wajib diisi sebelum entri ini diterbitkan.</span>}
            </div>
            <button type="button" className="media-remove" onClick={() => remove(i)} aria-label={`Hapus gambar ${i + 1}`}>
              ×
            </button>
          </div>
        ))}

        {multiple ? (
          <input type="hidden" name={jsonName} value={JSON.stringify(items)} />
        ) : (
          <>
            <input type="hidden" name={srcName} value={items[0]?.src ?? ""} />
            <input type="hidden" name={altName} value={items[0]?.alt ?? ""} />
          </>
        )}

        {hint && <span className="hint">{hint}</span>}
      </div>
    </div>
  );
}
