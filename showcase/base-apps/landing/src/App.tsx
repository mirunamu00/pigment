import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import CustomersPage from './pages/CustomersPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
