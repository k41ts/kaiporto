"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ListField } from "@/components/studio/ListField";
import { MediaField } from "@/components/studio/MediaField";
import { saveProfile, type ActionState } from "@/app/(studio)/studio/actions";
import type { Profile } from "@/lib/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="studio-btn" disabled={pending}>
      {pending ? "Nyimpen…" : "Simpan profil"}
    </button>
  );
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction] = useActionState<ActionState, FormData>(saveProfile, {});

  return (
    <form action={formAction} className="studio-form">
      {state.error && <p className="alert error">{state.error}</p>}
      {state.ok && <p className="alert ok">{state.ok}</p>}

      <fieldset className="fieldset">
        <legend>Identitas</legend>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="name">Nama panggilan</label>
            <input id="name" name="name" type="text" required defaultValue={profile.name} />
            <span className="hint">Muncul di title bar jendela.</span>
          </div>
          <div className="field">
            <label htmlFor="full_name">Nama lengkap</label>
            <input id="full_name" name="full_name" type="text" defaultValue={profile.fullName} />
          </div>
          <div className="field wide">
            <label htmlFor="headline">Headline</label>
            <input id="headline" name="headline" type="text" defaultValue={profile.headline} />
          </div>
          <div className="field wide">
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" defaultValue={profile.bio.join("\n\n")} style={{ minHeight: 110 }} />
            <span className="hint">Pisahkan paragraf dengan baris kosong.</span>
          </div>
          <div className="field">
            <label htmlFor="location">Lokasi</label>
            <input id="location" name="location" type="text" defaultValue={profile.location} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required defaultValue={profile.email} />
          </div>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>Foto</legend>
        <div className="grid-2">
          <MediaField
            srcName="photo"
            altName="photo_alt"
            label="Foto profil"
            initial={profile.photo ? [{ src: profile.photo, alt: profile.photoAlt }] : []}
            hint="Persegi paling bagus — dipotong 1:1 dengan fokus ke atas."
          />
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>Ketersediaan</legend>
        <div className="grid-2">
          <div className="field">
            <label>Status</label>
            <label className="check">
              <input type="checkbox" name="available" defaultChecked={profile.available} />
              Lagi terima proyek
            </label>
            <span className="hint">Ngubah warna titik di badge: hijau kalau buka, kuning kalau nggak.</span>
          </div>
          <div className="field">
            <label htmlFor="available_label">Teks badge</label>
            <input id="available_label" name="available_label" type="text" defaultValue={profile.availableLabel} />
          </div>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>Peran, skill &amp; tautan</legend>
        <div className="grid-2">
          <ListField
            name="roles"
            label="Kartu peran"
            addLabel="Tambah peran"
            max={4}
            autoNumber={{ key: "key", prefix: "Role" }}
            fields={[
              { key: "title", label: "Judul", placeholder: "Software Engineer" },
              {
                key: "description",
                label: "Penjelasan",
                placeholder: "Satu kalimat, pakai bahasa manusia.",
                textarea: true,
              },
            ]}
            initial={profile.roles.map((r) => ({ title: r.title, description: r.description }))}
            hint="Nomornya diisi otomatis. Tiga sampai empat masih enak dibaca; lebih dari itu halaman depan jadi ramai."
          />
          <div className="field wide">
            <label htmlFor="skills">Skill</label>
            <input id="skills" name="skills" type="text" defaultValue={profile.skills.join(", ")} />
            <span className="hint">Pisahkan dengan koma. Yang pertama dikasih warna aksen.</span>
          </div>
          <div className="field wide">
            <label htmlFor="socials">Sosial</label>
            <textarea id="socials" name="socials" defaultValue={profile.socials.map((s) => `${s.label} | ${s.href}`).join("\n")} style={{ minHeight: 80 }} />
            <span className="hint">Satu per baris: <span className="mono">GitHub | https://…</span></span>
          </div>
          <ListField
            name="ghosts"
            label="Kartu hantu"
            addLabel="Tambah kartu"
            fields={[
              { key: "title", label: "Judul", placeholder: "Lagi dikerjain" },
              { key: "eta", label: "Perkiraan", placeholder: "Q4 2026" },
            ]}
            initial={profile.ghosts.map((g) => ({ title: g.title, eta: g.eta }))}
            hint="Kartu bergaris putus-putus yang ngisi sisa baris kosong di grid Work."
          />
        </div>
      </fieldset>

      <div className="form-actions">
        <SubmitButton />
      </div>
    </form>
  );
}
