import { Link } from 'react-router';
import { useTitle } from '../useTitle';

export type LegalPage = 'privacy' | 'terms' | 'cookies' | 'shipping';

const PAGES: Record<LegalPage, { title: string; updated: string; sections: [string, string][] }> = {
  privacy: {
    title: 'Privacy policy',
    updated: '3 March 2026',
    sections: [
      ['Who we are', 'Kiln Street Coffee Ltd (company no. 11847203) is the controller of the personal data you give us when you order, subscribe or sign up for the Roast Letter.'],
      ['What we collect', 'Your name, delivery address, email address and order history. Card payments are handled by our payment provider; we never see or store your full card number.'],
      ['How we use it', 'To roast and post your orders, to manage your subscription, and — only if you sign up — to send the Roast Letter. We don’t sell or share your data for anyone else’s marketing.'],
      ['Your rights', 'You can ask for a copy of your data, ask us to correct it or delete it at any time by emailing privacy@kilnstreet.coffee. We reply within 30 days.'],
    ],
  },
  terms: {
    title: 'Terms of sale',
    updated: '3 March 2026',
    sections: [
      ['Orders', 'A contract is formed when we email to confirm your order has been roasted and dispatched. Prices include VAT where it applies.'],
      ['Subscriptions', 'Per-delivery subscriptions can be cancelled at any time before 9am the day before your roast day. Yearly subscriptions are refundable for any deliveries not yet sent.'],
      ['Freshly roasted goods', 'Because coffee is roasted to order, the 14-day cancellation right does not apply once your coffee has been roasted. If something is wrong, we will always put it right.'],
    ],
  },
  cookies: {
    title: 'Cookies',
    updated: '3 March 2026',
    sections: [
      ['Essential cookies', 'We use a small number of cookies to keep your bag and your account signed in. These can’t be switched off.'],
      ['Analytics', 'With your consent we count page views in aggregate to see which pages are useful. No advertising cookies, ever.'],
    ],
  },
  shipping: {
    title: 'Delivery & returns',
    updated: '14 August 2026',
    sections: [
      ['When we post', 'Orders placed before 11am on Monday or Thursday are roasted and posted the same day. Otherwise they go out on the next roast day.'],
      ['Delivery', 'Royal Mail Tracked 48 for £3.95, free on orders over £30 and on every subscription delivery. Most orders arrive within two working days of dispatch.'],
      ['Something wrong?', 'If a bag arrives damaged, late or just isn’t to your taste, email hello@kilnstreet.coffee and we’ll replace it or refund you. No need to send it back.'],
    ],
  },
};

export default function Legal({ page }: { page: LegalPage }) {
  const p = PAGES[page];
  useTitle(`${p.title} — Kiln Street Coffee`);
  return (
    <>
      <section className="page-head">
        <div className="container narrow">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">{p.title}</span>
          </nav>
          <h1>{p.title}</h1>
          <p className="muted">Last updated {p.updated}</p>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container narrow prose">
          {p.sections.map(([h, t]) => (
            <div key={h}>
              <h2>{h}</h2>
              <p>{t}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
