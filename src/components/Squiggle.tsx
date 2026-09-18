export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="140"
      height="60"
      viewBox="0 0 140 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 50C20 10 35 10 50 30C65 50 80 50 95 25C105 8 115 8 125 20C130 26 133 30 138 30"
        stroke="url(#squiggleGradient)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="squiggleGradient" x1="0" y1="0" x2="140" y2="0">
          <stop offset="0" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
