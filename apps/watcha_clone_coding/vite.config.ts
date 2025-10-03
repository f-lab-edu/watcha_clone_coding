import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    root: '.',
    publicDir: 'public',
    envDir: './env',
    envPrefix: ['VITE_', 'VITE_TMDB_'],
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@watcha/carousel': resolve(__dirname, '../../packages/carousel'),
      },
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000,
    },
  };
});
