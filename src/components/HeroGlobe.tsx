"use client";

import ParticleObject from "@/components/canvasui/ParticleObject";
import { useSmall } from "@/lib/use-small";

/**
 * Globo de partículas apontando para os EUA (modelo em public/globe/usa-globe.glb: continentes, EUA em azul
 * e um marcador sobre a Flórida). Arrasta para girar; o cursor empurra as partículas. No celular fica mais leve
 * e sem captura de toque, para não atrapalhar a rolagem.
 */
export function HeroGlobe({ className = "" }: { className?: string }) {
  const small = useSmall();

  return (
    <div className={`${className} ${small ? "pointer-events-none" : ""}`}>
    <ParticleObject
      className="h-full w-full"
      src="/globe/usa-globe.glb"
      count={small ? 7000 : 16000}
      size={small ? 2 : 2.3}
      sizeVariance={0.5}
      radius={small ? 0 : 120}
      strength={1}
      swirl={0.8}
      spring={1}
      damping={0.35}
      drift={0.6}
      scale={3.3}
      cameraDistance={4.2}
      floatIntensity={1.2}
      rotationIntensity={0.8}
      floatSpeed={1.4}
      orbit={!small}
      zoom={false}
      autoRotate={false}
    />
    </div>
  );
}
