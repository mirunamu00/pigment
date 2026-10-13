import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import SecurityPage from './pages/SecurityPage';
import BillingPage from './pages/BillingPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/settings/profile" replace />} />
      <Route path="settings" element={<Layout />}>
        <Route index element={<Navigate to="/settings/profile" replace />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
