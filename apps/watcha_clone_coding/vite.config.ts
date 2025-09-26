import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: '.',
    publicDir: 'public',
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.APP_PHASE': JSON.stringify(env.APP_PHASE || 'local'),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    // 공유 설정 패키지들을 위한 optimizeDeps 설정
    optimizeDeps: {
      include: ['@your-org/shared-components', '@your-org/shared-utils'],
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        external: () => {
          // 모노레포 내 다른 패키지들을 external로 처리하지 않음
          return false;
        },
      },
    },
    server: {
      port: 3000,
      fs: {
        // 모노레포 루트까지 접근 허용
        allow: ['../../'],
      },
    },
  };
});
