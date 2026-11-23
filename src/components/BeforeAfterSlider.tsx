"use client";

import Image from "next/image";
import { useState } from "react";
import type { PhotoProject } from "@/content/photo-projects";

/** Comparação antes/depois com controle de arrastar (input range). Proporção fixa para o layout não pular. */
export function BeforeAfterSlider({ project, large = false }: { project: PhotoProject; large?: boolean }) {
  const [pos, setPos] = useState(50);
  const caption = `${project.room}: ${project.adjust}.`;

  if (!project.before || !project.after) {
    return (
      <figure className={large ? "md:col-span-2" : ""}>
        <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-dashed border-[var(--cb-border-strong)] text-sm text-[var(--cb-muted)]">
          Sample pair coming soon
        </div>
        <figcaption className="mt-3 text-sm text-[var(--cb-muted)]">{caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={large ? "md:col-span-2" : ""}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
        <Image src={project.after} alt={`${project.alt}, after`} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={project.before} alt={`${project.alt}, before`} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Before</span>
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">After</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }} aria-hidden />
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare before and after: ${project.room}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm text-[var(--cb-muted)]">{caption}</figcaption>
      {project.credit && <p className="mt-1 text-xs text-[var(--cb-muted)]/80">Photo: {project.credit}</p>}
    </figure>
  );
}
