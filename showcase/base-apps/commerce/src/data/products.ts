export type CategoryId = 'bags' | 'apparel' | 'kitchen' | 'accessories';

export interface Category {
  id: CategoryId;
  label: string;
}

export type Tone = 'sand' | 'olive' | 'slate' | 'clay' | 'stone';

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  /** Price in whole US dollars. */
  price: number;
  inStock: boolean;
  summary: string;
  description: string;
  details: string[];
  /** Label for the variant selector, e.g. "Color" or "Size". */
  variantLabel: string;
  variants: string[];
  /** Picks the colour of the image placeholder box. */
  tone: Tone;
}

export const categories: Category[] = [
  { id: 'bags', label: 'Bags' },
  { id: 'apparel', label: 'Apparel' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'accessories', label: 'Accessories' },
];

export const products: Product[] = [
  {
    slug: 'canvas-field-tote',
    name: 'Canvas Field Tote',
    category: 'bags',
    price: 48,
    inStock: true,
    summary: 'A roomy everyday tote in heavy cotton canvas.',
    description:
      'Cut from 18 oz cotton canvas with reinforced handles and an inside zip pocket. Big enough for groceries, a laptop or a day at the market.',
    details: ['18 oz cotton canvas', 'Interior zip pocket', '40 × 35 × 15 cm'],
    variantLabel: 'Color',
    variants: ['Natural', 'Olive', 'Charcoal'],
    tone: 'sand',
  },
  {
    slug: 'waxed-day-pack',
    name: 'Waxed Day Pack',
    category: 'bags',
    price: 96,
    inStock: true,
    summary: 'Water-resistant backpack for commutes and short hikes.',
    description:
      'Waxed canvas body, padded laptop sleeve and adjustable straps. The finish softens and develops character with use.',
    details: ['Waxed cotton canvas', 'Fits a 15 inch laptop', '22 litre capacity'],
    variantLabel: 'Color',
    variants: ['Tan', 'Black'],
    tone: 'clay',
  },
  {
    slug: 'weekender-duffel',
    name: 'Weekender Duffel',
    category: 'bags',
    price: 148,
    inStock: true,
    summary: 'A two-night bag with a separate shoe compartment.',
    description:
      'Structured duffel with a detachable shoulder strap, a zip shoe compartment at one end and brass hardware throughout.',
    details: ['Detachable shoulder strap', 'Shoe compartment', '45 litre capacity'],
    variantLabel: 'Color',
    variants: ['Navy', 'Brown'],
    tone: 'slate',
  },
  {
    slug: 'merino-crew-sweater',
    name: 'Merino Crew Sweater',
    category: 'apparel',
    price: 88,
    inStock: true,
    summary: 'A lightweight knit for layering in every season.',
    description:
      'Fine-gauge merino wool that breathes in spring and keeps you warm in winter. Machine washable on a cool wool cycle.',
    details: ['100% merino wool', 'Regular fit', 'Machine washable'],
    variantLabel: 'Size',
    variants: ['S', 'M', 'L', 'XL'],
    tone: 'olive',
  },
  {
    slug: 'heavyweight-pocket-tee',
    name: 'Heavyweight Pocket Tee',
    category: 'apparel',
    price: 32,
    inStock: true,
    summary: 'A boxy cotton t-shirt that holds its shape.',
    description: 'Dense 240 gsm cotton jersey with a chest pocket and a ribbed collar that stays flat after washing.',
    details: ['240 gsm cotton jersey', 'Relaxed fit', 'Pre-shrunk'],
    variantLabel: 'Size',
    variants: ['S', 'M', 'L', 'XL'],
    tone: 'stone',
  },
  {
    slug: 'cotton-chore-coat',
    name: 'Cotton Chore Coat',
    category: 'apparel',
    price: 135,
    inStock: true,
    summary: 'A workwear jacket with four front pockets.',
    description:
      'Durable cotton twill with corozo buttons, a corduroy collar and four patch pockets. Wear it open over a sweater or buttoned up.',
    details: ['Cotton twill', 'Corduroy collar', 'Four patch pockets'],
    variantLabel: 'Size',
    variants: ['S', 'M', 'L', 'XL'],
    tone: 'clay',
  },
  {
    slug: 'enamel-camp-mug',
    name: 'Enamel Camp Mug',
    category: 'kitchen',
    price: 18,
    inStock: true,
    summary: 'A sturdy steel mug for coffee at home or outdoors.',
    description: 'Enamel-coated steel with a rolled rim. Safe on a camp stove and in the dishwasher.',
    details: ['350 ml capacity', 'Enamel-coated steel', 'Dishwasher safe'],
    variantLabel: 'Color',
    variants: ['White', 'Blue'],
    tone: 'stone',
  },
  {
    slug: 'cast-iron-skillet',
    name: 'Cast Iron Skillet',
    category: 'kitchen',
    price: 64,
    inStock: true,
    summary: 'A pre-seasoned pan that works on every heat source.',
    description:
      'Smooth-milled cooking surface, pre-seasoned with vegetable oil and ready to use. Goes from stovetop to oven to campfire.',
    details: ['Pre-seasoned', 'Oven safe', 'Lifetime guarantee'],
    variantLabel: 'Size',
    variants: ['8 inch', '10 inch', '12 inch'],
    tone: 'slate',
  },
  {
    slug: 'linen-tea-towels',
    name: 'Linen Tea Towels',
    category: 'kitchen',
    price: 24,
    inStock: true,
    summary: 'A set of two absorbent, quick-drying towels.',
    description: 'Stonewashed linen that gets softer with every wash. Sold as a set of two with hanging loops.',
    details: ['100% linen', 'Set of two', '50 × 70 cm'],
    variantLabel: 'Color',
    variants: ['Oat', 'Rust', 'Stripe'],
    tone: 'sand',
  },
  {
    slug: 'leather-key-ring',
    name: 'Leather Key Ring',
    category: 'accessories',
    price: 16,
    inStock: false,
    summary: 'A simple loop of vegetable-tanned leather.',
    description: 'Vegetable-tanned leather with a solid brass split ring. Back in stock soon.',
    details: ['Vegetable-tanned leather', 'Solid brass ring'],
    variantLabel: 'Color',
    variants: ['Natural', 'Brown'],
    tone: 'clay',
  },
  {
    slug: 'ribbed-wool-beanie',
    name: 'Ribbed Wool Beanie',
    category: 'accessories',
    price: 28,
    inStock: false,
    summary: 'A warm, close-fitting hat with a deep cuff.',
    description: 'Knitted from a soft wool blend with a fold-over cuff. Back in stock soon.',
    details: ['Wool blend', 'One size fits most'],
    variantLabel: 'Color',
    variants: ['Grey', 'Olive'],
    tone: 'olive',
  },
];

export function findProduct(slug: string | undefined): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function categoryLabel(id: CategoryId): string {
  return categories.find((category) => category.id === id)?.label ?? id;
}

const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatPrice(amount: number): string {
  return currencyFormat.format(amount);
}

/** Flat-rate shipping, free above the threshold. */
export const SHIPPING_FLAT_RATE = 8;
export const FREE_SHIPPING_THRESHOLD = 100;

export function shippingFor(subtotal: number): number {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FLAT_RATE;
}

export const MAX_QUANTITY = 10;
