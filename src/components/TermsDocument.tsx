import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import { PrintButton } from "./PrintButton";

/**
 * Página de Termos de Serviço. O texto mora em `src/content/termos.md` (é lá que o Victor preenche os campos
 * `[[entre colchetes duplos]]`). Aqui o markdown é lido na hora do build e desenhado no padrão do site.
 * Regras do texto: cláusulas marcadas com ⚠ saem em negrito (o ⚠ não aparece); campos em aberto saem destacados.
 */

type Block =
  | { t: "h1"; text: string }
  | { t: "meta"; text: string }
  | { t: "h2"; num: string; title: string; id: string }
  | { t: "list"; items: { text: string; warn: boolean }[] }
  | { t: "clause"; num: string; text: string; warn: boolean }
  | { t: "p"; text: string; warn: boolean }
  | { t: "table"; head: string[]; rows: string[][] };

const clean = (s: string) => s.replace(/⚠\s*/g, "");

function parse(md: string): Block[] {
  const blocks: Block[] = [];
  // Há uma linha em que duas cláusulas vieram coladas (19.1 e 19.2): separa antes de cada "N.N. ".
  const lines = md.split("\n").flatMap((l) => l.split(/(?<=[.!?])(?=\d{1,2}\.\d{1,2}\. )/));
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === "---") continue;
    if (line.startsWith("# ")) blocks.push({ t: "h1", text: line.slice(2) });
    else if (line.startsWith("## ")) {
      const m = line.slice(3).match(/^(\d+)\.\s+(.*)$/);
      blocks.push({ t: "h2", num: m ? m[1] : "", title: m ? m[2] : line.slice(3), id: m ? `s-${m[1]}` : "resumo" });
    } else if (line.startsWith("- ")) {
      const items: { text: string; warn: boolean }[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        const raw = lines[i].trim().slice(2);
        items.push({ text: clean(raw), warn: raw.includes("⚠") });
        i++;
      }
      i--;
      blocks.push({ t: "list", items });
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
        i++;
      }
      i--;
      blocks.push({ t: "table", head: rows[0], rows: rows.slice(2) }); // rows[1] é a linha de traços
    } else if (/^\d+\.\d+\.\s/.test(line)) {
      const m = line.match(/^(\d+\.\d+)\.\s+(.*)$/)!;
      blocks.push({ t: "clause", num: m[1], text: clean(m[2]), warn: line.includes("⚠") });
    } else if (line.startsWith("Versão")) blocks.push({ t: "meta", text: line });
    else blocks.push({ t: "p", text: clean(line), warn: line.includes("⚠") });
  }
  return blocks;
}

/** Texto com **negrito**, *itálico*, `[[campo a preencher]]` e "cláusula N" virando link para a cláusula. */
function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  text.split(/(\*\*.+?\*\*|`?\[\[.*?\]\]`?|\*.+?\*)/).forEach((tok, i) => {
    if (!tok) return;
    if (tok.startsWith("**")) out.push(<strong key={i} className="font-semibold text-[var(--cb-fg)]"><Inline text={tok.slice(2, -2)} /></strong>);
    else if (tok.includes("[[")) {
      const inner = tok.replace(/`/g, "").slice(2, -2).trim();
      out.push(
        <span key={i} className="cb-field" title="Campo a preencher">
          {inner || "a preencher"}
        </span>
      );
    } else if (tok.startsWith("*")) out.push(<em key={i}>{tok.slice(1, -1)}</em>);
    else
      tok.split(/(cláusula\s\d+)/).forEach((part, j) => {
        const m = part.match(/^cláusula\s(\d+)$/);
        out.push(m ? <a key={`${i}-${j}`} href={`#s-${m[1]}`} className="underline underline-offset-2 hover:text-[var(--cb-fg)]">{part}</a> : part);
      });
  });
  return <>{out}</>;
}

export function TermsDocument() {
  const md = fs.readFileSync(path.join(process.cwd(), "src/content/termos.md"), "utf8");
  const blocks = parse(md);
  const title = blocks.find((b) => b.t === "h1") as Extract<Block, { t: "h1" }>;
  const meta = blocks.find((b) => b.t === "meta") as Extract<Block, { t: "meta" }>;
  const resumoAt = blocks.findIndex((b) => b.t === "h2" && b.id === "resumo");
  const summary = blocks[resumoAt + 1] as Extract<Block, { t: "list" }>;
  const body = blocks.slice(resumoAt + 2);
  const sections = body.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2");

  return (
    <div className="px-6 md:px-10 pt-32 md:pt-40 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl">{title.text.replace(/\s+—\s+Clique Boost$/, "")}</h1>
          <p className="mt-6 text-lg text-[var(--cb-muted)]"><Inline text={meta.text} /></p>
          <div className="mt-6"><PrintButton /></div>
        </div>

        {/* Resumo: fica no topo, antes de qualquer pagamento. */}
        <aside id="resumo" className="cb-panel mt-10 max-w-3xl rounded-2xl p-6 md:p-8" style={{ borderColor: "rgba(70,150,255,0.4)" }}>
          <h2 className="font-semibold text-[var(--cb-fg)] text-xl md:text-2xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em", fontSize: undefined }}>
            Resumo (leia antes de pagar)
          </h2>
          <ul className="mt-5 space-y-3">
            {summary.items.map((it, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-[var(--cb-fg)]/85">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b8cff]" aria-hidden />
                <span className={it.warn ? "font-semibold text-[var(--cb-fg)]" : ""}><Inline text={it.text} /></span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="mt-14 grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <nav aria-label="Seções dos Termos" className="hidden lg:block print:hidden">
            <ol className="sticky top-28 space-y-1.5 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-2 text-[var(--cb-muted)] hover:text-[var(--cb-fg)] transition-colors">
                    <span className="w-6 shrink-0 tabular-nums">{s.num}.</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-3xl min-w-0">
            {body.map((b, i) => {
              if (b.t === "h2")
                return (
                  <h2 key={i} id={b.id} className="scroll-mt-28 mt-12 first:mt-0 mb-5 pt-8 border-t border-[var(--cb-border)] first:border-0 first:pt-0 text-3xl md:text-4xl">
                    <span className="text-[var(--cb-muted)] tabular-nums">{b.num}. </span>
                    {b.title}
                  </h2>
                );
              if (b.t === "clause")
                return (
                  <div key={i} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3 py-2 leading-relaxed">
                    <span className="text-[var(--cb-muted)] tabular-nums">{b.num}</span>
                    <p className={b.warn ? "font-semibold text-[var(--cb-fg)]" : "text-[var(--cb-fg)]/85"}><Inline text={b.text} /></p>
                  </div>
                );
              if (b.t === "table")
                return (
                  <div key={i} className="my-5 overflow-x-auto rounded-xl border border-[var(--cb-border)] sm:ml-[3.75rem]">
                    <table className="w-full min-w-[32rem] text-left text-[0.95rem] leading-snug">
                      <thead>
                        <tr className="bg-[var(--cb-panel-raised)]">
                          {b.head.map((h, k) => (
                            <th key={k} className="px-4 py-3 font-semibold text-[var(--cb-fg)]"><Inline text={h} /></th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {b.rows.map((r, k) => (
                          <tr key={k} className="border-t border-[var(--cb-border)] align-top">
                            {r.map((c, m) => (
                              <td key={m} className={`px-4 py-3 ${m === 0 ? "text-[var(--cb-fg)]" : "text-[var(--cb-fg)]/85"}`}><Inline text={c} /></td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              if (b.t === "p")
                return (
                  <p key={i} className={`py-2 leading-relaxed ${b.warn ? "font-semibold text-[var(--cb-fg)]" : "text-[var(--cb-fg)]/85"}`}>
                    <Inline text={b.text} />
                  </p>
                );
              return null;
            })}
            <p className="mt-14 text-sm text-[var(--cb-muted)]">
              <Link href="/" className="underline underline-offset-2 hover:text-[var(--cb-fg)]">Voltar ao site</Link>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
