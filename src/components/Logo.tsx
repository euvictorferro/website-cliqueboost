import Image from "next/image";

export function Logo({ size = 28 }: { size?: number }) {
  const width = size * (500 / 210);
  const props = { width, height: size, priority: true, style: { height: size, width: "auto" } } as const;
  return (
    <>
      <Image src="/brand/logo-light.png" alt="Clique Boost" className="cb-logo-on-dark" {...props} />
      <Image src="/brand/logo-dark.png" alt="" aria-hidden className="cb-logo-on-light" {...props} />
    </>
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
