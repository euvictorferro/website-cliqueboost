import Image from "next/image";
import { Reveal } from "./Reveal";
import { DEFAULT_CAPTION } from "@/content/dashScreens";
import type { MobileScreen } from "@/content/dashMobile";

const COPY = {
  soon: {
    title: "O Dash também vai para o seu celular",
    text: "Estamos finalizando o app do Clique Boost Dash para iPhone, com o mesmo painel na palma da mão. Enquanto ele não chega, o painel já abre no navegador do celular.",
    call: "App para iPhone a caminho.",
  },
  live: {
    title: "O Dash no seu celular",
    text: "O app do Clique Boost Dash já está na App Store. Acompanhe o seu trabalho de onde estiver.",
    call: "Disponível na App Store.",
  },
};

/** O aparelho já vem desenhado na própria imagem (fundo transparente): aqui só entra a sombra. */
function Phone({ screen, className = "" }: { screen: MobileScreen; className?: string }) {
  const cls = `w-[112px] min-[420px]:w-[140px] sm:w-[200px] h-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] [:root[data-theme=light]_&]:drop-shadow-[0_24px_36px_rgba(0,0,0,0.22)] ${className}`;
  return (
    <>
      <Image src={screen.src} alt={screen.alt} width={720} height={1561} sizes="220px" className={`cb-on-dark ${cls}`} />
      {screen.light && <Image src={screen.light} alt={screen.alt} width={720} height={1561} sizes="220px" className={`cb-on-light ${cls}`} />}
    </>
  );
}

/**
 * Seção do app no celular, abaixo do painel. Sem selo e sem "disponível" enquanto `live` for false.
 * O selo oficial da Apple (public/brand/app-store-badge.png) e o link só entram com live + href.
 */
export function DashMobileSection({
  screens,
  live = false,
  appStoreHref,
}: {
  screens: MobileScreen[];
  live?: boolean;
  appStoreHref?: string;
}) {
  const c = live ? COPY.live : COPY.soon;
  const shown = screens.slice(0, 3);
  // Celular do meio na frente e um pouco mais alto; os outros recuam para os lados.
  const offsets = shown.length === 3 ? ["translate-y-6 -rotate-3 md:translate-y-10", "-translate-y-1 z-10 md:-translate-y-2", "translate-y-6 rotate-3 md:translate-y-10"] : [];

  return (
    <section className="py-28 px-6 md:px-10 border-t border-[var(--cb-border)]">
      <div className={`max-w-6xl mx-auto grid gap-14 items-center ${shown.length ? "md:grid-cols-[1fr_1.2fr]" : ""}`}>
        <Reveal className={shown.length ? "" : "max-w-3xl"}>
          <h2 style={{ fontSize: "clamp(2rem, 3.6vw, 3.5rem)" }} className="mb-6">
            {c.title}
          </h2>
          <p className="text-[var(--cb-muted)] text-lg leading-relaxed mb-8">{c.text}</p>
          {live && appStoreHref ? (
            <a href={appStoreHref} target="_blank" rel="noopener" className="inline-flex">
              <Image src="/brand/app-store-badge.png" alt="Baixar na App Store" width={135} height={40} className="h-11 w-auto" />
            </a>
          ) : (
            <p className="cb-chip inline-flex items-center gap-3 rounded-full px-5 min-h-11 text-sm font-medium">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
                <path d="M11 18.5h2" />
              </svg>
              {c.call}
            </p>
          )}
        </Reveal>

        {shown.length > 0 && (
          <div className="order-first md:order-none">
            <div className="flex justify-center items-center -space-x-7 sm:-space-x-6">
              {shown.map((sc, k) => (
                <Reveal key={sc.key} y={60} delay={k * 0.12}>
                  <Phone screen={sc} className={offsets[k] ?? ""} />
                </Reveal>
              ))}
            </div>
            <p className="mt-12 md:mt-16 text-sm text-[var(--cb-muted)] text-center">{DEFAULT_CAPTION}</p>
          </div>
        )}
      </div>
    </section>
  );
}
