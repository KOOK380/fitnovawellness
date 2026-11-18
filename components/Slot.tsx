import Image from 'next/image';

// Static replacement for the design's <image-slot> element (same frame, crop and radius).
export function Slot({ src, alt, radius, circle, placeholder, sizes, priority, position }: {
  src?: string; alt?: string; radius?: number; circle?: boolean; placeholder?: string;
  sizes?: string; priority?: boolean; position?: string;
}) {
  return (
    <div className="slot" style={{ borderRadius: circle ? '50%' : radius }}>
      {src
        ? <Image src={src} unoptimized={/^https?:/.test(src)} alt={alt || ''} quality={90} fill sizes={sizes || '50vw'} priority={priority} style={position ? { objectPosition: position } : undefined} />
        : <div className="slot-empty"><span>{placeholder}</span></div>}
    </div>
  );
}
