"use client";

import { useState } from "react";
import { EmailError, sendContactEmail } from "@/lib/emailService";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("submitting");
    setErrorMsg("");

    try {
      await sendContactEmail({ name, email, message });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      const code = (err as Error & { code?: string }).code;
      if (code === EmailError.API_UNAVAILABLE || code === EmailError.NETWORK) {
        setErrorMsg("Email API is not running. Use npm run dev:all locally.");
      } else {
        setErrorMsg((err as Error).message || "Something went wrong.");
      }
    }
  };

  if (status === "success") {
    return (
      <p className="rounded-xl border border-primary/30 bg-surface-card p-6 text-primary">
        Message sent — we&apos;ll reply from the shop soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-steel-light/20 bg-surface-card p-6"
    >
      {status === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}
      <label className="block text-sm">
        <span className="mb-1 block text-text-muted">Name</span>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-lg border border-steel-light/20 bg-surface-card px-3 py-2 text-text focus:border-primary focus:outline-none"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-text-muted">Email</span>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-steel-light/20 bg-surface-card px-3 py-2 text-text focus:border-primary focus:outline-none"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-text-muted">Project details</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Size, material, quantity, deadline..."
          className="w-full rounded-lg border border-steel-light/20 bg-surface-card px-3 py-2 text-text focus:border-primary focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-text-inverse disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send quote request"}
      </button>
    </form>
  );
}
