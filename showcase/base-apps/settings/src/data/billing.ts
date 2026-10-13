export type PlanId = 'free' | 'pro' | 'business';

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'per month',
    features: ['1 workspace', 'Up to 3 members', 'Community support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12',
    period: 'per member / month',
    features: ['Unlimited workspaces', 'Up to 25 members', 'Email support'],
  },
  {
    id: 'business',
    name: 'Business',
    price: '$24',
    period: 'per member / month',
    features: ['Unlimited members', 'Single sign-on', 'Priority support'],
  },
];

export const initialPlanId: PlanId = 'pro';

export const paymentMethod = {
  brand: 'Visa',
  last4: '4242',
  expires: '08/28',
};

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Due';
}

export const invoices: Invoice[] = [
  { id: 'INV-1006', date: 'Oct 1, 2026', amount: '$60.00', status: 'Due' },
  { id: 'INV-1005', date: 'Sep 1, 2026', amount: '$60.00', status: 'Paid' },
  { id: 'INV-1004', date: 'Aug 1, 2026', amount: '$60.00', status: 'Paid' },
  { id: 'INV-1003', date: 'Jul 1, 2026', amount: '$48.00', status: 'Paid' },
  { id: 'INV-1002', date: 'Jun 1, 2026', amount: '$48.00', status: 'Paid' },
];
