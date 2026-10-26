import list from '../../photos.json';

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
}

const byName = new Map<string, Photo>(
  list.map((p) => [
    p.file.replace('/photos/', '').replace('.jpg', ''),
    { src: p.file, alt: p.alt, width: p.width, height: p.height, credit: p.credit },
  ]),
);

export function photo(name: string): Photo {
  const p = byName.get(name);
  if (!p) throw new Error(`Unknown photo: ${name}`);
  return p;
}

/** The credit line printed under a caption. */
export function creditLine(p: Photo): string {
  return p.credit === 'unknown' ? 'Photograph: public domain (CC0)' : `Photograph: ${p.credit} (CC0)`;
}
