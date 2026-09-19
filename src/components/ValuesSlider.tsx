"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

const VALUES = [
  { title: "Inovação na Prática", description: "Tecnologia e IA aplicadas a processos reais, não a slides de apresentação." },
  { title: "Transparência Radical", description: "Custos, prazos e resultados sempre visíveis — sem letra miúda." },
  { title: "Parceria Genuína", description: "Enxergamos o seu negócio inteiro, não só a tarefa do mês." },
  { title: "Agilidade e Proatividade", description: "A gente resolve antes de você precisar pedir." },
  { title: "Overdelivery como Padrão", description: "Entregar exatamente o combinado é o mínimo — a régua é mais alta." },
];

export function ValuesSlider() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="text-4xl md:text-6xl">O que não muda, negócio nenhum</h2>
        </Reveal>
      </div>
      <div ref={constraintsRef} className="px-6 md:px-10">
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.12}
          dragTransition={{ power: 0.3, timeConstant: 200 }}
          className="flex gap-6 cursor-grab active:cursor-grabbing w-fit"
        >
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="cb-panel bg-[var(--cb-panel-raised)] w-72 shrink-0 p-8 select-none"
            >
              <div className="cb-gradient-bg w-14 h-14 rounded-full mb-6" aria-hidden />
              <h3 className="text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-[var(--cb-muted)] leading-relaxed">{v.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
