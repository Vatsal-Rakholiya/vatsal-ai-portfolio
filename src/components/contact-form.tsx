"use client";

import { Send } from "lucide-react";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
      })
    });

    if (response.ok) {
      form.reset();
      setStatus("sent");
      return;
    }

    setStatus("error");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Name"
          className="h-12 rounded-md border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-mint/70"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="h-12 rounded-md border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-mint/70"
        />
      </div>
      <textarea
        name="message"
        required
        minLength={10}
        placeholder="Tell me about the data problem, model, or product you want to build."
        className="min-h-32 resize-y rounded-md border border-white/10 bg-white/[0.06] p-4 text-sm text-white outline-none transition focus:border-mint/70"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-mint px-5 text-sm font-semibold text-ink transition hover:bg-signal disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={17} />
        {status === "sending" ? "Sending" : "Send signal"}
      </button>
      {status === "sent" && <p className="text-sm text-mint">Message saved. Vatsal can review it from the admin panel.</p>}
      {status === "error" && <p className="text-sm text-coral">The message could not be saved. Check the fields and try again.</p>}
    </form>
  );
}
