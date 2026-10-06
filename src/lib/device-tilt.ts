/**
 * Inclinação do celular (esquerda/direita) como valor de -1 a 1, lida do giroscópio. Reto = 0.
 * No iPhone o navegador só libera o sensor depois de um toque do visitante (requestTilt); no Android é direto.
 * Compartilhado pelos objetos de partículas, que reagem a esse valor no lugar do mouse.
 */
export const tilt = { value: 0 };

const FULL_TILT_DEG = 35; // inclinação em que o efeito chega ao máximo
const DEAD_ZONE_DEG = 3; // abaixo disso conta como reto

let started = false;

function onOrientation(e: DeviceOrientationEvent) {
  const g = e.gamma; // -90 (esquerda) a 90 (direita), com o celular em pé
  if (g == null) return;
  tilt.value = Math.abs(g) < DEAD_ZONE_DEG ? 0 : Math.max(-1, Math.min(1, g / FULL_TILT_DEG));
}

export function startTilt() {
  if (started || typeof window === "undefined") return;
  started = true;
  window.addEventListener("deviceorientation", onOrientation);
}

type IosOrientation = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<"granted" | "denied"> };

/** true no iPhone, onde o sensor precisa de permissão dada com um toque. */
export function tiltNeedsPermission() {
  return typeof DeviceOrientationEvent !== "undefined" && typeof (DeviceOrientationEvent as IosOrientation).requestPermission === "function";
}

/** Chamar de dentro de um toque/clique. Devolve true se o sensor foi liberado. */
export async function requestTilt() {
  const ask = (DeviceOrientationEvent as IosOrientation).requestPermission;
  if (ask) {
    try {
      if ((await ask()) !== "granted") return false;
    } catch {
      return false;
    }
  }
  startTilt();
  return true;
}
