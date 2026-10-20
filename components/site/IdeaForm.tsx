"use client";

import { useState } from "react";
import { profile } from "@/content/site";
import { Chevrons } from "@/components/site/icons";

/** Satu kolom ide. Nggak ada backend: tombolnya membuka aplikasi email dengan ide yang sudah terisi. */
export function IdeaForm() {
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = String(new FormData(e.currentTarget).get("idea") || "").trim();
    if (!text) {
      setNote("Write your idea first, then press Send idea.");
      e.currentTarget.querySelector("input")?.focus();
      return;
    }
    const body = `Hi Zaidan,\n\n${text}\n\n`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Project idea")}&body=${encodeURIComponent(body)}`;
    setNote(`If no email app opened, send it to ${profile.email}.`);
  };

  return (
    <>
      <form className="idea" onSubmit={submit} noValidate>
        <label className="sr" htmlFor="ideaIn">
          Your idea
        </label>
        <input id="ideaIn" name="idea" type="text" autoComplete="off" placeholder="Tell me your idea in one line…" />
        <button className="pill black" type="submit">
          Send idea{" "}
          <span className="go">
            <Chevrons />
          </span>
        </button>
      </form>
      <p aria-live="polite" style={{ fontSize: 13, color: "var(--soft)", minHeight: "1.3em", paddingLeft: 20, marginTop: -6 }}>
        {note}
      </p>
    </>
  );
}
