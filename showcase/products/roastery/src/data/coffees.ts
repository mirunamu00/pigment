import type { PhotoName } from './photos';

export type RoastLevel = 1 | 2 | 3 | 4 | 5;
export type RoastGroup = 'light' | 'medium' | 'dark';

export interface Coffee {
  slug: string;
  name: string;
  country: string;
  region: string;
  producer: string;
  altitude: string;
  variety: string;
  process: string;
  harvest: string;
  notes: [string, string, string];
  roast: RoastLevel;
  price: number; // 250 g
  priceKg: number; // 1 kg
  photo: PhotoName;
  gallery: PhotoName[];
  tag?: string;
  thisMonth?: boolean;
  short: string;
  story: string[];
  order: number;
}

export const ROAST_LABELS: Record<RoastLevel, string> = {
  1: 'Light',
  2: 'Light–medium',
  3: 'Medium',
  4: 'Medium–dark',
  5: 'Dark',
};

export function roastGroup(level: RoastLevel): RoastGroup {
  if (level <= 2) return 'light';
  if (level === 3) return 'medium';
  return 'dark';
}

export const coffees: Coffee[] = [
  {
    slug: 'kochere-washed',
    name: 'Kochere Washed',
    country: 'Ethiopia',
    region: 'Kochere, Gedeo Zone',
    producer: '412 smallholders delivering to the Haru Ridge washing station',
    altitude: '1,950–2,140 m',
    variety: 'Kurume and Wolisho landraces',
    process: 'Washed, 36 hours dry fermentation, dried 11 days on raised beds',
    harvest: 'December 2025 – January 2026',
    notes: ['Bergamot', 'White peach', 'Jasmine'],
    roast: 1,
    price: 11.5,
    priceKg: 39.8,
    photo: 'beans-medium',
    gallery: ['beans-medium', 'farm-cherries', 'farm-drying', 'brew-pourover'],
    tag: 'Back for its third year',
    thisMonth: true,
    short: 'Floral and tea-like, with a long stone-fruit finish.',
    story: [
      'Haru Ridge sits on a steep shoulder of hillside above the town of Kochere. Cherries arrive by donkey and on foot from 412 family plots, most of them under two hectares, and are sorted by hand before pulping the same evening.',
      'We have bought from the station for three harvests now. This lot is the cleanest yet — a cup that smells of Earl Grey when you grind it and tastes like a ripe white peach as it cools.',
    ],
    order: 1,
  },
  {
    slug: 'hambela-natural',
    name: 'Hambela Natural',
    country: 'Ethiopia',
    region: 'Hambela Wamena, Guji',
    producer: 'Dimtu Tero processing site, run by the Abebe family',
    altitude: '2,050–2,280 m',
    variety: 'Ethiopian landraces (74158)',
    process: 'Natural, dried whole for 21 days',
    harvest: 'January 2026',
    notes: ['Blueberry', 'Dark chocolate', 'Rose'],
    roast: 2,
    price: 12.25,
    priceKg: 42.6,
    photo: 'farm-drying',
    gallery: ['farm-drying', 'beans-scoop', 'brew-chemex'],
    thisMonth: true,
    short: 'Jammy and sweet, a natural that still tastes clean.',
    story: [
      'Whole cherries are laid out on mesh beds and turned every hour through the hottest part of the day. Slow drying at this altitude keeps the fruit from tipping over into ferment.',
      'Brew it as a filter for blueberry jam and cocoa, or as an espresso for something closer to a chocolate-covered raisin.',
    ],
    order: 2,
  },
  {
    slug: 'el-cerro-pink-bourbon',
    name: 'El Cerro Pink Bourbon',
    country: 'Colombia',
    region: 'Pitalito, Huila',
    producer: 'Aurelio Patiño, Finca El Cerro',
    altitude: '1,780 m',
    variety: 'Pink Bourbon',
    process: 'Washed, 48 hours cherry rest before pulping',
    harvest: 'May 2026',
    notes: ['Red grape', 'Panela', 'Hibiscus'],
    roast: 1,
    price: 13.4,
    priceKg: 46.2,
    photo: 'sack-colombia',
    gallery: ['sack-colombia', 'farm-shrub', 'brew-pourover'],
    tag: 'Limited — 38 kg',
    thisMonth: true,
    short: 'Bright and juicy, with a raw-sugar sweetness.',
    story: [
      'Aurelio farms 4.6 hectares on the slopes above Pitalito and keeps his Pink Bourbon separate from the rest of the farm. He rests the picked cherries for two days before pulping, which builds sweetness and a grape-like acidity.',
      'There are only 38 kg of this lot. When it is gone, it is gone until next May.',
    ],
    order: 3,
  },
  {
    slug: 'gititu-aa',
    name: 'Gititu AA',
    country: 'Kenya',
    region: 'Kiambu County',
    producer: 'Gititu factory, Ngenyi Farmers’ Co-operative Society',
    altitude: '1,720–1,860 m',
    variety: 'SL28, SL34 and Ruiru 11',
    process: 'Washed, double fermented, soaked 14 hours',
    harvest: 'November 2025 – January 2026',
    notes: ['Blackcurrant', 'Pink grapefruit', 'Tomato vine'],
    roast: 2,
    price: 13.9,
    priceKg: 48.4,
    photo: 'beans-plate',
    gallery: ['beans-plate', 'farm-cherries', 'brew-drip'],
    short: 'Savoury, structured and full of blackcurrant.',
    story: [
      'Gititu takes cherry from around 900 members. The AA screen size is the largest grade, and this lot scored the highest of the eleven Kenyan samples we cupped this spring.',
      'Expect a big, mouth-watering cup. It softens into sweet citrus as it cools, so leave it a minute.',
    ],
    order: 4,
  },
  {
    slug: 'gisuma-hill',
    name: 'Gisuma Hill',
    country: 'Rwanda',
    region: 'Nyamasheke, Western Province',
    producer: 'Gisuma Hill washing station, 1,286 contributing farmers',
    altitude: '1,800–1,950 m',
    variety: 'Red Bourbon',
    process: 'Washed, dried 18 days on raised beds',
    harvest: 'April – June 2026',
    notes: ['Cranberry', 'Black tea', 'Wildflower honey'],
    roast: 2,
    price: 12.1,
    priceKg: 41.9,
    photo: 'sacks-origin',
    gallery: ['sacks-origin', 'farm-drying', 'brew-chemex'],
    tag: 'New harvest',
    thisMonth: true,
    short: 'Tart, honeyed and gentle — an easy everyday filter.',
    story: [
      'The station sits a short walk from the shore of Lake Kivu. Every lot is floated and hand-sorted twice before drying, which is why Rwandan coffees like this one taste so clear.',
      'A balanced, tea-like cup that suits a batch brewer as well as a V60.',
    ],
    order: 5,
  },
  {
    slug: 'santa-elena',
    name: 'Finca Santa Elena',
    country: 'Guatemala',
    region: 'La Libertad, Huehuetenango',
    producer: 'The Morales family',
    altitude: '1,650 m',
    variety: 'Caturra and Bourbon',
    process: 'Washed, sun-dried on patios',
    harvest: 'February – March 2026',
    notes: ['Brown sugar', 'Baked apple', 'Almond'],
    roast: 3,
    price: 11.2,
    priceKg: 38.6,
    photo: 'beans-sack-open',
    gallery: ['beans-sack-open', 'farm-shrub', 'brew-drip'],
    short: 'Round and comforting, like apple crumble.',
    story: [
      'Three generations of the Morales family work the farm together. Warm winds from the Mexican lowlands keep frost off the slopes and let the cherries ripen slowly.',
      'A crowd-pleaser in milk or black, and the backbone of our house blend.',
    ],
    order: 6,
  },
  {
    slug: 'boa-vista-cerrado',
    name: 'Boa Vista',
    country: 'Brazil',
    region: 'Patrocínio, Cerrado Mineiro',
    producer: 'Fazenda Boa Vista, Lucas and Helena Ferraz',
    altitude: '1,150 m',
    variety: 'Yellow Catuaí',
    process: 'Pulped natural',
    harvest: 'June – August 2026',
    notes: ['Hazelnut', 'Cocoa', 'Caramel'],
    roast: 4,
    price: 9.8,
    priceKg: 33.4,
    photo: 'beans-dark',
    gallery: ['beans-dark', 'sacks-origin', 'grinder'],
    short: 'Low acidity, nutty and smooth. Built for milk.',
    story: [
      'Lucas and Helena took over the farm from Helena’s father in 2017 and have since replanted half of it with Yellow Catuaí. Pulped natural processing leaves some of the fruit on the bean while it dries, adding body.',
      'Our most-ordered coffee for espresso machines at home.',
    ],
    order: 7,
  },
  {
    slug: 'furnace-house-blend',
    name: 'Furnace House Blend',
    country: 'Blend',
    region: 'Brazil 60% · Guatemala 40%',
    producer: 'Fazenda Boa Vista and Finca Santa Elena',
    altitude: '1,150–1,650 m',
    variety: 'Yellow Catuaí, Caturra, Bourbon',
    process: 'Pulped natural and washed',
    harvest: '2026 crop',
    notes: ['Dark chocolate', 'Toasted pecan', 'Molasses'],
    roast: 4,
    price: 9.4,
    priceKg: 31.8,
    photo: 'roaster-drum',
    gallery: ['roaster-drum', 'beans-dark', 'cafe-counter'],
    tag: 'Our bestseller',
    thisMonth: true,
    short: 'The one we pour at the bar every day.',
    story: [
      'Furnace is the coffee we built the roastery on: two farms we have bought from since 2019, roasted separately and blended after cooling.',
      'Rich enough for a flat white, forgiving in a cafetière, and the same recipe every week of the year.',
    ],
    order: 8,
  },
  {
    slug: 'gayo-wet-hulled',
    name: 'Gayo Highlands',
    country: 'Indonesia',
    region: 'Takengon, Aceh, Sumatra',
    producer: 'Ketiara women’s co-operative',
    altitude: '1,450–1,600 m',
    variety: 'Ateng, Tim Tim and Typica',
    process: 'Wet-hulled (giling basah)',
    harvest: 'October 2025 – March 2026',
    notes: ['Cedar', 'Dark cocoa', 'Pipe tobacco'],
    roast: 5,
    price: 10.6,
    priceKg: 36.2,
    photo: 'grinder',
    gallery: ['grinder', 'beans-plate', 'sacks-origin'],
    short: 'Heavy, earthy and syrupy. For stovetop pots and long blacks.',
    story: [
      'Wet-hulling strips the parchment while the bean is still damp, which gives Sumatran coffees their deep, woody character.',
      'Ketiara is led by women who own and run their farms, and pays a premium above the local market for every kilo of cherry.',
    ],
    order: 9,
  },
  {
    slug: 'las-nubes-decaf',
    name: 'Las Nubes Decaf',
    country: 'Colombia',
    region: 'Manizales, Caldas',
    producer: 'Las Nubes growers’ association',
    altitude: '1,600–1,900 m',
    variety: 'Castillo and Caturra',
    process: 'Washed, decaffeinated with sugarcane ethyl acetate',
    harvest: 'October 2025',
    notes: ['Milk chocolate', 'Orange zest', 'Toffee'],
    roast: 3,
    price: 10.75,
    priceKg: 36.9,
    photo: 'beans-scoop',
    gallery: ['beans-scoop', 'sack-colombia', 'brew-chemex'],
    short: 'A decaf we drink after dinner and don’t miss a thing.',
    story: [
      'Sugarcane decaffeination happens in Colombia, near where the coffee is grown, using a solvent made from fermented cane. It keeps the sweetness that other methods can strip away.',
      '99.9% caffeine free and still tastes like coffee.',
    ],
    order: 10,
  },
];

export function findCoffee(slug: string | undefined): Coffee | undefined {
  return coffees.find((c) => c.slug === slug);
}

export const ORIGINS = ['Ethiopia', 'Colombia', 'Kenya', 'Rwanda', 'Guatemala', 'Brazil', 'Indonesia', 'Blend'] as const;

export function formatGBP(n: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);
}

/** Fixed so that captures are stable from run to run. */
export const ROAST_CALENDAR = {
  last: 'Thursday 22 October',
  next: 'Monday 26 October',
  dispatch: 'Orders before 11am ship on roast day',
};
