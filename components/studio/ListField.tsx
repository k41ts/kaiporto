"use client";

import { useState } from "react";

export type FieldSpec = {
  key: string;
  label: string;
  placeholder?: string;
  textarea?: boolean;
};

type Row = Record<string, string>;

/**
 * Daftar isian berulang — dipakai buat kartu peran dan kartu hantu.
 *
 * Sebelumnya dua-duanya cuma textarea JSON mentah. Itu maksa orang ngetik
 * kurung dan koma dengan bener, dan satu salah ketik bikin seluruh isinya
 * ke-reset diam-diam. Sekarang JSON-nya dirakit komponen ini, jadi selalu sah.
 */
export function ListField({
  name,
  label,
  hint,
  fields,
  initial = [],
  addLabel = "Tambah",
  max,
  /** Isi otomatis kolom ini dengan nomor urut, mis. "Peran 01". */
  autoNumber,
}: {
  name: string;
  label: string;
  hint?: string;
  fields: FieldSpec[];
  initial?: Row[];
  addLabel?: string;
  max?: number;
  autoNumber?: { key: string; prefix: string };
}) {
  const blank = (): Row => Object.fromEntries(fields.map((f) => [f.key, ""]));
  const [rows, setRows] = useState<Row[]>(initial.length ? initial : [blank()]);

  const update = (i: number, key: string, value: string) =>
    setRows((prev) => prev.map((row, index) => (index === i ? { ...row, [key]: value } : row)));

  const remove = (i: number) => setRows((prev) => prev.filter((_, index) => index !== i));
  const add = () => setRows((prev) => [...prev, blank()]);

  // Nomor urut dirakit ulang tiap render supaya tetap rapi setelah ada yang dihapus.
  const serialised = rows
    .filter((row) => fields.some((f) => row[f.key]?.trim()))
    .map((row, i) =>
      autoNumber
        ? { ...row, [autoNumber.key]: `${autoNumber.prefix} ${String(i + 1).padStart(2, "0")}` }
        : row,
    );

  return (
    <div className="field wide">
      <label>{label}</label>

      <div className="list-field">
        {rows.map((row, i) => (
          <div className="list-row" key={i}>
            <div className="list-row-head">
              <span className="list-index mono">
                {autoNumber ? `${autoNumber.prefix} ${String(i + 1).padStart(2, "0")}` : `#${i + 1}`}
              </span>
              {rows.length > 1 && (
                <button
                  type="button"
                  className="media-remove"
                  onClick={() => remove(i)}
                  aria-label={`Hapus baris ${i + 1}`}
                >
                  ×
                </button>
              )}
            </div>

            {fields.map((f) => (
              <div className="list-cell" key={f.key}>
                <label htmlFor={`${name}-${i}-${f.key}`}>{f.label}</label>
                {f.textarea ? (
                  <textarea
                    id={`${name}-${i}-${f.key}`}
                    value={row[f.key] ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) => update(i, f.key, e.target.value)}
                  />
                ) : (
                  <input
                    id={`${name}-${i}-${f.key}`}
                    type="text"
                    value={row[f.key] ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) => update(i, f.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        ))}

        {(!max || rows.length < max) && (
          <button type="button" className="studio-btn ghost" onClick={add}>
            + {addLabel}
          </button>
        )}

        <input type="hidden" name={name} value={JSON.stringify(serialised)} />
        {hint && <span className="hint">{hint}</span>}
      </div>
    </div>
  );
}
