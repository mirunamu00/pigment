import { Route, Routes } from 'react-router';
import { Shell } from './components/Shell';
import { StoreProvider } from './store';
import Today from './pages/Today';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Plan from './pages/Plan';
import Shopping from './pages/Shopping';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Today />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:slug" element={<RecipeDetail />} />
          <Route path="plan" element={<Plan />} />
          <Route path="shopping" element={<Shopping />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
}
