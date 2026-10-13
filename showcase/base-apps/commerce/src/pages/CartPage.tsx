import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { useCart } from '../cart/CartContext';
import QuantityStepper from '../components/QuantityStepper';
import { FREE_SHIPPING_THRESHOLD, formatPrice } from '../data/products';

type FieldName = 'name' | 'email' | 'address';
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_FORM: FormValues = { name: '', email: '', address: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim() === '') errors.name = 'Enter your full name.';
  if (values.email.trim() === '') errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter an email address like name@example.com.';
  if (values.address.trim() === '') errors.address = 'Enter a shipping address.';
  return errors;
}

interface Confirmation {
  name: string;
  email: string;
  itemCount: number;
  total: number;
}

export default function CartPage() {
  const cart = useCart();
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const fieldRefs = useRef<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>({
    name: null,
    email: null,
    address: null,
  });

  function updateField(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a field's message once the user starts fixing it.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (['name', 'email', 'address'] as const).find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    setConfirmation({ name: values.name.trim(), email: values.email.trim(), itemCount: cart.itemCount, total: cart.total });
    cart.clear();
    setValues(EMPTY_FORM);
  }

  if (confirmation) {
    return (
      <section className="panel confirmation" data-testid="order-confirmation" aria-labelledby="confirmation-heading">
        <h1 id="confirmation-heading">Thank you for your order</h1>
        <p>
          {confirmation.name}, we have received your order of {confirmation.itemCount}{' '}
          {confirmation.itemCount === 1 ? 'item' : 'items'} totalling{' '}
          <strong data-testid="confirmation-total">{formatPrice(confirmation.total)}</strong>.
        </p>
        <p className="muted">A receipt has been sent to {confirmation.email}. Orders usually ship within two days.</p>
        <Link to="/" data-testid="continue-shopping">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>Your cart</h1>
        <p className="muted">Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}.</p>
      </div>

      {cart.lines.length === 0 ? (
        <section className="panel empty-state" data-testid="cart-empty">
          <h2>Your cart is empty</h2>
          <p className="muted">Browse the shop and add something you like.</p>
          <Link to="/" data-testid="continue-shopping">
            Continue shopping
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="panel" aria-labelledby="cart-items-heading">
            <h2 id="cart-items-heading">Items</h2>
            <ul className="cart-lines">
              {cart.lines.map((line) => (
                <li key={line.id} className="cart-line" data-testid="cart-line">
                  <div className="cart-line-info">
                    <Link to={`/products/${line.slug}`} className="cart-line-name" data-testid="cart-line-name">
                      {line.product.name}
                    </Link>
                    <p className="muted small" data-testid="cart-line-variant">
                      {line.product.variantLabel}: {line.variant}
                    </p>
                    <p className="small">{formatPrice(line.product.price)} each</p>
                  </div>
                  <QuantityStepper
                    id={`quantity-${line.id}`}
                    label={`Quantity for ${line.product.name}`}
                    hideLabel
                    itemName={line.product.name}
                    value={line.quantity}
                    onChange={(quantity) => cart.setQuantity(line.id, quantity)}
                    testIdPrefix="line-quantity"
                  />
                  <p className="price cart-line-total" data-testid="line-total">
                    {formatPrice(line.lineTotal)}
                  </p>
                  <button
                    type="button"
                    className="link-button"
                    aria-label={`Remove ${line.product.name} from cart`}
                    onClick={() => cart.removeItem(line.id)}
                    data-testid="line-remove"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <dl className="summary" data-testid="order-summary">
              <div className="summary-row">
                <dt>Subtotal</dt>
                <dd data-testid="cart-subtotal">{formatPrice(cart.subtotal)}</dd>
              </div>
              <div className="summary-row">
                <dt>Shipping</dt>
                <dd data-testid="cart-shipping">{cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}</dd>
              </div>
              <div className="summary-row summary-total">
                <dt>Total</dt>
                <dd data-testid="cart-total">{formatPrice(cart.total)}</dd>
              </div>
            </dl>
          </section>

          <section className="panel" aria-labelledby="checkout-heading">
            <h2 id="checkout-heading">Checkout</h2>
            <form className="checkout-form" noValidate onSubmit={handleSubmit} data-testid="checkout-form">
              <div className="field">
                <label htmlFor="checkout-name" className="field-label">
                  Full name
                </label>
                <input
                  id="checkout-name"
                  ref={(element) => {
                    fieldRefs.current.name = element;
                  }}
                  className="input"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'checkout-name-error' : undefined}
                  data-testid="checkout-name"
                />
                {errors.name && (
                  <p id="checkout-name-error" className="field-error" data-testid="error-name">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="checkout-email" className="field-label">
                  Email
                </label>
                <input
                  id="checkout-email"
                  ref={(element) => {
                    fieldRefs.current.email = element;
                  }}
                  type="email"
                  className="input"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'checkout-email-error' : undefined}
                  data-testid="checkout-email"
                />
                {errors.email && (
                  <p id="checkout-email-error" className="field-error" data-testid="error-email">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="checkout-address" className="field-label">
                  Shipping address
                </label>
                <textarea
                  id="checkout-address"
                  ref={(element) => {
                    fieldRefs.current.address = element;
                  }}
                  className="input textarea"
                  rows={3}
                  autoComplete="street-address"
                  value={values.address}
                  onChange={(event) => updateField('address', event.target.value)}
                  aria-invalid={errors.address ? true : undefined}
                  aria-describedby={errors.address ? 'checkout-address-error' : undefined}
                  data-testid="checkout-address"
                />
                {errors.address && (
                  <p id="checkout-address-error" className="field-error" data-testid="error-address">
                    {errors.address}
                  </p>
                )}
              </div>

              <button type="submit" className="button button-primary" data-testid="place-order">
                Place order
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
