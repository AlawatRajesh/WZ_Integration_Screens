import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
//import lodash from 'lodash/debounce'; 

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
     
      
    },
  },
  
  server: {
    host: '0.0.0.0',  
    port: 8080,         
    open: true, 
    hmr: {
      protocol: 'ws', 
      // host: '0.0.0.0',
    },
    strictPort: true,  
     cors: true,          
  },
});
