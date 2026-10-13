import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import ProductImage from '../components/ProductImage';
import { categories, categoryLabel, formatPrice, products, type CategoryId, type Product } from '../data/products';

type CategoryFilter = 'all' | CategoryId;
type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
];

const FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...categories.map((category) => ({ value: category.id, label: category.label })),
];

function parseCategory(value: string | null): CategoryFilter {
  return categories.some((category) => category.id === value) ? (value as CategoryId) : 'all';
}

function parseSort(value: string | null): SortKey {
  return SORT_OPTIONS.some((option) => option.value === value) ? (value as SortKey) : 'featured';
}

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
      return copy;
  }
}

export default function ProductsPage() {
  // Filters are mirrored to the URL so a filtered view can be linked and captured. Local state
  // drives the controls so they update immediately (router navigation runs in a transition).
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = parseCategory(searchParams.get('category'));
  const urlSort = parseSort(searchParams.get('sort'));
  const urlInStockOnly = searchParams.get('stock') === 'in';
  const [category, setCategory] = useState<CategoryFilter>(urlCategory);
  const [sort, setSort] = useState<SortKey>(urlSort);
  const [inStockOnly, setInStockOnly] = useState(urlInStockOnly);

  // Follow URL changes that come from elsewhere (links, back/forward).
  useEffect(() => {
    setCategory(urlCategory);
    setSort(urlSort);
    setInStockOnly(urlInStockOnly);
  }, [urlCategory, urlSort, urlInStockOnly]);

  const visible = useMemo(() => {
    const filtered = products.filter(
      (product) => (category === 'all' || product.category === category) && (!inStockOnly || product.inStock),
    );
    return sortProducts(filtered, sort);
  }, [category, sort, inStockOnly]);

  function updateParam(key: string, value: string | null) {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (value === null) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  }

  function selectCategory(value: CategoryFilter) {
    setCategory(value);
    updateParam('category', value === 'all' ? null : value);
  }

  function selectSort(value: SortKey) {
    setSort(value);
    updateParam('sort', value === 'featured' ? null : value);
  }

  function toggleInStock(checked: boolean) {
    setInStockOnly(checked);
    updateParam('stock', checked ? 'in' : null);
  }

  function clearFilters() {
    setCategory('all');
    setSort('featured');
    setInStockOnly(false);
    setSearchParams(new URLSearchParams(), { replace: true });
  }

  const countLabel = visible.length === 1 ? '1 product' : `${visible.length} products`;

  return (
    <>
      <div className="page-header">
        <h1>Shop all goods</h1>
        <p className="muted">Durable bags, clothing and kitchen goods made to be used every day.</p>
      </div>

      <section className="panel" aria-labelledby="catalog-heading">
        <h2 id="catalog-heading" className="visually-hidden">
          Products
        </h2>
        <div className="toolbar">
          <div className="chip-group" role="group" aria-label="Filter by category">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className="chip"
                aria-pressed={category === filter.value}
                onClick={() => selectCategory(filter.value)}
                data-testid={`category-filter-${filter.value}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="toolbar-controls">
            <label className="field-inline">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => toggleInStock(event.target.checked)}
                data-testid="in-stock-toggle"
              />
              In stock only
            </label>
            <div className="field-inline">
              <label htmlFor="sort-select">Sort by</label>
              <select
                id="sort-select"
                className="select"
                value={sort}
                onChange={(event) => selectSort(parseSort(event.target.value))}
                data-testid="sort-select"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="muted small" role="status" data-testid="result-count">
          Showing {countLabel}
        </p>

        {visible.length === 0 ? (
          <div className="empty-state" data-testid="products-empty">
            <h3>No products match these filters</h3>
            <p className="muted">Try another category or include items that are out of stock.</p>
            <button type="button" className="button" onClick={clearFilters} data-testid="clear-filters">
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="product-grid" data-testid="product-grid">
            {visible.map((product) => (
              <li key={product.slug} className="product-card" data-testid="product-card">
                <ProductImage product={product} />
                <div className="product-card-body">
                  <p className="muted small">{categoryLabel(product.category)}</p>
                  <h3 className="product-card-title">
                    <Link to={`/products/${product.slug}`} className="product-link" data-testid="product-link">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="small">{product.summary}</p>
                  <p className="product-card-meta">
                    <span className="price" data-testid="product-price">
                      {formatPrice(product.price)}
                    </span>
                    {!product.inStock && (
                      <span className="tag tag-muted" data-testid="sold-out-tag">
                        Sold out
                      </span>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
