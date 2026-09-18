export function Grain() {
  return (
    <svg className="cb-grain" aria-hidden>
      <filter id="cbGrainFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#cbGrainFilter)" />
    </svg>
  );
}
