import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { linePrice, useCart } from '../cart';
import { findCoffee, formatGBP } from '../data/coffees';
import { photo } from '../data/photos';
import { CloseIcon, MinusIcon, PlusIcon } from './Icons';

const FREE_DELIVERY = 30;

export default function CartDrawer() {
  const { lines, open, setOpen, subtotal, setQty, remove, count } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open, setOpen]);

  if (!open) return null;
  const toFree = Math.max(0, FREE_DELIVERY - subtotal);

  return (
    <div className="drawer-backdrop" onClick={() => setOpen(false)}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(e) => e.stopPropagation()}
        data-testid="cart-drawer"
      >
        <div className="drawer-head">
          <h2 id="cart-title">
            Your bag <span className="muted">({count})</span>
          </h2>
          <button ref={closeRef} type="button" className="icon-button" aria-label="Close bag" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your bag is empty.</p>
            <Link to="/shop" className="button" onClick={() => setOpen(false)}>
              Browse coffees
            </Link>
          </div>
        ) : (
          <>
            <div className="delivery-meter">
              <p>
                {toFree > 0 ? (
                  <>
                    You’re <strong>{formatGBP(toFree)}</strong> away from free delivery.
                  </>
                ) : (
                  <>You’ve unlocked free UK delivery.</>
                )}
              </p>
              <div className="meter" aria-hidden="true">
                <span style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY) * 100)}%` }} />
              </div>
            </div>
            <ul className="drawer-lines">
              {lines.map((l, i) => {
                const c = findCoffee(l.slug);
                if (!c) return null;
                const p = photo(c.photo);
                return (
                  <li key={`${l.slug}-${l.size}-${l.grind}`} className="drawer-line">
                    <img src={p.src} alt="" width={72} height={72} />
                    <div className="drawer-line-body">
                      <p className="drawer-line-name">{c.name}</p>
                      <p className="muted small">
                        {l.size === '1kg' ? '1 kg' : '250 g'} · {l.grind}
                      </p>
                      <div className="drawer-line-row">
                        <div className="stepper stepper-small">
                          <button type="button" aria-label={`Decrease ${c.name}`} onClick={() => setQty(i, l.qty - 1)}>
                            <MinusIcon width={16} height={16} />
                          </button>
                          <span aria-live="polite">{l.qty}</span>
                          <button type="button" aria-label={`Increase ${c.name}`} onClick={() => setQty(i, l.qty + 1)}>
                            <PlusIcon width={16} height={16} />
                          </button>
                        </div>
                        <button type="button" className="link-button small" onClick={() => remove(i)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="drawer-line-price">{formatGBP(linePrice(l))}</p>
                  </li>
                );
              })}
            </ul>
            <div className="drawer-foot">
              <div className="drawer-total">
                <span>Subtotal</span>
                <strong>{formatGBP(subtotal)}</strong>
              </div>
              <p className="muted small">Delivery calculated at checkout. Royal Mail Tracked 48 from £3.95.</p>
              <button type="button" className="button button-block" data-testid="checkout">
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
