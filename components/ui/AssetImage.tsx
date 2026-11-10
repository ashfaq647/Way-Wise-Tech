import Image from "next/image";

type AssetImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Fills its positioned parent. */
export function AssetImage({ src, alt, sizes, className = "", priority = false }: AssetImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
