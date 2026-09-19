import Image from "next/image";

export function Logo({ size = 28 }: { size?: number }) {
  const width = size * (500 / 210);
  return (
    <Image
      src="/brand/logo-light.png"
      alt="Clique Boost"
      width={width}
      height={size}
      priority
      style={{ height: size, width: "auto" }}
    />
  );
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden" }}>
      <Image
        src="/brand/favicon.png"
        alt=""
        aria-hidden
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
