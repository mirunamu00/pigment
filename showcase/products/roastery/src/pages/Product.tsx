import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useParams } from 'react-router';
import { useCart } from '../cart';
import { CheckIcon, MinusIcon, PlusIcon } from '../components/Icons';
import ProductCard, { RoastMeter } from '../components/ProductCard';
import { ROAST_CALENDAR, coffees, findCoffee, formatGBP, type Coffee } from '../data/coffees';
import { photo } from '../data/photos';
import { useTitle } from '../useTitle';
import NotFound from './NotFound';

const GRINDS = ['Whole bean', 'Espresso', 'Moka pot', 'AeroPress', 'Pour-over', 'Cafetière'];

interface Recipe {
  id: 'pourover' | 'espresso' | 'cafetiere';
  label: string;
  dose: string;
  water: string;
  time: string;
  temp: string;
  steps: string[];
}

function recipes(c: Coffee): Recipe[] {
  const light = c.roast <= 2;
  return [
    {
      id: 'pourover',
      label: 'Pour-over',
      dose: '15 g coffee',
      water: '250 g water',
      time: '2:45–3:15',
      temp: light ? '96 °C' : '93 °C',
      steps: [
        'Rinse the paper filter with hot water and tip the water away.',
        'Add 15 g of coffee ground like coarse sea salt and level the bed.',
        'Pour 40 g of water to bloom and wait 35 seconds.',
        'Pour in slow circles to 150 g, then to 250 g by 1:45.',
        'Give the brewer a gentle swirl and let it drain. Aim to finish by 3:15.',
      ],
    },
    {
      id: 'espresso',
      label: 'Espresso',
      dose: '18 g coffee',
      water: light ? '45 g out' : '38 g out',
      time: light ? '30–34 s' : '26–30 s',
      temp: light ? '94 °C' : '92 °C',
      steps: [
        'Rest the beans at least 7 days after the roast date before pulling shots.',
        'Dose 18 g into a clean, dry basket and tamp level.',
        `Pull to ${light ? '45 g' : '38 g'} in the cup — a ratio of about 1:${light ? '2.5' : '2.1'}.`,
        'Taste. Sour and thin? Grind finer. Bitter and dry? Grind coarser.',
      ],
    },
    {
      id: 'cafetiere',
      label: 'Cafetière',
      dose: '30 g coffee',
      water: '500 g water',
      time: '4:00 + 5:00 rest',
      temp: 'Just off the boil',
      steps: [
        'Add 30 g of coarsely ground coffee to the cafetière.',
        'Pour in 500 g of water just off the boil and start a timer.',
        'At 4 minutes, stir the crust and scoop off the foam with two spoons.',
        'Leave it another 5 minutes for the fines to settle.',
        'Press the plunger just below the surface — not to the bottom — and pour gently.',
      ],
    },
  ];
}

function BrewTabs({ coffee }: { coffee: Coffee }) {
  const list = recipes(coffee);
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    let n = active;
    if (e.key === 'ArrowRight') n = (active + 1) % list.length;
    else if (e.key === 'ArrowLeft') n = (active - 1 + list.length) % list.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = list.length - 1;
    else return;
    e.preventDefault();
    setActive(n);
    refs.current[n]?.focus();
  }

  const r = list[active];
  return (
    <div className="brew">
      <div role="tablist" aria-label="Brewing guides" className="tabs">
        {list.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
            className="tab"
            data-testid={`brew-tab-${t.id}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${r.id}`} aria-labelledby={`tab-${r.id}`} className="tab-panel" tabIndex={0}>
        <dl className="recipe-facts">
          <div>
            <dt>Dose</dt>
            <dd>{r.dose}</dd>
          </div>
          <div>
            <dt>Yield</dt>
            <dd>{r.water}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{r.time}</dd>
          </div>
          <div>
            <dt>Water</dt>
            <dd>{r.temp}</dd>
          </div>
        </dl>
        <ol className="recipe-steps">
          {r.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Product() {
  const { slug } = useParams();
  const coffee = findCoffee(slug);
  useTitle(coffee ? `${coffee.name} — Kiln Street Coffee` : 'Not found — Kiln Street Coffee');
  const { add } = useCart();
  const [image, setImage] = useState(0);
  const [size, setSize] = useState<'250g' | '1kg'>('250g');
  const [grind, setGrind] = useState(GRINDS[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setImage(0);
    setSize('250g');
    setQty(1);
    setAdded(false);
  }, [slug]);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 4000);
    return () => window.clearTimeout(t);
  }, [added]);

  if (!coffee) return <NotFound />;

  const gallery = coffee.gallery.map(photo);
  const main = gallery[image] ?? gallery[0];
  const unit = size === '1kg' ? coffee.priceKg : coffee.price;
  const related = coffees
    .filter((c) => c.slug !== coffee.slug)
    .sort((a, b) => Math.abs(a.roast - coffee.roast) - Math.abs(b.roast - coffee.roast) || a.order - b.order)
    .slice(0, 4);

  const facts: [string, string][] = [
    ['Producer', coffee.producer],
    ['Region', `${coffee.region}${coffee.country === 'Blend' ? '' : `, ${coffee.country}`}`],
    ['Altitude', coffee.altitude],
    ['Variety', coffee.variety],
    ['Process', coffee.process],
    ['Harvest', coffee.harvest],
  ];

  return (
    <>
      <div className="container">
        <nav aria-label="Breadcrumb" className="breadcrumb breadcrumb-top">
          <Link to="/">Home</Link> <span aria-hidden="true">/</span> <Link to="/shop">Shop</Link>{' '}
          <span aria-hidden="true">/</span> <span aria-current="page">{coffee.name}</span>
        </nav>
      </div>
      <section className="container product-layout">
        <div className="gallery">
          <div className="gallery-main">
            <img src={main.src} alt={main.alt} width={main.width} height={main.height} data-testid="gallery-main" />
          </div>
          <div className="gallery-thumbs" role="group" aria-label="Product photos">
            {gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                className="gallery-thumb"
                aria-pressed={i === image}
                aria-label={`Show photo ${i + 1}: ${g.alt}`}
                onClick={() => setImage(i)}
                data-testid={`gallery-thumb-${i}`}
              >
                <img src={g.src} alt="" width={g.width} height={g.height} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="eyebrow">
            {coffee.country === 'Blend' ? 'House blend' : `${coffee.country} · ${coffee.region.split(',')[0]}`}
          </p>
          <h1 className="product-title">{coffee.name}</h1>
          <p className="product-short">{coffee.short}</p>
          <ul className="tasting" aria-label="Tasting notes">
            {coffee.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <RoastMeter level={coffee.roast} />

          <p className="product-price" data-testid="product-price">
            {formatGBP(unit * qty)}
            {qty > 1 && <span className="muted small"> ({formatGBP(unit)} each)</span>}
          </p>

          <form
            className="buy-form"
            onSubmit={(e) => {
              e.preventDefault();
              add({ slug: coffee.slug, size, grind, qty });
              setAdded(true);
            }}
          >
            <fieldset className="field">
              <legend>Size</legend>
              <div className="segmented">
                {(
                  [
                    ['250g', '250 g', coffee.price],
                    ['1kg', '1 kg', coffee.priceKg],
                  ] as const
                ).map(([v, label, price]) => (
                  <label key={v} className="segment" data-testid={`size-${v}`}>
                    <input type="radio" name="size" value={v} checked={size === v} onChange={() => setSize(v)} />
                    <span>
                      {label}
                      <small>{formatGBP(price)}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field-row">
              <div className="field">
                <label htmlFor="grind">Grind</label>
                <select id="grind" value={grind} onChange={(e) => setGrind(e.target.value)} data-testid="grind-select">
                  {GRINDS.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <span className="field-label" id="qty-label">
                  Quantity
                </span>
                <div className="stepper" role="group" aria-labelledby="qty-label">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    data-testid="qty-decrease"
                  >
                    <MinusIcon width={18} height={18} />
                  </button>
                  <output aria-live="polite" data-testid="qty-value">
                    {qty}
                  </output>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    data-testid="qty-increase"
                  >
                    <PlusIcon width={18} height={18} />
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="button button-block button-large" data-testid="add-to-bag">
              Add to bag — {formatGBP(unit * qty)}
            </button>
            <p className={`added-note${added ? ' visible' : ''}`} role="status" data-testid="added-note">
              {added && (
                <>
                  <CheckIcon width={18} height={18} /> Added {qty} × {coffee.name} ({size === '1kg' ? '1 kg' : '250 g'},{' '}
                  {grind.toLowerCase()}) to your bag.
                </>
              )}
            </p>
          </form>

          <ul className="ship-notes">
            <li>Roasted {ROAST_CALENDAR.next} if you order today</li>
            <li>Free UK delivery on orders over £30</li>
            <li>
              Or <Link to="/subscribe">subscribe</Link> from {formatGBP(Math.round(coffee.price * 0.88 * 100) / 100)} a bag
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container product-details">
          <div className="product-story">
            <h2>About this coffee</h2>
            {coffee.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div>
            <h2>Origin</h2>
            <table className="facts-table" data-testid="origin-facts">
              <tbody>
                {facts.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-tinted" aria-labelledby="brew-title">
        <div className="container brew-layout">
          <div>
            <p className="eyebrow">Brewing guide</p>
            <h2 id="brew-title">How we brew {coffee.name}</h2>
            <p className="muted">
              Recipes from our bar, written for this roast. Use filtered water and weigh everything if you can — a £15
              kitchen scale makes more difference than a new brewer.
            </p>
          </div>
          <BrewTabs coffee={coffee} />
        </div>
      </section>

      <section className="section" aria-labelledby="related-title">
        <div className="container">
          <div className="section-head split">
            <h2 id="related-title">You might also like</h2>
            <Link to="/shop" className="text-link">
              All coffees
            </Link>
          </div>
          <div className="product-grid">
            {related.map((c) => (
              <ProductCard key={c.slug} coffee={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
