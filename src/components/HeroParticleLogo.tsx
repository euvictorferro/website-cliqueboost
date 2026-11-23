"use client";

import ParticleObject from "@/components/canvasui/ParticleObject";
import { useSmall } from "@/lib/use-small";

/**
 * Logo em partículas para o hero de /photos: mesmo efeito do globo da home (o cursor empurra as partículas, o objeto
 * flutua e balança), mas com o símbolo do Airbnb (public/photos/airbnb-logo.svg) no lugar do globo.
 * No celular fica mais leve e sem captura de toque, para não atrapalhar a rolagem.
 */
export function HeroParticleLogo({ className = "" }: { className?: string }) {
  const small = useSmall();

  return (
    <div className={`${className} ${small ? "pointer-events-none" : ""}`} aria-hidden>
      <ParticleObject
        className="h-full w-full"
        src="/photos/airbnb-logo.svg"
        count={small ? 6000 : 14000}
        size={small ? 2 : 2.3}
        sizeVariance={0.5}
        radius={small ? 0 : 120}
        strength={1}
        swirl={0.8}
        spring={1}
        damping={0.35}
        drift={0.6}
        scale={2.6}
        cameraDistance={4.2}
        floatIntensity={1.2}
        rotationIntensity={0.8}
        floatSpeed={1.4}
        orbit={!small}
        zoom={false}
        autoRotate={false}
        tilt={small}
      />
    </div>
  );
}
