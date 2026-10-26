import { useState } from 'react';
import { Link } from 'react-router';
import Accordion, { type QA } from '../components/Accordion';
import { CheckIcon } from '../components/Icons';
import Img from '../components/Img';
import { ROAST_CALENDAR, formatGBP } from '../data/coffees';
import { useTitle } from '../useTitle';

type PlanId = 'solo' | 'duo' | 'household';
type Billing = 'delivery' | 'yearly';

interface Plan {
  id: PlanId;
  name: string;
  bags: number;
  perDelivery: number;
  blurb: string;
  features: string[];
  recommended?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'solo',
    name: 'Solo',
    bags: 1,
    perDelivery: 10.4,
    blurb: 'For one person and a cup or two a day.',
    features: ['1 × 250 g bag', 'About 16 cups per bag', 'Free delivery', 'Skip or pause anytime'],
  },
  {
    id: 'duo',
    name: 'Duo',
    bags: 2,
    perDelivery: 19.6,
    blurb: 'Our most popular plan. Two different coffees each time.',
    features: ['2 × 250 g bags', 'Two coffees to compare', 'Free delivery', 'Subscriber-only lots', 'Skip or pause anytime'],
    recommended: true,
  },
  {
    id: 'household',
    name: 'Household',
    bags: 4,
    perDelivery: 36.6,
    blurb: 'For busy kitchens, home espresso and small offices.',
    features: ['4 × 250 g bags or 1 × 1 kg', 'Lowest price per bag', 'Free delivery', 'Subscriber-only lots', 'Priority on limited coffees'],
  },
];

const YEARLY_DISCOUNT = 0.12;

const FREQUENCIES = [
  { id: '1', label: 'Every week', perYear: 52 },
  { id: '2', label: 'Every 2 weeks', perYear: 26 },
  { id: '4', label: 'Every 4 weeks', perYear: 13 },
];

const COFFEE_CHOICES = [
  { id: 'roasters-choice', label: 'Roaster’s Choice', note: 'A different single origin every time' },
  { id: 'furnace', label: 'Furnace House Blend', note: 'The same reliable blend, every time' },
  { id: 'decaf', label: 'Las Nubes Decaf', note: 'Sugarcane decaf from Colombia' },
];

const GRINDS = ['Whole bean', 'Espresso', 'Moka pot', 'AeroPress', 'Pour-over', 'Cafetière'];

const FAQ: QA[] = [
  {
    q: 'Can I skip, pause or cancel?',
    a: (
      <p>
        Yes, from your account at any time up to 9am the day before your roast day. Skipping moves your next delivery on by
        one cycle; pausing holds it until you choose a date. There’s no minimum term and no cancellation fee on per-delivery
        billing.
      </p>
    ),
  },
  {
    q: 'How does yearly billing work?',
    a: (
      <p>
        You pay for a year of deliveries up front and save 12%. You can still skip and pause — skipped deliveries are added to
        the end of your year. If you cancel early we refund every delivery you haven’t received, minus the 12% discount on the
        ones you have.
      </p>
    ),
  },
  {
    q: 'What is Roaster’s Choice?',
    a: (
      <p>
        Every roast day our head roaster picks the single origin that’s tasting best. You get a card with the farm, the
        process and a recipe. If there’s an origin you don’t like, tell us and we’ll never send it.
      </p>
    ),
  },
  {
    q: 'When will my first bag arrive?',
    a: (
      <p>
        Orders placed before 11am on a Monday or Thursday are roasted and posted that day. Otherwise your coffee goes on the
        next roast day. Royal Mail Tracked 48 usually takes two working days.
      </p>
    ),
  },
  {
    q: 'Can I change plan or grind later?',
    a: <p>Any time. Changes made before 9am the day before roast day apply to your next delivery.</p>,
  },
];

export default function Subscribe() {
  useTitle('Coffee subscriptions — Kiln Street Coffee');
  const [billing, setBilling] = useState<Billing>('delivery');
  const [planId, setPlanId] = useState<PlanId>('duo');
  const [freq, setFreq] = useState('2');
  const [coffee, setCoffee] = useState(COFFEE_CHOICES[0].id);
  const [grind, setGrind] = useState(GRINDS[0]);

  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
  const frequency = FREQUENCIES.find((f) => f.id === freq) ?? FREQUENCIES[1];
  const price = (p: Plan) => (billing === 'yearly' ? p.perDelivery * (1 - YEARLY_DISCOUNT) : p.perDelivery);
  const perDelivery = price(plan);
  const yearlyTotal = perDelivery * frequency.perYear;
  const yearlySaving = plan.perDelivery * frequency.perYear * YEARLY_DISCOUNT;
  const choice = COFFEE_CHOICES.find((c) => c.id === coffee) ?? COFFEE_CHOICES[0];

  return (
    <>
      <section className="page-head page-head-photo">
        <Img name="brew-pourover" className="page-head-image" />
        <div className="page-head-scrim" />
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Subscriptions</span>
          </nav>
          <h1>Coffee subscriptions</h1>
          <p className="lede">
            Freshly roasted coffee on your schedule. Free delivery, no minimum term, and you can skip or pause from your account
            in seconds.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="plans-title">
        <div className="container">
          <div className="section-head center">
            <h2 id="plans-title">Choose a plan</h2>
            <div className="billing-toggle" role="radiogroup" aria-label="Billing">
              <button
                type="button"
                role="radio"
                aria-checked={billing === 'delivery'}
                onClick={() => setBilling('delivery')}
                data-testid="billing-delivery"
              >
                Pay per delivery
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={billing === 'yearly'}
                onClick={() => setBilling('yearly')}
                data-testid="billing-yearly"
              >
                Pay yearly <span className="save-pill">Save 12%</span>
              </button>
            </div>
          </div>

          <div className="plans">
            {PLANS.map((p) => {
              const selected = p.id === planId;
              return (
                <article
                  key={p.id}
                  className={`plan${p.recommended ? ' recommended' : ''}${selected ? ' selected' : ''}`}
                  aria-labelledby={`plan-${p.id}-name`}
                  data-testid={`plan-card-${p.id}`}
                >
                  {p.recommended && <p className="plan-flag">Most popular</p>}
                  <h3 id={`plan-${p.id}-name`}>{p.name}</h3>
                  <p className="plan-blurb">{p.blurb}</p>
                  <p className="plan-price">
                    <strong>{formatGBP(price(p))}</strong>
                    <span> / delivery</span>
                  </p>
                  <p className="plan-per-bag muted small">
                    {formatGBP(price(p) / p.bags)} per bag
                    {billing === 'yearly' && (
                      <>
                        {' '}
                        · <s>{formatGBP(p.perDelivery)}</s>
                      </>
                    )}
                  </p>
                  <ul className="plan-features">
                    {p.features.map((f) => (
                      <li key={f}>
                        <CheckIcon width={18} height={18} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`button button-block${selected ? '' : ' button-outline'}`}
                    aria-pressed={selected}
                    onClick={() => setPlanId(p.id)}
                    data-testid={`plan-${p.id}`}
                  >
                    {selected ? 'Selected' : `Choose ${p.name}`}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-tinted" aria-labelledby="build-title">
        <div className="container builder">
          <div className="builder-form">
            <h2 id="build-title">Make it yours</h2>
            <fieldset className="field">
              <legend>Coffee</legend>
              <div className="option-cards">
                {COFFEE_CHOICES.map((c) => (
                  <label key={c.id} className="option-card" data-testid={`coffee-${c.id}`}>
                    <input type="radio" name="coffee" value={c.id} checked={coffee === c.id} onChange={() => setCoffee(c.id)} />
                    <span>
                      <strong>{c.label}</strong>
                      <small>{c.note}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field-row">
              <div className="field">
                <label htmlFor="sub-frequency">Delivery</label>
                <select id="sub-frequency" value={freq} onChange={(e) => setFreq(e.target.value)} data-testid="frequency-select">
                  {FREQUENCIES.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="sub-grind">Grind</label>
                <select id="sub-grind" value={grind} onChange={(e) => setGrind(e.target.value)} data-testid="sub-grind-select">
                  {GRINDS.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <aside className="summary" aria-labelledby="summary-title" data-testid="plan-summary">
            <h2 id="summary-title">Your subscription</h2>
            <dl>
              <div>
                <dt>Plan</dt>
                <dd data-testid="summary-plan">
                  {plan.name} · {plan.bags} {plan.bags === 1 ? 'bag' : 'bags'}
                </dd>
              </div>
              <div>
                <dt>Coffee</dt>
                <dd>{choice.label}</dd>
              </div>
              <div>
                <dt>Grind</dt>
                <dd>{grind}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>{frequency.label}</dd>
              </div>
              <div>
                <dt>First roast</dt>
                <dd>{ROAST_CALENDAR.next}</dd>
              </div>
              <div>
                <dt>Billing</dt>
                <dd>{billing === 'yearly' ? `Yearly, ${frequency.perYear} deliveries` : 'Per delivery'}</dd>
              </div>
            </dl>
            <div className="summary-total">
              <span>{billing === 'yearly' ? 'Due today' : 'Per delivery'}</span>
              <strong data-testid="summary-total">{formatGBP(billing === 'yearly' ? yearlyTotal : perDelivery)}</strong>
            </div>
            {billing === 'yearly' ? (
              <p className="summary-note good">You save {formatGBP(yearlySaving)} a year against paying per delivery.</p>
            ) : (
              <p className="summary-note">Switch to yearly billing to save {formatGBP(yearlySaving)} a year.</p>
            )}
            <button type="button" className="button button-block button-large" data-testid="subscribe-continue">
              Continue to checkout
            </button>
            <p className="muted small center-text">No commitment on per-delivery billing. Cancel online in one click.</p>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="subscription-faq-title" id="subscription-faq">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow">Subscriptions</p>
            <h2 id="subscription-faq-title">Good to know</h2>
            <p className="muted">
              2,318 people get their coffee from us this way. Here’s what they asked before signing up.
            </p>
          </div>
          <Accordion items={FAQ} />
        </div>
      </section>
    </>
  );
}
