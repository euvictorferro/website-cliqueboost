"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "victor-clique-boost-jelawr/30min";
const CAL_URL = `https://cal.com/${CAL_LINK}`;
const NAMESPACE = "30min";

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

/**
 * Botão "Agendar": abre o calendário do Cal.com num pop-up sobre a própria página, sem o visitante sair do site.
 * Se o script do Cal.com não carregar (bloqueador, rede), cai para abrir a página do Cal.com em outra aba.
 */
export function ScheduleButton({ className, children }: { className?: string; children: ReactNode }) {
  const cal = useRef<CalApi | null>(null);

  useEffect(() => {
    let alive = true;
    getCalApi({ namespace: NAMESPACE })
      .then((api) => {
        if (!alive) return;
        api("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
        cal.current = api;
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const open = () => {
    const api = cal.current;
    if (!api) {
      window.open(CAL_URL, "_blank", "noopener");
      return;
    }
    api("modal", { calLink: CAL_LINK, config: { layout: "month_view", theme: "dark" } });
  };

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
