import type { Product } from '../data/products';
import { ImageIcon } from './Icons';

interface ProductImageProps {
  product: Product;
  size?: 'card' | 'large';
}

/** Image placeholder: a tinted CSS box with an icon. No network images. */
export default function ProductImage({ product, size = 'card' }: ProductImageProps) {
  return (
    <div
      className={`product-image product-image-${size} tone-${product.tone}`}
      role="img"
      aria-label={`${product.name} product photo placeholder`}
      data-testid="product-image"
    >
      <ImageIcon className="product-image-icon" />
    </div>
  );
}
