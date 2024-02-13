/* eslint-env node */

import {chrome} from '../../.electron-vendors.cache.json';
import react from '@vitejs/plugin-react';
import {renderer} from 'unplugin-auto-expose';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {injectAppVersion} from '../../version/inject-app-version-plugin.mjs';

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, '../..');

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  resolve: {
    alias: [
      {find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))},
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./assets', import.meta.url)),
      },
      {
        find: '@UI',
        replacement: fileURLToPath(new URL('./src/components/UI', import.meta.url)),
      },
    ],
  },
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  test: {
    environment: 'happy-dom',
  },
  plugins: [
    react(),
    renderer.vite({
      preloadEntry: join(PACKAGE_ROOT, '../preload/src/index.ts'),
    }),
    injectAppVersion(),
  ],
};

export default config;
