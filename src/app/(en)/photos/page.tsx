import type { Metadata } from "next";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PhotoLeadForm } from "@/components/PhotoLeadForm";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HeroParticleLogo } from "@/components/HeroParticleLogo";
import { HeroTitle } from "@/components/HeroTitle";
import { Reveal } from "@/components/Reveal";
import { PHOTO_PROJECTS } from "@/content/photo-projects";

const DESCRIPTION =
  "Retouched photos for short-term rentals: brighter light, true colors and clean walls, delivered in 12 hours. Get a free sample today.";

export const metadata: Metadata = {
  title: "Retouched photos for short-term rentals | Clique Boost",
  description: DESCRIPTION,
  alternates: { canonical: "/photos" },
  openGraph: { title: "Retouched photos for short-term rentals | Clique Boost", description: DESCRIPTION },
};

const CHANGE = ["Light", "Color", "Sharpness", "Tilted horizons", "Small dirt"];
const NEVER = ["Furniture and layout", "Room sizes", "Real defects", "The view"];

const STEPS = [
  { title: "Send the listing link", description: "Share the link of your listing. That is all we need to start." },
  { title: "Get the photos in 12 hours", description: "We retouch the photos and send them back, before and after." },
  { title: "Approve and pay only if you like it", description: "If the result works for you, you pay. If not, you owe nothing." },
];

const Check = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const Lock = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 018 0v3" />
  </svg>
);

export default function PhotosPage() {
  return (
    <>
      {/* Mesmo hero da home: título em linhas que sobem, texto à esquerda e o objeto em partículas à direita. */}
      <section className="relative cb-noise overflow-hidden">
        <HeroBackdrop />
        <div className="relative">
          <div className="min-h-[88svh] flex flex-col justify-center px-6 md:px-10 pt-28 pb-16">
            <div className="relative w-full max-w-6xl mx-auto">
              <HeroParticleLogo className="absolute right-0 top-1/2 -translate-y-1/2 h-[min(80vh,620px)] w-full md:w-[52%] opacity-15 md:opacity-100" />
              <Reveal className="relative max-w-3xl pointer-events-none">
                <HeroTitle lines={["Better listing photos.", "Same property."]} accentFrom={1} />
                <p className="text-xl md:text-2xl text-[var(--cb-fg)] max-w-xl mb-12">
                  Retouched photos for short-term rentals, delivered in 12 hours.
                </p>
                <a
                  href="#sample"
                  className="pointer-events-auto cb-neon cb-press inline-flex font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
                >
                  Get a free sample
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 bg-[var(--cb-panel)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl mb-12">Before and after</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {PHOTO_PROJECTS.map((p) => (
              <BeforeAfterSlider key={p.room} project={p} />
            ))}
          </div>
          <p className="mt-12 text-sm text-[var(--cb-muted)]">
            Sample projects. Photos shown are examples of our retouching and are credited to their owners. Photos of client
            properties appear only with written permission.
          </p>
          <p className="mt-2 text-sm text-[var(--cb-muted)]">
            Photos: 10275 Park Estates Ave, Orlando, shared with the owner&apos;s permission.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-28">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl max-w-3xl mb-14">
              <span className="block text-[var(--cb-muted)]">What we change,</span>
              <span className="block">and what we never do</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-[1.15fr_1fr]">
            <Reveal className="h-full">
              <div className="cb-panel h-full rounded-[20px] p-7 md:p-9">
                <span className="cb-gradient-bg mb-6 block h-1 w-12 rounded-full" aria-hidden />
                <h3 className="text-2xl md:text-3xl mb-6">We change</h3>
                <ul className="flex flex-wrap gap-3">
                  {CHANGE.map((c) => (
                    <li key={c} className="cb-chip inline-flex items-center gap-2 rounded-full px-4 min-h-11 text-base">
                      <span className="text-[var(--cb-green)]"><Check /></span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.12} className="h-full">
              <div className="cb-panel h-full rounded-[20px] p-7 md:p-9">
                <span className="mb-6 block h-1 w-12 rounded-full bg-[var(--cb-muted)]/50" aria-hidden />
                <h3 className="text-2xl md:text-3xl mb-6">We never change</h3>
                <ul className="flex flex-wrap gap-3">
                  {NEVER.map((n) => (
                    <li key={n} className="cb-chip inline-flex items-center gap-2 rounded-full px-4 min-h-11 text-base text-[var(--cb-muted)]">
                      <Lock />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="font-display text-3xl sm:text-4xl md:text-5xl mt-14 md:mt-20">
              The property itself is never changed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 border-t border-[var(--cb-border)]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl mb-12">How it works</h2>
          </Reveal>
          <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.1} className="flex gap-4">
                  <span className="font-display text-4xl text-[var(--cb-muted)] leading-none">{i + 1}</span>
                  <div>
                    <h3 className="text-xl mb-2">{s.title}</h3>
                    <p className="text-[var(--cb-muted)]">{s.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 bg-[var(--cb-panel)]">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-5xl mb-6">Prices</h2>
            <p className="text-lg mb-2">$49 per listing, up to 25 photos.</p>
            <p className="text-lg mb-6">$199 for 5 listings.</p>
            <p className="text-[var(--cb-muted)]">Free sample first: 5 photos of one listing.</p>
          </div>
          <div id="sample" className="scroll-mt-28">
            <h2 className="text-3xl md:text-5xl mb-6">Get your free sample</h2>
            <PhotoLeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
