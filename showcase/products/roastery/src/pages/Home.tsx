import { Link } from 'react-router';
import Accordion, { type QA } from '../components/Accordion';
import { ArrowIcon, BoxIcon, CalendarIcon, FlameIcon, StarIcon } from '../components/Icons';
import ProductCard from '../components/ProductCard';
import { ROAST_CALENDAR, coffees } from '../data/coffees';
import Img from '../components/Img';
import type { PhotoName } from '../data/photos';
import { useTitle } from '../useTitle';

const STEPS = [
  {
    icon: <FlameIcon width={26} height={26} />,
    title: 'Pick a plan and a grind',
    text: 'One, two or four bags a fortnight. Whole bean or ground for anything from espresso to a cafetière.',
  },
  {
    icon: <CalendarIcon width={26} height={26} />,
    title: 'We roast it for you',
    text: 'Your coffee is roasted on Monday or Thursday and leaves the roastery the same afternoon.',
  },
  {
    icon: <BoxIcon width={26} height={26} />,
    title: 'It fits through your letterbox',
    text: 'Flat, recyclable mailers by Royal Mail Tracked 48. Skip, pause or change coffee whenever you like.',
  },
];

const REVIEWS = [
  {
    quote:
      'I’ve tried four subscriptions in two years and this is the one I’ve kept. The Kochere last spring was the best coffee I’ve made at home, full stop.',
    name: 'Priya N.',
    city: 'Leeds',
    plan: 'Duo subscriber since 2023',
  },
  {
    quote:
      'The bags arrive on the Wednesday after roasting without fail. The little card with brew ratios is genuinely useful — I finally stopped guessing.',
    name: 'Tom Ashworth',
    city: 'Manchester',
    plan: 'Solo subscriber',
  },
  {
    quote:
      'We run a six-seat café and Furnace is all we pour. Customers ask for it by name, which never happened with our old supplier.',
    name: 'Hannah & Callum',
    city: 'Hebden Bridge',
    plan: 'Wholesale customer',
  },
  {
    quote:
      'Skipping a delivery while we were away took about ten seconds. Small thing, but it’s why I trust them with my money.',
    name: 'Gareth Lloyd',
    city: 'Cardiff',
    plan: 'Household subscriber',
  },
  {
    quote: 'Finally a decaf that doesn’t taste like cardboard. My partner can’t tell which cup is which.',
    name: 'Sinéad M.',
    city: 'Belfast',
    plan: 'Solo subscriber',
  },
  {
    quote:
      'Popped into the roastery on a Saturday and Dev talked me through three coffees on the bar. Left with a bag and a much better grinder setting.',
    name: 'Marcus Webb',
    city: 'Sheffield',
    plan: 'Shop customer',
  },
];

const FAQ: QA[] = [
  {
    q: 'How fresh is the coffee when it arrives?',
    a: (
      <p>
        We roast every Monday and Thursday and only ship what was roasted that day. Most orders arrive two to three days
        after roasting, which is right when filter coffee starts to taste its best. The roast date is printed on every bag.
      </p>
    ),
  },
  {
    q: 'Which grind should I choose?',
    a: (
      <p>
        If you own a grinder, choose whole bean — it stays fresh for longer. Otherwise pick the brewer you use most: we
        grind for espresso, moka pot, AeroPress, pour-over and cafetière on a commercial burr grinder, set for each.
      </p>
    ),
  },
  {
    q: 'Do you deliver outside the UK?',
    a: (
      <p>
        Right now we ship to the UK mainland, Northern Ireland, the Isle of Man and the Channel Islands. We’re working on
        Ireland and hope to open it early next year.
      </p>
    ),
  },
  {
    q: 'Is your packaging recyclable?',
    a: (
      <p>
        Our bags are a single-material film that goes in soft-plastics recycling at most large supermarkets, and the mailers
        are 100% recycled card. The one-way valve can stay on.
      </p>
    ),
  },
  {
    q: 'Can I buy as a gift?',
    a: (
      <p>
        Yes. Any subscription can be bought as a gift for 3, 6 or 12 deliveries, and you can choose the date the first bag
        arrives. We include a handwritten card if you leave a message at checkout.
      </p>
    ),
  },
];

const STRIP: PhotoName[] = ['roastery-machine', 'roaster-cooling', 'cafe-counter', 'grinder', 'beans-sack-open'];

export default function Home() {
  useTitle('Kiln Street Coffee — Small-batch roasters, Sheffield');
  const featured = coffees.filter((c) => c.thisMonth).slice(0, 4);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Img name="roaster-cooling" className="hero-image" eager />
        <div className="hero-scrim" />
        <div className="container hero-content">
          <p className="hero-kicker">Roasted in Sheffield since 2017</p>
          <h1 id="hero-title">Coffee roasted on Monday, in your cup by Wednesday.</h1>
          <p className="hero-lede">
            Traceable single origins and one very good house blend, roasted in small batches twice a week and sent straight
            to your door.
          </p>
          <div className="hero-actions">
            <Link to="/subscribe" className="button button-light" data-testid="hero-cta">
              Start a subscription
            </Link>
            <Link to="/shop" className="button button-ghost-light">
              Shop all coffee
            </Link>
          </div>
          <dl className="hero-facts">
            <div>
              <dt>Last roast</dt>
              <dd>{ROAST_CALENDAR.last}</dd>
            </div>
            <div>
              <dt>Subscribers</dt>
              <dd>2,318</dd>
            </div>
            <div>
              <dt>Farms we buy from</dt>
              <dd>14 in 7 countries</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Subscriptions</p>
            <h2 id="how-title">Fresh coffee, without thinking about it</h2>
            <p className="lede">From £9.15 a bag. No minimum term, no fees for skipping, and free delivery on every box.</p>
          </div>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step-icon">{s.icon}</span>
                <span className="step-number">Step {i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="center-row">
            <Link to="/subscribe" className="button">
              Choose your plan
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-tinted" aria-labelledby="month-title">
        <div className="container">
          <div className="section-head split">
            <div>
              <p className="eyebrow">On the roaster this October</p>
              <h2 id="month-title">This month’s coffees</h2>
            </div>
            <Link to="/shop" className="text-link">
              See all 10 coffees <ArrowIcon width={18} height={18} />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((c) => (
              <ProductCard key={c.slug} coffee={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section story-band" aria-labelledby="story-title">
        <div className="container story-grid">
          <div className="story-photos">
            <Img name="farm-cherries" className="story-photo-a" />
            <Img name="farm-drying" className="story-photo-b" />
          </div>
          <div className="story-copy">
            <p className="eyebrow">From farm to cup</p>
            <h2 id="story-title">We know who grew every bean we sell</h2>
            <p>
              We buy directly or through two importers we trust, pay an average of 2.4× the Fairtrade minimum, and go back
              to the same farms year after year. That’s how we know the Kochere cherries were picked in December, dried for
              eleven days and cupped by the station manager before they left Ethiopia.
            </p>
            <ul className="story-stats">
              <li>
                <strong>£6.82</strong>
                <span>average paid per kg of green coffee, 2025</span>
              </li>
              <li>
                <strong>9 of 14</strong>
                <span>producers we’ve bought from for 3+ harvests</span>
              </li>
              <li>
                <strong>12 kg</strong>
                <span>batch size on our roaster</span>
              </li>
            </ul>
            <Link to="/about#sourcing" className="text-link">
              How we source <ArrowIcon width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="reviews-title">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">From our subscribers</p>
            <h2 id="reviews-title">Rated 4.9 out of 5 from 1,204 reviews</h2>
          </div>
          <ul className="reviews">
            {REVIEWS.map((r) => (
              <li key={r.name} className="review">
                <div className="stars" aria-label="5 out of 5 stars" role="img">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <StarIcon key={n} width={16} height={16} />
                  ))}
                </div>
                <blockquote>
                  <p>“{r.quote}”</p>
                </blockquote>
                <p className="review-by">
                  <strong>{r.name}</strong>, {r.city}
                  <span className="muted small">{r.plan}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="photo-strip" aria-label="Inside the roastery">
        {STRIP.map((n) => (
          <Img key={n} name={n} />
        ))}
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="faq-title">Frequently asked</h2>
            <p className="muted">
              Something else? Email <a href="mailto:hello@kilnstreet.coffee">hello@kilnstreet.coffee</a> — a real person
              replies within a working day.
            </p>
          </div>
          <Accordion items={FAQ} />
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-title">
        <div className="container cta-inner">
          <div>
            <h2 id="cta-title">Your first bag, 30% off</h2>
            <p>Start any subscription before 31 October and we’ll take 30% off the first delivery. Cancel whenever.</p>
          </div>
          <div className="cta-actions">
            <Link to="/subscribe" className="button button-light">
              Start a subscription
            </Link>
            <Link to="/shop" className="button button-ghost-light">
              Buy a single bag
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
