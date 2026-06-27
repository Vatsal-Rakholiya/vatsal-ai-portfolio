"use client";

import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: formData.get("password") })
    });

    setLoading(false);

    if (!response.ok) {
      setError("Invalid admin password.");
      return;
    }

    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-lg p-6">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-mint text-ink">
          <LockKeyhole size={23} />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-mint">admin access</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Portfolio control room</h1>
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="mt-6 h-12 w-full rounded-md border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-mint/70"
        />
        {error && <p className="mt-3 text-sm text-coral">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 h-12 w-full rounded-md bg-mint text-sm font-semibold text-ink transition hover:bg-signal disabled:opacity-60"
        >
          {loading ? "Checking" : "Unlock admin"}
        </button>
      </form>
    </main>
  );
}
