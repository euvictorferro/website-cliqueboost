"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function ServiceCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
      className="h-full"
    >
      <Link href={href} className="cb-panel group block p-8 h-full">
        <h3 className="text-xl mb-3 group-hover:cb-gradient-text transition-colors">{title}</h3>
        <p className="text-[var(--cb-muted)] leading-relaxed">{description}</p>
      </Link>
    </motion.div>
  );
}
