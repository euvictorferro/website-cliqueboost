"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const SERVICES = ["Social media", "Tráfego pago", "Automação com IA", "Complemento", "Método Completo"];
const EMAIL = "contato@cliqueboost.io";

const field =
  "w-full rounded-xl border border-[var(--cb-border-strong)] bg-[var(--cb-bg)]/60 px-4 py-3 text-base outline-none placeholder:text-[var(--cb-muted)] focus:border-[#3b8cff]";
const label = "mb-2 block text-sm font-semibold text-[var(--cb-fg)]";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

/** Formulário de cancelamento e de pedido de reembolso. Só coleta o que a página de apoio manda (nada de CPF, cartão ou senha). */
export function CancelForm() {
  const [tipo, setTipo] = useState<"cancelar" | "reembolso" | "">("");
  const [servicos, setServicos] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [erro, setErro] = useState("");

  const toggle = (s: string) => setServicos((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!tipo) return setErro("Escolha o tipo de pedido.");
    if (!servicos.length) return setErro("Marque pelo menos um serviço.");
    setErro("");
    const data = {
      nome: String(f.get("nome") || ""),
      email: String(f.get("email") || ""),
      tipo,
      servicos,
      item: String(f.get("item") || ""),
      motivo: String(f.get("motivo") || ""),
      confirmo: f.get("confirmo") === "on",
      website: String(f.get("website") || ""), // campo-isca
    };
    setStatus("sending");
    try {
      const res = await fetch("/api/cancelar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.status === 400) {
        setStatus("idle");
        return setErro("Confira os campos e tente de novo.");
      }
      if (!res.ok) throw new Error(String(res.status));
      const out = await res.json();
      if (out.sent) return setStatus("sent");
      // O envio automático ainda não está ligado: abre o e-mail do cliente com o pedido pronto.
      const tipoTxt = tipo === "cancelar" ? "cancelamento" : "reembolso pela garantia de entrega";
      const body = [
        `Pedido de ${tipoTxt}`,
        `Nome: ${data.nome}`,
        `E-mail usado na compra: ${data.email}`,
        `Serviço(s): ${servicos.join(", ")}`,
        data.item && `Item não entregue: ${data.item}`,
        data.motivo && `Motivo: ${data.motivo}`,
        "Li a cláusula 6 dos Termos e entendo que o cancelamento vale ao fim do mês pago e que pode haver multa.",
      ].filter(Boolean).join("\n");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Pedido de ${tipoTxt}`)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent")
    return (
      <div className="cb-panel rounded-2xl p-6 md:p-8" role="status">
        <p className="text-lg text-[var(--cb-fg)]">
          Recebemos seu pedido. Enviamos um e-mail de confirmação para o endereço informado. Se não chegar em 1 dia útil, escreva para{" "}
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">{EMAIL}</a>.
        </p>
      </div>
    );
  if (status === "mailto")
    return (
      <div className="cb-panel rounded-2xl p-6 md:p-8" role="status">
        <p className="text-lg text-[var(--cb-fg)]">
          Abrimos o seu e-mail com o pedido pronto. <strong>Envie a mensagem para concluir.</strong> Se ele não abriu, escreva para{" "}
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">{EMAIL}</a> com os mesmos dados.
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="cb-panel rounded-2xl p-6 md:p-8 space-y-6" noValidate={false}>
      <div>
        <label htmlFor="nome" className={label}>Nome completo</label>
        <input id="nome" name="nome" required maxLength={120} autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>E-mail usado na compra</label>
        <input id="email" name="email" type="email" required maxLength={160} autoComplete="email" className={field} />
      </div>

      <fieldset>
        <legend className={label}>Tipo de pedido</legend>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          {([["cancelar", "Cancelar"], ["reembolso", "Pedir reembolso pela garantia de entrega"]] as const).map(([v, t]) => (
            <label key={v} className="flex items-center gap-3 text-[var(--cb-fg)]/90">
              <input type="radio" name="tipo" value={v} checked={tipo === v} onChange={() => setTipo(v)} className="h-5 w-5 accent-[#3b8cff]" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>Serviço(s)</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {SERVICES.map((s) => (
            <label key={s} className="flex items-center gap-3 text-[var(--cb-fg)]/90">
              <input type="checkbox" checked={servicos.includes(s)} onChange={() => toggle(s)} className="h-5 w-5 accent-[#3b8cff]" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      {tipo === "reembolso" && (
        <div>
          <label htmlFor="item" className={label}>Se for reembolso pela garantia: qual item não foi entregue?</label>
          <input id="item" name="item" required maxLength={400} className={field} />
        </div>
      )}

      <div>
        <label htmlFor="motivo" className={label}>Motivo <span className="font-normal text-[var(--cb-muted)]">(opcional)</span></label>
        <textarea id="motivo" name="motivo" rows={4} maxLength={1500} className={field} />
      </div>

      {/* Campo-isca contra robôs: escondido de pessoas. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <label className="flex items-start gap-3 text-[var(--cb-fg)]/90">
        <input type="checkbox" name="confirmo" required className="mt-1 h-5 w-5 shrink-0 accent-[#3b8cff]" />
        <span>
          Li a <Link href="/termos#s-6" className="underline underline-offset-2 text-[var(--cb-fg)]">cláusula 6 dos Termos</Link> e entendo que o cancelamento vale ao fim do mês pago e que pode haver multa.
        </span>
      </label>

      {erro && <p role="alert" className="text-sm font-medium text-[#ff6b61]">{erro}</p>}
      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-[#ff6b61]">
          Não conseguimos enviar agora. Escreva para <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a> com o mesmo pedido.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="cb-neon cb-press inline-flex min-h-12 items-center rounded-full px-8 font-semibold disabled:opacity-60">
        {status === "sending" ? "Enviando..." : "Enviar pedido"}
      </button>
    </form>
  );
}
