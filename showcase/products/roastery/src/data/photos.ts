import list from '../../photos.json';

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type PhotoName =
  | 'roaster-drum'
  | 'roaster-cooling'
  | 'roastery-machine'
  | 'beans-dark'
  | 'beans-medium'
  | 'beans-plate'
  | 'brew-pourover'
  | 'brew-chemex'
  | 'brew-drip'
  | 'sacks-origin'
  | 'sack-colombia'
  | 'beans-scoop'
  | 'beans-sack-open'
  | 'farm-cherries'
  | 'farm-shrub'
  | 'farm-drying'
  | 'cafe-counter'
  | 'grinder';

const byName = new Map<string, Photo>(
  list.map((p) => [p.file.replace('/photos/', '').replace('.jpg', ''), { src: p.file, alt: p.alt, width: p.width, height: p.height }]),
);

export function photo(name: PhotoName): Photo {
  const p = byName.get(name);
  if (!p) throw new Error(`Unknown photo ${name}`);
  return p;
}
