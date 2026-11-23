"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "contato@cliqueboost.io";
const field =
  "w-full rounded-xl border border-[var(--cb-border-strong)] bg-[var(--cb-bg)]/60 px-4 py-3 text-base outline-none placeholder:text-[var(--cb-muted)] focus:border-[#3b8cff]";
const label = "mb-2 block text-sm font-semibold text-[var(--cb-fg)]";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

/** Amostra grátis: nome, e-mail e link do anúncio. Sem o envio automático, abre o e-mail já preenchido. */
export function PhotoLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [erro, setErro] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = {
      name: String(f.get("name") || "").trim(),
      email: String(f.get("email") || "").trim(),
      link: String(f.get("link") || "").trim(),
      website: String(f.get("website") || ""), // campo-isca
    };
    if (!data.name || !data.email || !data.link) return setErro("Please fill in all three fields.");
    setErro("");
    setStatus("sending");
    try {
      const res = await fetch("/api/fotos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.status === 400) {
        setStatus("idle");
        return setErro("Check the fields and try again. The listing link must start with https://");
      }
      if (!res.ok) throw new Error(String(res.status));
      const out = await res.json();
      if (out.sent) return setStatus("sent");
      const body = `Name: ${data.name}\nEmail: ${data.email}\nListing link: ${data.link}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Free photo sample request")}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" || status === "mailto") {
    return (
      <p className="cb-panel rounded-2xl p-8 text-lg">
        Thanks! We received your request. We will send your free sample of 12 photos to {" "}
        the email you gave us, within 48 hours.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="cb-panel rounded-2xl p-6 md:p-8 grid gap-5" noValidate>
      <div>
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" name="name" autoComplete="name" className={field} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="link" className={label}>Listing link</label>
        <input id="link" name="link" type="url" className={field} placeholder="https://www.airbnb.com/rooms/..." />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {erro && <p role="alert" className="text-sm text-red-400">{erro}</p>}
      {status === "error" && <p role="alert" className="text-sm text-red-400">Something went wrong. Please email {EMAIL}.</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="cb-neon cb-press font-bold px-8 py-4 rounded-full justify-self-start disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send me my free sample"}
      </button>
    </form>
  );
}
