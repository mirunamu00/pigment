import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useCart } from '../cart/CartContext';
import ProductImage from '../components/ProductImage';
import QuantityStepper from '../components/QuantityStepper';
import { categoryLabel, findProduct, formatPrice, type Product } from '../data/products';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = findProduct(slug);

  if (!product) {
    return (
      <div className="empty-state" data-testid="product-not-found">
        <h1>Product not found</h1>
        <p className="muted">We could not find a product called “{slug}”.</p>
        <Link to="/">Back to the shop</Link>
      </div>
    );
  }

  return <ProductDetail key={product.slug} product={product} />;
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variant, setVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState('');

  function handleAdd() {
    addItem(product.slug, variant, quantity);
    const units = quantity === 1 ? '1 item' : `${quantity} items`;
    setConfirmation(`Added ${units} (${product.name}, ${variant}) to your cart.`);
    setQuantity(1);
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to={`/?category=${product.category}`}>{categoryLabel(product.category)}</Link>
          </li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <article className="product-detail">
        <ProductImage product={product} size="large" />

        <div className="product-detail-info">
          <h1 data-testid="product-title">{product.name}</h1>
          <p className="price price-large" data-testid="product-detail-price">
            {formatPrice(product.price)}
          </p>
          <p>{product.description}</p>

          <form
            className="purchase-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (product.inStock) handleAdd();
            }}
          >
            <fieldset className="variant-fieldset">
              <legend className="field-label">{product.variantLabel}</legend>
              <div className="variant-options">
                {product.variants.map((option) => {
                  const optionId = `variant-${slugify(option)}`;
                  return (
                    <label key={option} htmlFor={optionId} className="variant-option">
                      <input
                        id={optionId}
                        type="radio"
                        name="variant"
                        value={option}
                        checked={variant === option}
                        onChange={() => setVariant(option)}
                        data-testid={`variant-option-${slugify(option)}`}
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <QuantityStepper
              id="product-quantity"
              label="Quantity"
              value={quantity}
              onChange={setQuantity}
              testIdPrefix="quantity"
            />

            {product.inStock ? (
              <button type="submit" className="button button-primary" data-testid="add-to-cart">
                Add to cart
              </button>
            ) : (
              <>
                <button type="submit" className="button button-primary" disabled data-testid="add-to-cart">
                  Sold out
                </button>
                <p className="muted small" data-testid="stock-note">
                  This item is out of stock. Check back soon.
                </p>
              </>
            )}
          </form>

          <div role="status" className="added-message" data-testid="added-message">
            {confirmation && (
              <p>
                {confirmation} <Link to="/cart">View cart</Link>
              </p>
            )}
          </div>

          <h2>Details</h2>
          <ul className="detail-list">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}
