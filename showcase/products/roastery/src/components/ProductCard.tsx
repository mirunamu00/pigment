import { Link } from 'react-router';
import { ROAST_LABELS, formatGBP, type Coffee, type RoastLevel } from '../data/coffees';
import { photo } from '../data/photos';

export function RoastMeter({ level, compact = false }: { level: RoastLevel; compact?: boolean }) {
  return (
    <div className={`roast-meter${compact ? ' compact' : ''}`} role="img" aria-label={`Roast: ${ROAST_LABELS[level]}, ${level} of 5`}>
      <span className="roast-dots" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= level ? 'on' : ''} />
        ))}
      </span>
      <span className="roast-label">
        {ROAST_LABELS[level]}
        {compact ? '' : ' roast'}
      </span>
    </div>
  );
}

export default function ProductCard({ coffee }: { coffee: Coffee }) {
  const p = photo(coffee.photo);
  return (
    <article className="product-card" data-testid={`product-card-${coffee.slug}`}>
      <div className="product-card-media">
        <img src={p.src} alt={p.alt} width={p.width} height={p.height} />
        {coffee.tag && <span className="badge">{coffee.tag}</span>}
      </div>
      <div className="product-card-body">
        <p className="eyebrow">
          {coffee.country === 'Blend' ? 'House blend · Two origins' : `${coffee.country} · ${coffee.process.split(',')[0]}`}
        </p>
        <h3 className="product-card-title">
          <Link to={`/shop/${coffee.slug}`}>{coffee.name}</Link>
        </h3>
        <p className="notes">{coffee.notes.join(' · ')}</p>
        <div className="product-card-foot">
          <RoastMeter level={coffee.roast} compact />
          <p className="price">
            <span className="visually-hidden">From </span>
            {formatGBP(coffee.price)}
            <span className="muted small"> / 250 g</span>
          </p>
        </div>
      </div>
    </article>
  );
}
