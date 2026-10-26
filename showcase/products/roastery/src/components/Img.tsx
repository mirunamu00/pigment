import { photo, type PhotoName } from '../data/photos';

export default function Img({ name, className }: { name: PhotoName; className?: string; eager?: boolean }) {
  const p = photo(name);
  return (
    <img
      src={p.src}
      alt={p.alt}
      width={p.width}
      height={p.height}
      className={className}
    />
  );
}
