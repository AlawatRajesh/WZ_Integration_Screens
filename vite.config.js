import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import lodash from 'lodash/debounce'; 

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  build: {
    outDir: 'dist',            
    assetsDir: 'assets',       
    cssCodeSplit: true,        
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.js'),  
      output: {
        name: 'myVueApp',
        entryFileNames: 'my-vue-project.js',  
        format: 'umd',            
      },
    },
    chunkSizeWarningLimit: 1000,  
  },
  server: {
    host: '0.0.0.0',  
    port: 8080,         
    open: true, 
    hmr: {
      host: '0.0.0.0',
    },
    strictPort: true,  
    cors: true,          
  },
});
