"use client";

import { useSyncExternalStore } from "react";

const query = "(max-width: 767px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** true em tela pequena (celular). No servidor devolve false. */
export function useSmall() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
