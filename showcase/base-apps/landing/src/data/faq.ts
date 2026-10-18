export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** Also shown on the pricing page. */
  pricing?: boolean;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'free-trial',
    question: 'Is there a free trial?',
    answer: 'Yes. Every paid plan starts with a 14-day trial with all features turned on. No card is needed to start.',
    pricing: true,
  },
  {
    id: 'calendars',
    question: 'Which calendars does Hourglade work with?',
    answer: 'Any calendar that supports standard calendar sharing. Events sync both ways within a minute.',
  },
  {
    id: 'change-plan',
    question: 'Can I change plans later?',
    answer: 'You can move between plans at any time. Upgrades apply right away and downgrades apply at the next renewal.',
    pricing: true,
  },
  {
    id: 'privacy',
    question: 'Can people see my other meetings?',
    answer: 'No. Visitors only see open time slots. Titles, attendees and notes of your events are never shown.',
  },
  {
    id: 'billing',
    question: 'How does yearly billing work?',
    answer: 'Yearly plans are paid once a year and cost 20% less than paying month to month. Seats can be added at any time.',
    pricing: true,
  },
];

export const PRICING_FAQ_ITEMS = FAQ_ITEMS.filter((item) => item.pricing);
