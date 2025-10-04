import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    root: '.',
    publicDir: 'public',
    envDir: './env',
    envPrefix: ['VITE_', 'VITE_TMDB_'],
    plugins: [react(), svgr()],
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
