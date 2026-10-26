import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { CloseIcon } from '../components/Icons';
import Img from '../components/Img';
import ProductCard from '../components/ProductCard';
import { ORIGINS, ROAST_CALENDAR, coffees, roastGroup, type RoastGroup } from '../data/coffees';
import { useTitle } from '../useTitle';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'roast-asc' | 'roast-desc';

const ROASTS: { id: RoastGroup; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'medium', label: 'Medium' },
  { id: 'dark', label: 'Medium–dark & dark' },
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function Shop() {
  useTitle('Shop coffee — Kiln Street Coffee');
  const [origins, setOrigins] = useState<string[]>([]);
  const [roasts, setRoasts] = useState<RoastGroup[]>([]);
  const [sort, setSort] = useState<Sort>('featured');

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const results = useMemo(() => {
    const list = coffees.filter(
      (c) => (origins.length === 0 || origins.includes(c.country)) && (roasts.length === 0 || roasts.includes(roastGroup(c.roast))),
    );
    const sorted = [...list];
    if (sort === 'featured') sorted.sort((a, b) => a.order - b.order);
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'roast-asc') sorted.sort((a, b) => a.roast - b.roast || a.order - b.order);
    if (sort === 'roast-desc') sorted.sort((a, b) => b.roast - a.roast || a.order - b.order);
    return sorted;
  }, [origins, roasts, sort]);

  const activeCount = origins.length + roasts.length;
  const clear = () => {
    setOrigins([]);
    setRoasts([]);
  };

  return (
    <>
      <section className="page-head">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Shop</span>
          </nav>
          <h1>Shop coffee</h1>
          <p className="lede">
            Ten coffees from seven countries, all roasted to order. Last roast {ROAST_CALENDAR.last} — {ROAST_CALENDAR.dispatch.toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter coffees">
            <div className="filter-group">
              <p className="filter-label" id="origin-label">
                Origin
              </p>
              <div className="chips" role="group" aria-labelledby="origin-label">
                <button
                  type="button"
                  className="chip"
                  aria-pressed={origins.length === 0}
                  onClick={() => setOrigins([])}
                  data-testid="filter-chip-all"
                >
                  All origins
                </button>
                {ORIGINS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    className="chip"
                    aria-pressed={origins.includes(o)}
                    onClick={() => setOrigins((l) => toggle(l, o))}
                    data-testid={`filter-chip-${slugify(o)}`}
                  >
                    {o === 'Blend' ? 'House blend' : o}
                    <span className="chip-count">{coffees.filter((c) => c.country === o).length}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <p className="filter-label" id="roast-label">
                Roast
              </p>
              <div className="chips" role="group" aria-labelledby="roast-label">
                {ROASTS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className="chip"
                    aria-pressed={roasts.includes(r.id)}
                    onClick={() => setRoasts((l) => toggle(l, r.id))}
                    data-testid={`filter-chip-${r.id}`}
                  >
                    <span className={`chip-swatch roast-${r.id}`} aria-hidden="true" />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="toolbar">
            <p className="result-count" aria-live="polite" data-testid="result-count">
              <span>
                Showing <strong>{results.length}</strong> of {coffees.length} coffees
              </span>
              {activeCount > 0 && (
                <button type="button" className="link-button clear-filters" onClick={clear} data-testid="clear-filters">
                  <CloseIcon width={14} height={14} /> Clear filters
                </button>
              )}
            </p>
            <label className="sort">
              <span>Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} data-testid="sort-select">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="roast-asc">Roast: light to dark</option>
                <option value="roast-desc">Roast: dark to light</option>
              </select>
            </label>
          </div>

          {results.length > 0 ? (
            <div className="product-grid shop-grid" data-testid="product-grid">
              {results.map((c) => (
                <ProductCard key={c.slug} coffee={c} />
              ))}
              {activeCount === 0 && (
                <aside className="grid-promo" aria-labelledby="grid-promo-title">
                  <Img name="brew-drip" className="grid-promo-image" />
                  <div className="grid-promo-body">
                    <p className="eyebrow">Roaster’s Choice</p>
                    <h2 id="grid-promo-title">Can’t decide? Let us pick.</h2>
                    <p>A different single origin every delivery, chosen from whatever is tasting best that week. From £9.15 a bag.</p>
                    <Link to="/subscribe" className="button button-light">
                      See subscriptions
                    </Link>
                  </div>
                </aside>
              )}
            </div>
          ) : (
            <div className="empty-state" data-testid="empty-state">
              <h2>No coffees match those filters</h2>
              <p className="muted">Try another origin or roast — or let us choose for you with a Roaster’s Choice subscription.</p>
              <button type="button" className="button button-outline" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container promo-row">
          <div className="promo">
            <h2>Buying for a café or office?</h2>
            <p>We supply 31 cafés and workplaces with weekly deliveries, equipment advice and barista training at the roastery.</p>
            <a href="mailto:wholesale@kilnstreet.coffee" className="button">
              Talk to wholesale
            </a>
          </div>
          <ul className="assurances">
            <li>
              <strong>Roasted to order</strong>
              <span>Nothing sits on a shelf. Your bag is roasted on the next roast day.</span>
            </li>
            <li>
              <strong>Free delivery over £30</strong>
              <span>Royal Mail Tracked 48, or £3.95 for smaller orders.</span>
            </li>
            <li>
              <strong>Not for you? Tell us</strong>
              <span>If a coffee doesn’t suit, we’ll swap it for another. No forms.</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
