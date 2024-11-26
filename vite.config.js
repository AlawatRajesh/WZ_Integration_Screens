import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import lodash from 'lodash'; // Default import



const { debounce } = lodash; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components')
      
    }
  },
  build: {
    
    rollupOptions: {
      
    },
  },
  server: {
    port: 8080, 
  },
});