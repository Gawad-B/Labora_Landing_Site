import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// A standalone static site. No proxy and no API: it must be publishable to any
// host without the clinical application existing anywhere near it.
export default defineConfig({
  plugins: [react()],
  server: { port: 5180 },
  build: { outDir: 'dist' },
});
