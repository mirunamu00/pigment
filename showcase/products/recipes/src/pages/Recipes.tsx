import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Icon } from '../components/Icon';
import { EmptyState, PageHeader, RecipeCard } from '../components/ui';
import { RECIPES, totalTime, type Recipe } from '../data/recipes';
import { plural } from '../format';
import { useStore } from '../store';
import { useTitle } from '../useTitle';

type Group = 'diet' | 'time' | 'cuisine' | 'type';
interface Chip {
  id: string;
  label: string;
  group: Group;
  test: (r: Recipe) => boolean;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-');
const cuisines = ['Italian', 'Mexican', 'Indian', 'British', 'French', 'Asian', 'Middle Eastern', 'American'];

const CHIPS: Chip[] = [
  { id: 'vegetarian', label: 'Vegetarian', group: 'diet', test: (r) => r.diets.includes('vegetarian') },
  { id: 'vegan', label: 'Vegan', group: 'diet', test: (r) => r.diets.includes('vegan') },
  { id: 'pescatarian', label: 'Pescatarian', group: 'diet', test: (r) => r.diets.includes('pescatarian') },
  { id: 'under-30', label: 'Under 30 min', group: 'time', test: (r) => totalTime(r) <= 30 },
  { id: 'under-60', label: 'Under 1 hour', group: 'time', test: (r) => totalTime(r) <= 60 },
  ...cuisines.map((c) => ({ id: slug(c), label: c, group: 'cuisine' as const, test: (r: Recipe) => r.cuisine === c })),
  { id: 'batch-cook', label: 'Batch-cook', group: 'type', test: (r) => r.tags.includes('Batch-cook') },
  { id: 'family', label: 'Family-friendly', group: 'type', test: (r) => r.tags.includes('Family') },
  { id: 'freezer', label: 'Freezes well', group: 'type', test: (r) => r.tags.includes('Freezer-friendly') },
];

const GROUPS: { id: Group; label: string }[] = [
  { id: 'diet', label: 'Diet' },
  { id: 'time', label: 'Time' },
  { id: 'cuisine', label: 'Cuisine' },
  { id: 'type', label: 'Good for' },
];

const SORTS = {
  popular: { label: 'Most popular', fn: (a: Recipe, b: Recipe) => b.popularity - a.popularity },
  rating: { label: 'Highest rated', fn: (a: Recipe, b: Recipe) => b.rating - a.rating || b.ratings - a.ratings },
  quickest: { label: 'Quickest first', fn: (a: Recipe, b: Recipe) => totalTime(a) - totalTime(b) },
  az: { label: 'A–Z', fn: (a: Recipe, b: Recipe) => a.title.localeCompare(b.title) },
};
type SortKey = keyof typeof SORTS;

export default function Recipes() {
  useTitle('Recipes — Panful');
  const [params, setParams] = useSearchParams();
  const { saved } = useStore();
  const q = (params.get('q') ?? '').trim().toLowerCase();
  const savedOnly = params.get('saved') === '1';
  const [active, setActive] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('popular');

  const toggle = (c: Chip) =>
    setActive((a) => {
      if (a.includes(c.id)) return a.filter((x) => x !== c.id);
      const cleared = c.group === 'time' ? a.filter((x) => CHIPS.find((y) => y.id === x)?.group !== 'time') : a;
      return [...cleared, c.id];
    });

  const results = useMemo(() => {
    const chips = CHIPS.filter((c) => active.includes(c.id));
    return RECIPES.filter((r) => {
      if (savedOnly && !saved.includes(r.slug)) return false;
      if (q) {
        const hay = `${r.title} ${r.cuisine} ${r.tags.join(' ')} ${r.ingredients.map((i) => i[2]).join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return GROUPS.every((g) => {
        const inGroup = chips.filter((c) => c.group === g.id);
        return inGroup.length === 0 || inGroup.some((c) => c.test(r));
      });
    }).sort(SORTS[sort].fn);
  }, [active, q, savedOnly, saved, sort]);

  const clearAll = () => {
    setActive([]);
    const next = new URLSearchParams(params);
    next.delete('q');
    next.delete('saved');
    setParams(next);
  };
  const setSaved = (on: boolean) => {
    const next = new URLSearchParams(params);
    if (on) next.set('saved', '1');
    else next.delete('saved');
    setParams(next, { replace: true });
  };
  const anyFilter = active.length > 0 || q || savedOnly;

  return (
    <div className="page">
      <PageHeader eyebrow="Browse" title="Recipes">
        Tested in our kitchen and scaled for your household of three. Nut-free recipes are marked automatically.
      </PageHeader>

      <div className="segmented" role="tablist" aria-label="Recipe collection">
        <button type="button" role="tab" aria-selected={!savedOnly} className="segmented-btn" onClick={() => setSaved(false)} data-testid="collection-all">
          All recipes <span className="count">{RECIPES.length}</span>
        </button>
        <button type="button" role="tab" aria-selected={savedOnly} className="segmented-btn" onClick={() => setSaved(true)} data-testid="collection-saved">
          <Icon name="heart" size={16} /> Saved <span className="count">{saved.length}</span>
        </button>
      </div>

      <section className="filters card" aria-label="Filters">
        {GROUPS.map((g) => (
          <div key={g.id} className="filter-group" role="group" aria-labelledby={`fg-${g.id}`}>
            <span className="filter-label" id={`fg-${g.id}`}>
              {g.label}
            </span>
            <div className="chips">
              {CHIPS.filter((c) => c.group === g.id).map((c) => {
                const on = active.includes(c.id);
                return (
                  <button key={c.id} type="button" className={`chip ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => toggle(c)} data-testid={`filter-chip-${c.id}`}>
                    {on && <Icon name="check" size={14} />}
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <div className="results-bar">
        <p className="results-count" aria-live="polite" data-testid="results-count">
          <strong>{plural(results.length, 'recipe')}</strong>
          {q && (
            <>
              {' '}
              matching “{params.get('q')}”
            </>
          )}
          {anyFilter && (
            <button type="button" className="text-btn" onClick={clearAll} data-testid="clear-filters">
              Clear all
            </button>
          )}
        </p>
        <div className="sort">
          <label htmlFor="sort">Sort by</label>
          <div className="select-wrap">
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} data-testid="sort-select">
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" size={16} />
          </div>
        </div>
      </div>

      {results.length ? (
        <div className="card-grid cols-auto">
          {results.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title={savedOnly && !active.length && !q ? 'No saved recipes yet' : 'No recipes match those filters'}
          action={
            <button type="button" className="btn btn-secondary" onClick={clearAll} data-testid="empty-clear-filters">
              Clear filters
            </button>
          }
        >
          {savedOnly && !active.length && !q
            ? 'Tap the heart on any recipe to keep it here.'
            : 'Try removing a filter or searching for an ingredient instead — “spinach”, “chickpeas” or “feta”.'}
        </EmptyState>
      )}
    </div>
  );
}
