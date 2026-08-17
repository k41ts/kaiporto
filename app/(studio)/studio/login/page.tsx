"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Email atau password salah."
          : error.message,
      );
      setBusy(false);
      return;
    }

    router.push(params.get("next") ?? "/studio");
    router.refresh();
  }

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <span className="eyebrow">Studio</span>
      <h1>Masuk</h1>

      {error && <p className="alert error">{error}</p>}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="studio-btn" disabled={busy}>
        {busy ? "Bentar…" : "Masuk"}
      </button>

      <p className="note" style={{ fontSize: "0.78rem" }}>
        Akunnya dibikin sendiri di dashboard Supabase → Authentication → Users. Pendaftaran lewat
        halaman ini sengaja nggak ada, jadi nggak ada orang lain yang bisa bikin akun.
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="studio-login">
      <Suspense fallback={<div className="login-card">Memuat…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
