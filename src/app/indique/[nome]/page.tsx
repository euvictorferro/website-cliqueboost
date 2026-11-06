import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { TODAS_INDICACOES } from "@/content/indicacoes";

export const dynamicParams = false;
export const generateStaticParams = () => TODAS_INDICACOES.map((i) => ({ nome: i.slug }));

type Props = { params: Promise<{ nome: string }> };

const WHATSAPP = "12398214737";

// Página personalizada de um amigo indicado: não deve aparecer em buscas.
export const metadata: Metadata = {
  title: "Indicação | Clique Boost",
  description: "Você foi indicado para a Clique Boost.",
  robots: { index: false, follow: false },
};

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 00-8.43 15.1L2 22l5.03-1.58A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 11-4.3 14.97l-.31-.19-2.98.94.97-2.9-.2-.32A8.1 8.1 0 0112.04 3.8zm-3.1 3.9c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.3 5.2 4.5 2.58 1 3.1.8 3.66.75.56-.05 1.8-.73 2.05-1.45.25-.72.25-1.33.18-1.46-.08-.13-.28-.2-.58-.35-.3-.15-1.8-.9-2.08-1-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.93-2.25-.24-.58-.5-.5-.68-.51h-.58z" />
  </svg>
);

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

const PASSOS = [
  { t: "Você chama a gente no WhatsApp.", d: "Conta um pouco sobre o seu negócio." },
  { t: "Conversamos por 15 minutos.", d: "Entendemos o seu momento e analisamos o seu Instagram." },
  { t: "Você recebe um plano.", d: "Sugestões práticas para o seu perfil e para os seus conteúdos." },
];

const FAZEMOS = [
  { t: "Análise do seu perfil", d: "o que está bom e o que ajustar primeiro.", icon: "M11 4a7 7 0 105.2 11.7L21 20.5M11 8v6M8 11h6" },
  { t: "Conteúdo para o Instagram", d: "ideias e Reels pensados para o seu público.", icon: "M4 6h12a2 2 0 012 2v8a2 2 0 01-2 2H4zM18 10l4-2v8l-4-2" },
  { t: "Atendimento em português", d: "de brasileiro para brasileiro, sem barreira de idioma.", icon: "M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" },
];

export default async function IndiquePage({ params }: Props) {
  const slug = (await params).nome;
  const ind = TODAS_INDICACOES.find((i) => i.slug === slug);
  if (!ind) notFound();

  const nome = ind.nome;
  const quem = nome ?? "Um cliente nosso";
  const ref = ind.ref ?? ind.nome ?? "um cliente";
  // Mensagem já escrita no WhatsApp: com o artigo, "Oi, vim pela Lais. Tudo bem?"; sem, "vim pela indicação de <ref>".
  const msg = ind.art ? `Oi, vim ${ind.art} ${ref}. Tudo bem?` : `Oi, vim pela indicação de ${ref}. Tudo bem?`;
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  const botao = (label: string) => (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="cb-neon cb-press inline-flex w-full sm:w-auto min-h-14 items-center justify-center gap-3 rounded-full px-8 text-lg font-bold hover:scale-[1.03] transition-transform"
    >
      <WaIcon />
      {label}
    </a>
  );

  return (
    <div className="pt-28 md:pt-36 pb-16">
      <div className="max-w-2xl mx-auto px-6 md:px-10">
        {/* Topo: quem indicou e o convite */}
        <Reveal className="text-center">
          <span className="cb-chip inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            {nome ? `Indicação de ${nome}` : "Indicação de um cliente nosso"}
          </span>
          <h1 className="mt-6 text-[2.9rem] leading-[1.02] sm:text-5xl md:text-6xl">{quem} indicou você para a Clique Boost</h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--cb-muted)] leading-relaxed">
            Cuidamos das redes sociais de empreendedores brasileiros nos EUA, em português, para você aparecer melhor e atrair clientes pelo Instagram.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            {botao("Falar no WhatsApp")}
            <p className="text-sm text-[var(--cb-muted)]">Conversa rápida e sem compromisso.</p>
          </div>
        </Reveal>

        <section className="mt-20" aria-labelledby="como">
          <h2 id="como" className="text-3xl md:text-4xl mb-6">Como funciona</h2>
          <ol className="space-y-3">
            {PASSOS.map((p, i) => (
              <li key={p.t}>
                <Reveal delay={i * 0.08}>
                  <div className="cb-panel flex gap-4 rounded-2xl p-5">
                    <span className="cb-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold" aria-hidden>{i + 1}</span>
                    <p className="leading-snug">
                      <strong className="font-semibold text-[var(--cb-fg)]">{p.t}</strong>{" "}
                      <span className="text-[var(--cb-fg)]/85">{p.d}</span>
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="fazemos">
          <h2 id="fazemos" className="text-3xl md:text-4xl mb-6">O que fazemos</h2>
          {/* Estilo diferente do "Como funciona": cartões verticais com ícone em degradê, lado a lado a partir do tablet. */}
          <ul className="grid gap-4 sm:grid-cols-3">
            {FAZEMOS.map((f, i) => (
              <li key={f.t}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="cb-panel h-full rounded-3xl p-6">
                    <span className="cb-gradient-bg mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg shadow-[#8a2be2]/25" aria-hidden>
                      <Icon d={f.icon} />
                    </span>
                    <p className="text-lg leading-snug">
                      <strong className="font-semibold text-[var(--cb-fg)]">{f.t}:</strong>{" "}
                      <span className="text-[var(--cb-muted)]">{f.d}</span>
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* Depoimentos (só o carrossel, sem o vídeo), antes do fecho */}
      <Testimonials withVideo={false} />

      <div className="max-w-2xl mx-auto px-6 md:px-10">
        {/* Fecho */}
        <Reveal>
          <section className="mt-20 rounded-3xl border border-[var(--cb-border-strong)] bg-[var(--cb-panel)] px-6 py-12 text-center md:px-10">
            <h2 className="text-4xl md:text-5xl">Vamos conversar?</h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-[var(--cb-muted)] leading-relaxed">
              {quem} já trabalha com a gente. Conte o que você faz e veja como podemos ajudar.
            </p>
            <div className="mt-8 flex justify-center">{botao("Chamar no WhatsApp")}</div>
          </section>
        </Reveal>

        <p className="mt-12 text-center text-sm text-[var(--cb-muted)]">Acelerando o seu sonho americano. · cliqueboost.io</p>
      </div>
    </div>
  );
}
