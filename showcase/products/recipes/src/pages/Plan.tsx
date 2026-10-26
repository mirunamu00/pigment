import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Icon } from '../components/Icon';
import { Modal, PageHeader, Photo } from '../components/ui';
import { DAYS, MEALS, TODAY, slotLabel } from '../data/household';
import { RECIPES, getRecipe, totalTime } from '../data/recipes';
import { minutes, plural } from '../format';
import { useStore } from '../store';
import { useTitle } from '../useTitle';

function Slot({ slotKey, onAdd, onMove }: { slotKey: string; onAdd: (k: string) => void; onMove: (k: string) => void }) {
  const { plan, setSlot, toast } = useStore();
  const r = getRecipe(plan[slotKey] ?? '');
  if (!r)
    return (
      <button type="button" className="slot slot-empty" onClick={() => onAdd(slotKey)} data-testid={`plan-slot-${slotKey}`} aria-label={`Add a recipe to ${slotLabel(slotKey)}`}>
        <Icon name="plus" size={20} />
        <span>Add</span>
      </button>
    );
  return (
    <div className="slot slot-filled" data-testid={`plan-slot-${slotKey}`}>
      <Link to={`/recipes/${r.slug}`} className="slot-link">
        <span className="slot-media">
          <Photo name={r.photo} />
        </span>
        <span className="slot-title">{r.title}</span>
        <span className="slot-meta">
          <Icon name="clock" size={13} /> {minutes(totalTime(r))}
        </span>
      </Link>
      <div className="slot-actions">
        <button type="button" className="slot-action" onClick={() => onMove(slotKey)} aria-label={`Move ${r.title}`} data-testid={`slot-move-${slotKey}`}>
          <Icon name="move" size={15} />
        </button>
        <button
          type="button"
          className="slot-action"
          onClick={() => {
            setSlot(slotKey, null);
            toast(`Removed ${r.title.toLowerCase()} from ${slotLabel(slotKey)}`);
          }}
          aria-label={`Remove ${r.title} from ${slotLabel(slotKey)}`}
          data-testid={`slot-remove-${slotKey}`}
        >
          <Icon name="x" size={15} />
        </button>
      </div>
    </div>
  );
}

function Picker({ slotKey, onClose }: { slotKey: string; onClose: () => void }) {
  const { setSlot, toast } = useStore();
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const meal = slotKey.endsWith('lunch') ? 'Lunch' : 'Dinner';
    return RECIPES.filter((r) => !s || r.title.toLowerCase().includes(s) || r.cuisine.toLowerCase().includes(s)).sort(
      (a, b) => Number(b.course === meal) - Number(a.course === meal) || b.popularity - a.popularity,
    );
  }, [q, slotKey]);
  return (
    <Modal title={`Add to ${slotLabel(slotKey)}`} onClose={onClose} testid="recipe-picker">
      <div className="picker-search search">
        <Icon name="search" size={18} className="search-icon" />
        <label htmlFor="picker-q" className="sr-only">
          Search recipes
        </label>
        <input id="picker-q" type="search" placeholder="Search your recipes" value={q} onChange={(e) => setQ(e.target.value)} data-testid="picker-search" />
      </div>
      {list.length ? (
        <ul className="picker-list">
          {list.map((r) => (
            <li key={r.slug}>
              <button
                type="button"
                className="picker-item"
                data-testid={`picker-recipe-${r.slug}`}
                onClick={() => {
                  setSlot(slotKey, r.slug);
                  toast(`Added ${r.title.toLowerCase()} to ${slotLabel(slotKey)}`);
                  onClose();
                }}
              >
                <Photo name={r.photo} className="picker-thumb" />
                <span className="picker-text">
                  <strong>{r.title}</strong>
                  <span className="muted small">
                    {r.cuisine} · {minutes(totalTime(r))} · {r.difficulty}
                  </span>
                </span>
                <Icon name="plus" size={18} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted picker-empty">No recipes called “{q}”. Try a cuisine like “Italian”.</p>
      )}
    </Modal>
  );
}

function MoveDialog({ from, onClose }: { from: string; onClose: () => void }) {
  const { plan, moveSlot, toast } = useStore();
  const r = getRecipe(plan[from] ?? '')!;
  const [to, setTo] = useState<string | null>(null);
  const target = to ? getRecipe(plan[to] ?? '') : undefined;
  return (
    <Modal
      title={`Move ${r.title.toLowerCase()}`}
      onClose={onClose}
      testid="move-dialog"
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!to}
            data-testid="move-confirm"
            onClick={() => {
              if (!to) return;
              moveSlot(from, to);
              toast(target ? `Swapped with ${slotLabel(to)}` : `Moved to ${slotLabel(to)}`);
              onClose();
            }}
          >
            {target ? 'Swap meals' : 'Move here'}
          </button>
        </>
      }
    >
      <p className="muted">Pick a new slot. If it already has a meal, the two will swap.</p>
      <div className="move-grid" role="radiogroup" aria-label="New slot">
        <span />
        {MEALS.map((m) => (
          <span key={m.id} className="move-head">
            {m.label}
          </span>
        ))}
        {DAYS.map((d) => (
          <div key={d.id} className="move-row">
            <span className="move-day">
              {d.short} {d.date}
            </span>
            {MEALS.map((m) => {
              const k = `${d.id}-${m.id}`;
              const here = getRecipe(plan[k] ?? '');
              const isFrom = k === from;
              return (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={to === k}
                  disabled={isFrom}
                  className={`move-cell ${to === k ? 'is-on' : ''} ${here ? 'is-busy' : ''}`}
                  onClick={() => setTo(k)}
                  data-testid={`move-to-${k}`}
                >
                  {isFrom ? 'Current' : here ? here.title : 'Free'}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default function Plan() {
  useTitle('Meal plan — Panful');
  const { plan, generateList, toast } = useStore();
  const navigate = useNavigate();
  const [adding, setAdding] = useState<string | null>(null);
  const [moving, setMoving] = useState<string | null>(null);
  const planned = Object.keys(plan).length;
  const recipes = Object.values(plan).map((s) => getRecipe(s)!).filter(Boolean);
  const kcal = Math.round(recipes.reduce((a, r) => a + r.nutrition.kcal, 0) / Math.max(1, recipes.length));
  const veg = recipes.filter((r) => r.diets.includes('vegetarian')).length;

  return (
    <div className="page">
      <PageHeader
        eyebrow="Week of 26 October – 1 November"
        title="Meal plan"
        actions={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => toast('Plan link copied — Tom can edit it too')} data-testid="share-plan">
              <Icon name="share" size={18} /> Share
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-testid="generate-list"
              onClick={() => {
                const { added, skipped } = generateList();
                toast(
                  added ? `${plural(added, 'item')} added to your shopping list · ${skipped} store-cupboard staples skipped` : 'Your shopping list already has everything for this plan',
                  { label: 'View list', to: '/shopping' },
                );
              }}
            >
              <Icon name="basket" size={18} /> Generate shopping list
            </button>
          </>
        }
      >
        {plural(planned, 'meal')} planned out of 14. Leftovers from Monday’s soup cover Thursday lunch.
      </PageHeader>

      <ul className="plan-summary">
        <li className="card">
          <span className="summary-icon">
            <Icon name="calendar" />
          </span>
          <span>
            <strong>
              {planned}
              <span className="muted"> / 14</span>
            </strong>
            <span className="muted small">meals planned</span>
          </span>
        </li>
        <li className="card">
          <span className="summary-icon">
            <Icon name="leaf" />
          </span>
          <span>
            <strong>{veg}</strong>
            <span className="muted small">vegetarian meals</span>
          </span>
        </li>
        <li className="card">
          <span className="summary-icon">
            <Icon name="flame" />
          </span>
          <span>
            <strong>
              {kcal}
              <span className="muted"> kcal</span>
            </strong>
            <span className="muted small">average per serving</span>
          </span>
        </li>
        <li className="card">
          <span className="summary-icon">
            <Icon name="users" />
          </span>
          <span>
            <strong>3</strong>
            <span className="muted small">people · nut-free</span>
          </span>
        </li>
      </ul>

      <div className="planner card" role="table" aria-label="Weekly meal plan">
        <div className="planner-row planner-head" role="row">
          <span role="columnheader" className="planner-corner">
            <span className="sr-only">Meal</span>
          </span>
          {DAYS.map((d) => (
            <span key={d.id} role="columnheader" className={`planner-day ${d.id === TODAY ? 'is-today' : ''}`}>
              <span>{d.short}</span>
              <strong>{d.date}</strong>
            </span>
          ))}
        </div>
        {MEALS.map((m) => (
          <div key={m.id} className="planner-row" role="row">
            <span role="rowheader" className="planner-meal">
              {m.label}
            </span>
            {DAYS.map((d) => (
              <div key={d.id} role="cell" className="planner-cell">
                <span className="planner-cell-label">
                  <span>{d.short}</span>
                  <span className="muted">{d.date} {d.date < 20 ? 'Nov' : 'Oct'}</span>
                  <span className="sr-only">{m.label}</span>
                </span>
                <Slot slotKey={`${d.id}-${m.id}`} onAdd={setAdding} onMove={setMoving} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <section className="card tip-card">
        <Photo name="kitchen-pans" className="tip-photo" />
        <div>
          <p className="eyebrow">Batch-cook Sunday</p>
          <h2 className="card-title-lg">Make the squash soup once, eat it twice</h2>
          <p className="muted">
            Roast the squash on Sunday afternoon while the pork is in, and you’ll have Monday and Thursday lunches sorted. It keeps for 4 days in the fridge.
          </p>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/recipes/roast-squash-ginger-soup')}>
            See the recipe
          </button>
        </div>
      </section>

      {adding && <Picker slotKey={adding} onClose={() => setAdding(null)} />}
      {moving && <MoveDialog from={moving} onClose={() => setMoving(null)} />}
    </div>
  );
}
