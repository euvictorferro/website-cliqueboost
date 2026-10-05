"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

const VALUES = [
  { title: "Responder tudo na mão", description: "A IA responde e qualifica o contato. Você entra quando ele está pronto." },
  { title: "Juntar fornecedores", description: "Anúncio, conteúdo, site e atendimento com um time só." },
  { title: "Montar relatório", description: "Você acompanha pelo Dash: métricas do Instagram, conteúdo, tarefas e calendário." },
  { title: "Correr atrás de prazo", description: "Prazos combinados e retorno rápido dentro do horário comercial." },
  { title: "Aprender tecnologia", description: "A gente cuida da IA e das ferramentas. Você cuida do seu negócio." },
];

export function ValuesSlider() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-28 overflow-hidden bg-[var(--cb-panel)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="text-4xl md:text-6xl">O que você deixa de carregar</h2>
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
