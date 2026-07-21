"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function GateForm() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/command";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/command/gate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) {
      setError("Access denied");
      return;
    }
    router.replace(next);
  }

  return (
    <form onSubmit={submit} className="card stack" style={{ maxWidth: 420, margin: "4rem auto" }}>
      <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Command Gate</h1>
      <p className="muted" style={{ margin: 0 }}>
        Stealth access. Token is never logged. Required when COMMAND_ACCESS_TOKEN is set.
      </p>
      <div className="field">
        <label htmlFor="gate">Access token</label>
        <input
          id="gate"
          type="password"
          autoComplete="off"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      {error ? <p style={{ color: "var(--bad)", margin: 0 }}>{error}</p> : null}
      <button className="btn btn-primary" type="submit">
        Enter
      </button>
    </form>
  );
}

export default function GatePage() {
  return (
    <Suspense fallback={<div className="container muted">Loading gate…</div>}>
      <GateForm />
    </Suspense>
  );
}
