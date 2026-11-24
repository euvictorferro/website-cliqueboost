import Image from "next/image";
import type { PhotoProject } from "@/content/photo-projects";

/**
 * Par antes/depois lado a lado (no celular, uma foto sobre a outra), com rótulos Before e After.
 * Não usa slider: o "depois" tem enquadramento um pouco diferente do "antes", e o slider pularia ao arrastar.
 * Fotos carregam direto do WebP (eager + unoptimized), já são leves.
 */
export function BeforeAfterPair({ project }: { project: PhotoProject }) {
  const caption = `${project.room}: ${project.adjust}.`;
  const shots = [
    { label: "Before", src: project.before, alt: `${project.alt}, before retouching` },
    { label: "After", src: project.after, alt: `${project.alt}, after retouching` },
  ];
  return (
    <figure>
      <div className="grid gap-3 md:grid-cols-2">
        {shots.map((s) => (
          <div key={s.label} className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[var(--cb-panel-raised)]">
            <Image src={s.src} alt={s.alt} fill loading="eager" unoptimized sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-[var(--cb-muted)]">{caption}</figcaption>
    </figure>
  );
}
