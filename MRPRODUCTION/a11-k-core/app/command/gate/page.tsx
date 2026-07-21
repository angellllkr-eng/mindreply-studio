"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function internalNext(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/command";
}

function GateForm() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const next = internalNext(params?.get("next"));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/command/gate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          response.status === 503
            ? "Command access is not configured on this deployment. Add COMMAND_ACCESS_TOKEN and AUTH_SECRET in Vercel."
            : data?.reason || "Access denied",
        );
        return;
      }

      setToken("");
      router.replace(next);
      router.refresh();
    } catch {
      setError("The gate could not be reached. No access was granted.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="card stack" style={{ maxWidth: 420, margin: "4rem auto" }}>
      <p className="faint" style={{ margin: 0, fontSize: "0.7rem", letterSpacing: "0.14em" }}>
        A11-K / PRIVATE COMMAND
      </p>
      <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Command Gate</h1>
      <p className="muted" style={{ margin: 0 }}>
        Enter the owner access token. The browser receives a signed HttpOnly session cookie; the raw token is never stored in the URL.
      </p>
      <div className="field">
        <label htmlFor="gate">Access token</label>
        <input
          id="gate"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
      </div>
      {error ? <p style={{ color: "var(--bad)", margin: 0 }}>{error}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={isSubmitting || !token}>
        {isSubmitting ? "Checking…" : "Enter private command"}
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
