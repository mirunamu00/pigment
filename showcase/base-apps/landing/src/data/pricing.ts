export type BillingPeriod = 'monthly' | 'yearly';
export type PlanId = 'starter' | 'team' | 'business';

export const YEARLY_DISCOUNT_PERCENT = 20;

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  /** Price per user per month, in whole dollars, for each billing period. */
  price: Record<BillingPeriod, number>;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individuals who book a handful of meetings a week.',
    price: { monthly: 10, yearly: 8 },
    features: ['One booking page', 'Calendar sync', 'Email reminders'],
    cta: 'Start with Starter',
  },
  {
    id: 'team',
    name: 'Team',
    description: 'For teams that share the load and work across time zones.',
    price: { monthly: 15, yearly: 12 },
    features: ['Unlimited booking pages', 'Team availability', 'Round-robin routing', 'Text reminders'],
    cta: 'Start with Team',
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For larger organizations with admin and security needs.',
    price: { monthly: 30, yearly: 24 },
    features: ['Everything in Team', 'Single sign-on', 'Admin roles', 'Priority support'],
    cta: 'Start with Business',
  },
];

export interface ComparisonRow {
  feature: string;
  plans: Record<PlanId, boolean>;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Booking pages', plans: { starter: true, team: true, business: true } },
  { feature: 'Calendar sync', plans: { starter: true, team: true, business: true } },
  { feature: 'Email reminders', plans: { starter: true, team: true, business: true } },
  { feature: 'Text reminders', plans: { starter: false, team: true, business: true } },
  { feature: 'Team availability', plans: { starter: false, team: true, business: true } },
  { feature: 'Round-robin routing', plans: { starter: false, team: true, business: true } },
  { feature: 'Single sign-on', plans: { starter: false, team: false, business: true } },
  { feature: 'Admin roles and audit log', plans: { starter: false, team: false, business: true } },
];
