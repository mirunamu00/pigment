import { useState } from 'react';
import { CheckIcon } from '../components/Icons';
import { Img } from '../components/Img';
import { creditLine, photo } from '../data/photos';
import { useTitle } from '../useTitle';

const team = [
  { name: 'Maren Holt', role: 'Editor', note: 'Founded Halfpenny in 2019 after twelve years at a regional daily.' },
  { name: 'Tobias Achterberg', role: 'Deputy editor', note: 'Runs the desk, the schedule and the corrections column.' },
  { name: 'Nadia Okafor', role: 'Food editor', note: 'Books every review under another name, and pays for every meal.' },
  { name: 'Elliot Vance', role: 'Design editor', note: 'Former architect; writes about buildings, rooms and objects.' },
  { name: 'Ciarán Doyle', role: 'Music editor', note: 'Has reviewed some six hundred gigs and bought a ticket for all of them.' },
  { name: 'Ruth Abernethy', role: 'Neighbourhoods editor', note: 'Covers housing, planning and the city one street at a time.' },
  { name: 'Jun Takeda', role: 'Photo editor', note: 'Commissions our photography and shoots the Saturday photo essay.' },
  { name: 'Bea Lindqvist', role: 'Listings editor', note: 'Checks every listing by phone, and writes the Weekender.' },
  { name: 'Tom Rennick', role: 'Publisher', note: 'Looks after members, partners and the money, such as it is.' },
];

type Billing = 'monthly' | 'yearly';

const plans = [
  {
    id: 'reader',
    name: 'Reader',
    monthly: 0,
    yearly: 0,
    blurb: 'Everything on the site, free, for as long as we can keep it that way.',
    perks: ['Every story, review and listing', 'The Weekender newsletter', 'Comment on stories'],
    cta: 'Sign up free',
  },
  {
    id: 'member',
    name: 'Member',
    monthly: 5,
    yearly: 50,
    blurb: 'Pays for one review meal a month, and keeps the site free for everyone else.',
    perks: ['Everything in Reader', 'The printed Halfpenny annual each December', 'Listings a day early', 'Members’ evenings, four a year'],
    cta: 'Become a member',
    featured: true,
  },
  {
    id: 'supporter',
    name: 'Supporter',
    monthly: 12,
    yearly: 120,
    blurb: 'For readers who want to fund the long reads that take months to report.',
    perks: ['Everything in Member', 'Your name in the annual', 'Two guest tickets to every members’ evening', 'A note from the editor on what you funded'],
    cta: 'Become a supporter',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('');
}

export function About() {
  useTitle('About');
  const [billing, setBilling] = useState<Billing>('monthly');
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <>
      <header className="about-hero">
        <div className="container about-hero__inner">
          <div>
            <p className="kicker">About Halfpenny</p>
            <h1 className="display">A magazine about one city, paid for by the people who live in it</h1>
            <p className="lede">
              Halfpenny started in 2019 as a weekly email to two hundred friends. It now publishes every weekday and is read
              by around 140,000 people a month — about Calder, for Calder, with no owner but its members.
            </p>
          </div>
          <figure className="figure about-hero__figure">
            <Img name="hood-painted-terraces" />
            <figcaption>
              Ashby Terrace, Calder. <span className="figure__credit">{creditLine(photo('hood-painted-terraces'))}</span>
            </figcaption>
          </figure>
        </div>
      </header>

      <section className="container about-principles" aria-labelledby="principles-heading">
        <h2 id="principles-heading" className="rule-heading">
          How we work
        </h2>
        <div className="grid grid--3">
          <div className="principle">
            <p className="principle__num">01</p>
            <h3>We pay our own way</h3>
            <p>Every meal, ticket and night out we review is paid for by us. We don’t accept free tables, press trips or gifts.</p>
          </div>
          <div className="principle">
            <p className="principle__num">02</p>
            <h3>We stay local</h3>
            <p>We only write about Calder. If a story could run in any city, it probably isn’t one for us.</p>
          </div>
          <div className="principle">
            <p className="principle__num">03</p>
            <h3>We fix our mistakes</h3>
            <p>Corrections go at the foot of the story and on a public page. We’d rather be right than first.</p>
          </div>
        </div>
        <dl className="stats">
          <div>
            <dt>Readers a month</dt>
            <dd>140,000</dd>
          </div>
          <div>
            <dt>Paying members</dt>
            <dd>3,400</dd>
          </div>
          <div>
            <dt>Stories published</dt>
            <dd>2,180</dd>
          </div>
          <div>
            <dt>Freelancers paid in 2026</dt>
            <dd>64</dd>
          </div>
        </dl>
      </section>

      <section className="container team" aria-labelledby="team-heading">
        <h2 id="team-heading" className="rule-heading">
          The team
        </h2>
        <ul className="team__grid">
          {team.map((m) => (
            <li key={m.name} className="team-member">
              <span className="avatar avatar--large" aria-hidden>
                {initials(m.name)}
              </span>
              <div>
                <p className="team-member__name">{m.name}</p>
                <p className="team-member__role">{m.role}</p>
                <p className="team-member__note">{m.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="membership" className="membership" aria-labelledby="membership-heading">
        <div className="container">
          <div className="membership__head">
            <div>
              <p className="kicker">Membership</p>
              <h2 id="membership-heading" className="membership__title">
                Keep Halfpenny free to read
              </h2>
              <p className="membership__intro">
                Members pay for about two thirds of everything we do. Cancel any time; yearly plans get two months free.
              </p>
            </div>
            <div className="billing-toggle" role="group" aria-label="Billing period">
              <button type="button" aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')} data-testid="billing-monthly">
                Monthly
              </button>
              <button type="button" aria-pressed={billing === 'yearly'} onClick={() => setBilling('yearly')} data-testid="billing-yearly">
                Yearly <span className="billing-toggle__save">Save 17%</span>
              </button>
            </div>
          </div>

          <ul className="plans">
            {plans.map((plan) => {
              const price = billing === 'monthly' ? plan.monthly : plan.yearly;
              return (
                <li key={plan.id} className={`plan${plan.featured ? ' plan--featured' : ''}${chosen === plan.id ? ' is-chosen' : ''}`}>
                  {plan.featured ? <p className="plan__badge">Most popular</p> : null}
                  <h3 className="plan__name">{plan.name}</h3>
                  <p className="plan__price" data-testid={`plan-price-${plan.id}`}>
                    {price === 0 ? (
                      <span className="plan__amount">Free</span>
                    ) : (
                      <>
                        <span className="plan__amount">£{price}</span>
                        <span className="plan__period">/{billing === 'monthly' ? 'month' : 'year'}</span>
                      </>
                    )}
                  </p>
                  <p className="plan__note">
                    {price === 0
                      ? 'No card needed'
                      : billing === 'yearly'
                        ? `Works out at £${(plan.yearly / 12).toFixed(2)} a month`
                        : `Or £${plan.yearly} a year`}
                  </p>
                  <p className="plan__blurb">{plan.blurb}</p>
                  <ul className="plan__perks">
                    {plan.perks.map((perk) => (
                      <li key={perk}>
                        <CheckIcon />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`button ${plan.featured ? 'button--primary' : 'button--secondary'} button--block`}
                    onClick={() => setChosen(plan.id)}
                    data-testid={`plan-${plan.id}`}
                  >
                    {chosen === plan.id ? 'Selected — continue to checkout' : plan.cta}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="membership__small">
            Halfpenny Media is a community interest company. Our accounts are published every April.
          </p>
        </div>
      </section>

      <section className="container contact-strip" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="rule-heading">
          Get in touch
        </h2>
        <dl className="contact-grid">
          <div>
            <dt>Story tips</dt>
            <dd>desk@halfpenny.example</dd>
          </div>
          <div>
            <dt>Listings</dt>
            <dd>listings@halfpenny.example</dd>
          </div>
          <div>
            <dt>Members</dt>
            <dd>members@halfpenny.example</dd>
          </div>
          <div>
            <dt>Office</dt>
            <dd>4 Printworks Yard, Alder Street, Calder</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
