import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DocPage from './pages/DocPage';
import ChangelogPage from './pages/ChangelogPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="docs/:group/:slug" element={<DocPage />} />
        <Route path="changelog" element={<ChangelogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
