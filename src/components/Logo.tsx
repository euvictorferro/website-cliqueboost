export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="cbLogoGradient" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path
        d="M256 60 L360 235 H255 L214 168 L152 235 H30 Z"
        fill="url(#cbLogoGradient)"
      />
      <path
        d="M30 277 H152 L214 344 L255 277 H360 L280 400 L235 452 L190 400 Z"
        fill="url(#cbLogoGradient)"
      />
    </svg>
  );
}

export function Logo({ withWordmark = true, size = 28 }: { withWordmark?: boolean; size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      {withWordmark && (
        <span
          className="font-black tracking-tight leading-none uppercase"
          style={{ fontSize: size * 0.62 }}
        >
          Clique Boost
        </span>
      )}
    </div>
  );
}
