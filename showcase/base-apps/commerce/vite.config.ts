import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 4302, strictPort: true },
  preview: { port: 4302, strictPort: true },
});
