import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { EmptyState, PageHeader, Photo } from '../components/ui';
import { AISLES, AISLE_ORDER, type Aisle } from '../data/recipes';
import { plural } from '../format';
import { useStore } from '../store';
import { useTitle } from '../useTitle';

export default function Shopping() {
  useTitle('Shopping list — Panful');
  const { shopping, toggleItem, removeItem, addItem, clearChecked, toast } = useStore();
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [aisle, setAisle] = useState<Aisle>('v');
  const [error, setError] = useState('');
  const [hideChecked, setHideChecked] = useState(false);

  const done = shopping.filter((i) => i.checked).length;
  const pct = shopping.length ? Math.round((done / shopping.length) * 100) : 0;
  const visible = hideChecked ? shopping.filter((i) => !i.checked) : shopping;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) {
      setError('Enter an item to add, for example “Oat milk”.');
      document.getElementById('add-item')?.focus();
      return;
    }
    if (shopping.some((i) => i.name.toLowerCase() === n.toLowerCase())) {
      setError(`“${n}” is already on your list.`);
      document.getElementById('add-item')?.focus();
      return;
    }
    addItem({ name: n.charAt(0).toUpperCase() + n.slice(1), qty: qty.trim() || '1', aisle });
    toast(`Added ${n.toLowerCase()} to ${AISLES[aisle].toLowerCase()}`);
    setName('');
    setQty('');
    setError('');
  };

  return (
    <div className="page">
      <PageHeader
        eyebrow="For 26 October – 1 November"
        title="Shopping list"
        actions={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => toast('List sent to Tom’s phone')} data-testid="share-list">
              <Icon name="share" size={18} /> Send to Tom
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={!done}
              data-testid="clear-checked"
              onClick={() => {
                const n = clearChecked();
                toast(`Cleared ${plural(n, 'checked item')}`);
              }}
            >
              <Icon name="trash" size={18} /> Clear checked
            </button>
          </>
        }
      >
        Built from this week’s meal plan. Store-cupboard staples like oil, salt and spices are left off.
      </PageHeader>

      <div className="shop-layout">
        <div className="shop-main">
          <section className="card progress-card" aria-label="Progress">
            <div className="progress-card-top">
              <p data-testid="shopping-progress">
                <strong>{done}</strong> of {plural(shopping.length, 'item')} picked up
              </p>
              <label className="inline-check">
                <input type="checkbox" checked={hideChecked} onChange={(e) => setHideChecked(e.target.checked)} data-testid="hide-checked" />
                <span className="checkbox" aria-hidden="true">
                  <Icon name="check" size={14} />
                </span>
                Hide checked
              </label>
            </div>
            <div className="progress progress-lg" role="progressbar" aria-label="Items picked up" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${pct}%` }} />
            </div>
          </section>

          {visible.length === 0 ? (
            <EmptyState
              icon="basket"
              title={shopping.length ? 'Everything’s in the trolley' : 'Your list is empty'}
              action={
                <Link to="/plan" className="btn btn-secondary">
                  Go to meal plan
                </Link>
              }
            >
              {shopping.length ? 'All items are checked off. Nice work.' : 'Generate a list from your meal plan, or add items one by one.'}
            </EmptyState>
          ) : (
            AISLE_ORDER.filter((a) => visible.some((i) => i.aisle === a)).map((a) => {
              const items = visible.filter((i) => i.aisle === a);
              const left = items.filter((i) => !i.checked).length;
              return (
                <section key={a} className="card aisle" aria-labelledby={`aisle-${a}`}>
                  <header className="aisle-head">
                    <h2 id={`aisle-${a}`}>{AISLES[a]}</h2>
                    <span className="muted small">{left ? `${left} to get` : 'All done'}</span>
                  </header>
                  <ul className="shop-list">
                    {items.map((i) => (
                      <li key={i.id} className={`shop-item ${i.checked ? 'is-checked' : ''}`}>
                        <label className="shop-check">
                          <input type="checkbox" checked={i.checked} onChange={() => toggleItem(i.id)} data-testid={`shopping-item-${i.id}`} />
                          <span className="checkbox" aria-hidden="true">
                            <Icon name="check" size={14} />
                          </span>
                          <span className="shop-text">
                            <span className="shop-name">{i.name}</span>
                            {i.from && <span className="shop-from">{i.from}</span>}
                          </span>
                        </label>
                        <span className="shop-qty">{i.qty}</span>
                        <button type="button" className="icon-btn icon-btn-sm" onClick={() => removeItem(i.id)} aria-label={`Remove ${i.name}`} data-testid={`remove-item-${i.id}`}>
                          <Icon name="x" size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })
          )}
        </div>

        <aside className="shop-aside">
          <section className="card" aria-labelledby="add-title">
            <h2 id="add-title" className="card-title-lg">
              Add an item
            </h2>
            <form onSubmit={onSubmit} noValidate className="add-form">
              <div className={`field ${error ? 'has-error' : ''}`}>
                <label htmlFor="add-item" className="field-label">
                  Item
                </label>
                <input
                  id="add-item"
                  type="text"
                  value={name}
                  placeholder="e.g. Oat milk"
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'add-item-error' : undefined}
                  data-testid="add-item-input"
                />
                {error && (
                  <p className="field-error" id="add-item-error" data-testid="add-item-error">
                    <Icon name="alert" size={16} /> {error}
                  </p>
                )}
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="add-qty" className="field-label">
                    Quantity <span className="optional">optional</span>
                  </label>
                  <input id="add-qty" type="text" value={qty} placeholder="1 litre" onChange={(e) => setQty(e.target.value)} data-testid="add-item-qty" />
                </div>
                <div className="field">
                  <label htmlFor="add-aisle" className="field-label">
                    Aisle
                  </label>
                  <div className="select-wrap">
                    <select id="add-aisle" value={aisle} onChange={(e) => setAisle(e.target.value as Aisle)} data-testid="add-item-aisle">
                      {AISLE_ORDER.map((a) => (
                        <option key={a} value={a}>
                          {AISLES[a]}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronDown" size={16} />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block" data-testid="add-item-submit">
                <Icon name="plus" size={18} /> Add to list
              </button>
            </form>
          </section>

          <section className="card store-card">
            <Photo name="grocery-veg" className="store-photo" />
            <div className="store-body">
              <h2 className="card-title">Shopping in store?</h2>
              <p className="muted small">Your list is sorted in the order most UK supermarkets lay out their aisles, starting with fruit and veg.</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
