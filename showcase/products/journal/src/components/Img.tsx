import { photo as getPhoto } from '../data/photos';

interface Props {
  name: string;
  className?: string;
  sizes?: string;
}

/** Every image on the site comes from photos.json; never lazy-loaded so full-page captures are complete. */
export function Img({ name, className }: Props) {
  const p = getPhoto(name);
  return <img src={p.src} alt={p.alt} width={p.width} height={p.height} className={className} loading="eager" decoding="sync" />;
}
