export type EventCategory = 'Music' | 'Food' | 'Markets' | 'Talks' | 'Exhibitions' | 'Film';

export const eventCategories: EventCategory[] = ['Music', 'Food', 'Markets', 'Talks', 'Exhibitions', 'Film'];

export interface CityEvent {
  id: string;
  day: string;
  title: string;
  category: EventCategory;
  venue: string;
  area: string;
  time: string;
  price: string;
  blurb: string;
  pick?: boolean;
}

export interface EventDay {
  id: string;
  label: string;
  date: string;
}

export const eventDays: EventDay[] = [
  { id: 'thu', label: 'Thursday', date: '29 October' },
  { id: 'fri', label: 'Friday', date: '30 October' },
  { id: 'sat', label: 'Saturday', date: '31 October' },
  { id: 'sun', label: 'Sunday', date: '1 November' },
];

export const events: CityEvent[] = [
  { id: 'e1', day: 'thu', title: 'Bargain Bin', category: 'Music', venue: 'The Lamp Room', area: 'Mill District', time: '9pm–2am', price: '£6', blurb: 'The monthly night where nothing played cost more than a pound. Arrive early; it is always full by ten.', pick: true },
  { id: 'e2', day: 'thu', title: 'Post-war Calder: the city architect’s office', category: 'Talks', venue: 'Hallam Gallery', area: 'Gallery Square', time: '6.30pm', price: 'Free, book ahead', blurb: 'The curators of Concrete Futures on the department that rebuilt the city between 1952 and 1974.' },
  { id: 'e3', day: 'thu', title: 'Supper club: a harvest table', category: 'Food', venue: 'Wild Rye', area: 'Salt Quay', time: '7pm', price: '£42', blurb: 'Five courses around the bakery’s long table, with bread from the morning bake and cider from Upper Weir.' },
  { id: 'e4', day: 'fri', title: 'Tanner Street night market', category: 'Food', venue: 'Tanner Street arches', area: 'Viaduct', time: '8pm–1am', price: 'Free entry', blurb: 'Twenty-two stalls under the railway arches, with only seventeen Fridays left before the move.', pick: true },
  { id: 'e5', day: 'fri', title: 'Low Tide Choir', category: 'Music', venue: 'Coal Exchange', area: 'Exchange Street', time: 'Doors 7pm', price: '£24', blurb: 'The second of three hometown nights. A handful of returns are released at noon on the day.' },
  { id: 'e6', day: 'fri', title: 'Neon after dark', category: 'Exhibitions', venue: 'Thread Mill, 2nd floor', area: 'Mill District', time: '6pm–10pm', price: '£5', blurb: 'The city’s last neon workshop lights up forty years of signs, switched on one by one at dusk.' },
  { id: 'e7', day: 'fri', title: 'Late film: the river on film, 1920–1970', category: 'Film', venue: 'The Electric', area: 'Bridge Street', time: '9.15pm', price: '£9', blurb: 'Archive footage of the Weir, the docks and the ferry, with a live piano score.' },
  { id: 'e8', day: 'sat', title: 'Pell Street flea', category: 'Markets', venue: 'Pell Street', area: 'Old Town', time: '8am–2pm', price: 'Free', blurb: 'Brass, glass, coats and records at the city’s oldest flea. The serious buyers are there by eight.', pick: true },
  { id: 'e9', day: 'sat', title: 'Alder Theatre open day', category: 'Exhibitions', venue: 'Alder Theatre', area: 'Theatre Square', time: '10am–4pm', price: 'Free', blurb: 'Walk the restored grand stair and the painted dome before the theatre reopens in December.' },
  { id: 'e10', day: 'sat', title: 'Eastgate spice walk', category: 'Food', venue: 'Eastgate arcades, north entrance', area: 'Eastgate', time: '1pm', price: '£12 with tastings', blurb: 'A guided version of our arcade crawl, led by the stallholders. Bring cash and an empty bag.' },
  { id: 'e11', day: 'sat', title: 'Record fair', category: 'Markets', venue: 'Corn Exchange', area: 'City Centre', time: '10am–5pm', price: '£2', blurb: 'Forty dealers from across the north. Early entry from 9am is £5 and worth it.' },
  { id: 'e12', day: 'sat', title: 'Halloween at the Lamp Room', category: 'Music', venue: 'The Lamp Room', area: 'Mill District', time: '10pm–4am', price: '£12', blurb: 'Three rooms, two live bands and a costume rule that is enforced at the door, gently.' },
  { id: 'e13', day: 'sun', title: 'Weir Road swap', category: 'Markets', venue: 'Weir Road school yard', area: 'Upper Weir', time: '10am–1pm', price: 'Free', blurb: 'Bring something, take something. Everything left after noon is free to whoever wants it.' },
  { id: 'e14', day: 'sun', title: 'Writing the city: a Halfpenny talk', category: 'Talks', venue: 'Bridge Street reading room', area: 'Bridge Street', time: '3pm', price: 'Free for members, £5', blurb: 'Our editors on a year of stories, and the ones that got away. Tea and cake provided.' },
  { id: 'e15', day: 'sun', title: 'Choral evensong with the Low Tide Choir', category: 'Music', venue: 'St Anne’s, Salt Quay', area: 'Salt Quay', time: '6pm', price: 'Pay what you can', blurb: 'An acoustic set in a candlelit church, with proceeds to the night shelter on Mill Lane.' },
  { id: 'e16', day: 'sun', title: 'Sunday roast, any veg', category: 'Food', venue: 'The Ferry House', area: 'Riverside', time: '12pm–5pm', price: 'From £16', blurb: 'The best roast in the city is vegetarian, and it is served until it runs out.' },
];
