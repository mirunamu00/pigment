export const BRAND = 'Hourglade';

export interface NavItem {
  to: string;
  label: string;
  /** Suffix for the testids: nav-<id> (desktop) and mobile-nav-<id> (menu panel). */
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/#features', label: 'Features', id: 'features' },
  { to: '/#how-it-works', label: 'How it works', id: 'how-it-works' },
  { to: '/pricing', label: 'Pricing', id: 'pricing' },
  { to: '/customers', label: 'Customers', id: 'customers' },
];

/** Fictional customers shown as plain text in the logo strip. */
export const LOGO_NAMES: string[] = [
  'Brightmoor Clinics',
  'Kestrel Freight',
  'Oakline Studio',
  'Copperfield Schools',
  'Saltmarsh Coffee',
  'Vantor Labs',
];

export interface Feature {
  id: string;
  title: string;
  text: string;
}

export const FEATURES: Feature[] = [
  {
    id: 'booking-pages',
    title: 'Booking pages',
    text: 'Share one link and let people pick a time that already works for everyone on the invite.',
  },
  {
    id: 'team-availability',
    title: 'Team availability',
    text: 'See who is free across time zones without opening five calendars side by side.',
  },
  {
    id: 'round-robin',
    title: 'Round-robin routing',
    text: 'Spread incoming meetings evenly across a team, or send them to whoever is next in line.',
  },
  {
    id: 'reminders',
    title: 'Smart reminders',
    text: 'Email and text reminders go out on a schedule you choose, so fewer meetings are missed.',
  },
  {
    id: 'buffers',
    title: 'Buffers and limits',
    text: 'Add breathing room between meetings and cap how many can land on a single day.',
  },
  {
    id: 'integrations',
    title: 'Calendar sync',
    text: 'Works with the calendars your team already uses and keeps every event up to date both ways.',
  },
];

export interface Step {
  title: string;
  text: string;
}

export const STEPS: Step[] = [
  {
    title: 'Connect your calendar',
    text: 'Sign in once and Hourglade reads your free and busy times. It never shows event details.',
  },
  {
    title: 'Set your rules',
    text: 'Choose meeting lengths, working hours, buffers and who on the team can be booked.',
  },
  {
    title: 'Share your link',
    text: 'Put the link in an email, a signature or your website. Bookings land straight on your calendar.',
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: '12,000+', label: 'teams schedule with Hourglade' },
  { value: '3.2M', label: 'meetings booked every month' },
  { value: '4.8/5', label: 'average rating from admins' },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'We stopped the back-and-forth emails in the first week. Our intake calls now book themselves.',
    name: 'Priya Nandakumar',
    role: 'Operations lead, Brightmoor Clinics',
  },
  {
    quote: 'Round-robin routing finally made our demo load fair. Nobody on the team is buried anymore.',
    name: 'Tomás Ferreira',
    role: 'Sales manager, Vantor Labs',
  },
  {
    quote: 'Parents pick a conference slot from one page. It used to take our office two full days.',
    name: 'Grace Whitaker',
    role: 'Front office, Copperfield Schools',
  },
];

export interface FooterColumn {
  heading: string;
  links: { to: string; label: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { to: '/#features', label: 'Features' },
      { to: '/#how-it-works', label: 'How it works' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  {
    heading: 'Customers',
    links: [
      { to: '/customers', label: 'Case studies' },
      { to: '/#testimonials', label: 'Testimonials' },
    ],
  },
  {
    heading: 'Get started',
    links: [
      { to: '/signup', label: 'Create an account' },
      { to: '/#faq', label: 'Questions' },
    ],
  },
];
