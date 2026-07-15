import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, isPreview }) => ({
  // Local development should run at http://localhost:5173/.
  // Production keeps the GitHub Pages repository path.
  base: command === 'serve' && !isPreview ? '/' : '/hall/',
  plugins: [react()],
}));
