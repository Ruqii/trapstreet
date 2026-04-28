import Image from "next/image";

export function Manta({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/manta-ray-v2.png"
      alt="Trap Street manta"
      width={size}
      height={Math.round(size * 0.62)}
      className={`pixel ${className}`}
      priority
    />
  );
}
