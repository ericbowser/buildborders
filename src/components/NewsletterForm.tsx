"use client";

import { useState } from "react";
import { EmailError, sendSubscribeNotification } from "@/lib/emailService";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      await sendSubscribeNotification(email);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      const code = (err as Error & { code?: string }).code;
      if (code === EmailError.API_UNAVAILABLE || code === EmailError.NETWORK) {
        setErrorMsg("Newsletter API offline — run npm run dev:all.");
      } else {
        setErrorMsg((err as Error).message || "Subscribe failed.");
      }
    }
  };

  if (status === "success") {
    return <p className="text-sm text-primary font-medium">You&apos;re subscribed.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {status === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="rounded-lg border border-steel-light/20 bg-surface-card px-3 py-2 text-sm text-text placeholder-text-muted/60 focus:border-primary focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-text-inverse disabled:opacity-60"
      >
        {status === "submitting" ? "Subscribing…" : "Subscribe"}
      </button>
    </form>
  );
}
