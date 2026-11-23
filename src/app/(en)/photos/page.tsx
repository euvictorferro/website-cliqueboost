import type { Metadata } from "next";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PhotoLeadForm } from "@/components/PhotoLeadForm";
import { PHOTO_PROJECTS } from "@/content/photo-projects";

const DESCRIPTION =
  "Retouched photos for short-term rentals: brighter light, true colors and clean walls, delivered in 48 hours. Get a free sample today.";

export const metadata: Metadata = {
  title: "Retouched photos for short-term rentals | Clique Boost",
  description: DESCRIPTION,
  alternates: { canonical: "/photos" },
  openGraph: { title: "Retouched photos for short-term rentals | Clique Boost", description: DESCRIPTION },
};

const STEPS = [
  { title: "Send the listing link", description: "Share the link of your listing. That is all we need to start." },
  { title: "Get the photos in 48 hours", description: "We retouch the photos and send them back, before and after." },
  { title: "Approve and pay only if you like it", description: "If the result works for you, you pay. If not, you owe nothing." },
];

export default function PhotosPage() {
  return (
    <>
      <section className="px-6 md:px-10 pt-32 md:pt-40 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl max-w-3xl">Better listing photos. Same property.</h1>
          <p className="mt-6 text-xl md:text-2xl text-[var(--cb-muted)] max-w-2xl">
            Retouched photos for short-term rentals, delivered in 48 hours.
          </p>
          <a href="#sample" className="cb-neon cb-press inline-flex mt-10 font-bold px-8 py-4 rounded-full">
            Get a free sample
          </a>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 bg-[var(--cb-panel)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl mb-12">Before and after</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {PHOTO_PROJECTS.map((p, i) => (
              <BeforeAfterSlider key={p.room} project={p} large={i === 0} />
            ))}
          </div>
          <p className="mt-12 text-sm text-[var(--cb-muted)]">
            Sample projects. Photos shown are examples of our retouching and are credited to their owners. Photos of client
            properties appear only with written permission.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-5xl mb-6">What we change, and what we never do</h2>
            <p className="text-lg text-[var(--cb-muted)] mb-6">We change: light, color, sharpness, a tilted horizon and small dirt.</p>
            <p className="text-lg text-[var(--cb-muted)]">
              We never change: furniture, room sizes, real defects or the view. The property itself is never changed.
            </p>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl mb-6">How it works</h2>
            <ol className="grid gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="font-display text-3xl text-[var(--cb-muted)]">{i + 1}</span>
                  <div>
                    <h3 className="text-xl mb-1">{s.title}</h3>
                    <p className="text-[var(--cb-muted)]">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 bg-[var(--cb-panel)]">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-5xl mb-6">Prices</h2>
            <p className="text-lg mb-2">$49 per listing, up to 25 photos.</p>
            <p className="text-lg mb-6">$199 for 5 listings.</p>
            <p className="text-[var(--cb-muted)]">Free sample first: 12 photos of one listing.</p>
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
