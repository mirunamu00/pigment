import { Route, Routes } from 'react-router';
import { CartProvider } from './cart/CartContext';
import Layout from './components/Layout';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
