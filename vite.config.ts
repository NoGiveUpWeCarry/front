import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@_assets': '/src/assets',
      '@_components': '/src/components',
      '@_constants': '/src/constants',
      '@_hooks': '/src/hooks',
      '@_layouts': '/src/layouts',
      '@_mock': '/src/mock',
      '@_store': '/src/store',
      '@_styles': '/src/styles',
      '@_types': '/src/types',
      '@_utils': '/src/utils',
    },
  },
});
