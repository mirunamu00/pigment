import type { Aisle } from './recipes';

export const TODAY_LABEL = 'Monday 26 October';

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type Meal = 'lunch' | 'dinner';

export const DAYS: { id: Day; short: string; long: string; date: number }[] = [
  { id: 'mon', short: 'Mon', long: 'Monday', date: 26 },
  { id: 'tue', short: 'Tue', long: 'Tuesday', date: 27 },
  { id: 'wed', short: 'Wed', long: 'Wednesday', date: 28 },
  { id: 'thu', short: 'Thu', long: 'Thursday', date: 29 },
  { id: 'fri', short: 'Fri', long: 'Friday', date: 30 },
  { id: 'sat', short: 'Sat', long: 'Saturday', date: 31 },
  { id: 'sun', short: 'Sun', long: 'Sunday', date: 1 },
];
export const MEALS: { id: Meal; label: string }[] = [
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
];
export const TODAY: Day = 'mon';

export const dayLabel = (d: Day) => DAYS.find((x) => x.id === d)!.long;
export const slotLabel = (key: string) => {
  const [d, m] = key.split('-') as [Day, Meal];
  return `${dayLabel(d)} ${m}`;
};

export const INITIAL_PLAN: Record<string, string> = {
  'mon-lunch': 'roast-squash-ginger-soup',
  'mon-dinner': 'chickpea-spinach-curry',
  'tue-lunch': 'farfalle-tomato-rocket-salad',
  'tue-dinner': 'smoky-chicken-tacos',
  'wed-dinner': 'lemon-thyme-chicken-legs',
  'thu-lunch': 'roast-squash-ginger-soup',
  'thu-dinner': 'crispy-gnocchi-peas',
  'fri-dinner': 'friday-night-pizza',
  'sat-lunch': 'buttermilk-pancakes',
  'sat-dinner': 'prawn-coconut-broth',
  'sun-lunch': 'slow-roast-pork-shoulder',
};

export const INITIAL_SAVED = [
  'lemon-olive-tagliatelle',
  'batch-cook-ratatouille',
  'crispy-fish-tacos',
  'lemon-meringue-tart',
  'broccoli-chickpea-tahini-traybake',
  'chickpea-spinach-curry',
];

export interface ShoppingItem {
  id: string;
  name: string;
  qty: string;
  aisle: Aisle;
  checked: boolean;
  from?: string;
}

const item = (id: string, name: string, qty: string, aisle: Aisle, from?: string, checked = false): ShoppingItem => ({
  id, name, qty, aisle, from, checked,
});

export const INITIAL_SHOPPING: ShoppingItem[] = [
  item('baby-spinach', 'Baby spinach', '200 g', 'v', 'Chickpea & spinach curry'),
  item('butternut-squash', 'Butternut squash', '1 large', 'v', 'Roast squash & ginger soup', true),
  item('limes', 'Limes', '4', 'v', 'Smoky chicken tacos, Prawn broth'),
  item('avocado', 'Avocado', '1', 'v', 'Smoky chicken tacos'),
  item('pak-choi', 'Pak choi', '2', 'v', 'Prawn & greens coconut broth'),
  item('new-potatoes', 'New potatoes', '800 g', 'v', 'Lemon & thyme chicken legs'),
  item('cherry-tomatoes', 'Cherry tomatoes', '250 g', 'v', 'Farfalle salad'),
  item('chicken-thighs', 'Skinless chicken thighs', '600 g', 'm', 'Smoky chicken tacos'),
  item('chicken-legs', 'Chicken legs', '4', 'm', 'Lemon & thyme chicken legs'),
  item('king-prawns', 'Raw king prawns', '300 g', 'm', 'Prawn & greens coconut broth'),
  item('pork-shoulder', 'Boneless pork shoulder', '2 kg', 'm', 'Slow-roast pork shoulder'),
  item('buttermilk', 'Buttermilk', '284 ml', 'd', 'Buttermilk pancakes'),
  item('mozzarella', 'Mozzarella', '2 balls', 'd', 'Friday-night pizza'),
  item('gnocchi', 'Fresh gnocchi', '2 packs', 'd', 'Crispy gnocchi'),
  item('soured-cream', 'Soured cream', '100 g', 'd', 'Smoky chicken tacos', true),
  item('milk', 'Semi-skimmed milk', '2 pints', 'd', undefined, true),
  item('tortillas', 'Small flour tortillas', '8', 'b', 'Smoky chicken tacos'),
  item('sliced-loaf', 'Seeded sliced loaf', '1', 'b', undefined, true),
  item('rigatoni', 'Farfalle', '300 g', 'g', 'Farfalle salad'),
  item('bread-flour', 'Strong white bread flour', '500 g', 'g', 'Friday-night pizza'),
  item('coconut-milk', 'Coconut milk', '2 tins', 't', 'Curry, Prawn broth'),
  item('chickpeas', 'Chickpeas', '2 tins', 't', 'Chickpea & spinach curry', true),
  item('passata', 'Passata', '400 g', 't', 'Friday-night pizza'),
  item('frozen-peas', 'Frozen peas', '200 g', 'f', 'Crispy gnocchi', true),
];

export interface PantryItem {
  name: string;
  detail: string;
  urgency: 'today' | 'soon' | 'week';
  recipes: string[];
}

export const PANTRY: PantryItem[] = [
  { name: 'Baby spinach', detail: 'Use by tomorrow', urgency: 'today', recipes: ['chickpea-spinach-curry', 'prawn-coconut-broth'] },
  { name: 'Crème fraîche', detail: 'Opened 3 days ago', urgency: 'soon', recipes: ['lemon-olive-tagliatelle', 'crispy-gnocchi-peas'] },
  { name: 'Butternut squash', detail: '4 days left', urgency: 'week', recipes: ['roast-squash-ginger-soup', 'batch-cook-ratatouille'] },
];

export const STATS = {
  cookedThisMonth: 14,
  goal: 20,
  weeks: [
    { label: '28 Sep', value: 2 },
    { label: '5 Oct', value: 5 },
    { label: '12 Oct', value: 3 },
    { label: '19 Oct', value: 4 },
  ],
  savedOnFood: '£23',
};

export const USER = {
  name: 'Hannah Reid',
  first: 'Hannah',
  initials: 'HR',
  email: 'hannah.reid@example.co.uk',
  household: 'The Reid household',
};
