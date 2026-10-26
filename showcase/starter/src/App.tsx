import { Route, Routes } from 'react-router';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<main>New project</main>} />
    </Routes>
  );
}
