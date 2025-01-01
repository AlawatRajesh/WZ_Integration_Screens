// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import path from 'path';
// //import lodash from 'lodash/debounce'; 

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@components': path.resolve(__dirname, 'src/components'),
//     },
//   },
//   build: {
//     outDir: 'dist',            
//     assetsDir: 'assets',       
//     cssCodeSplit: true,        
//     rollupOptions: {
//       input: path.resolve(__dirname, 'src/main.js'),  
//       output: {
//         name: 'myVueApp',
//         entryFileNames: 'my-vue-project.js',  
//         format: 'umd',            
//       },
//     },
//     chunkSizeWarningLimit: 1000,  
//   },
//   server: {
//     host: 'localhost',  
//     port: 8080,         
//     open: true, 
//     hmr: {
//       protocol: 'ws', 
//       host: '0.0.0.0',
//     },
//     strictPort: true,  
//      cors: true,          
//   },
// });


import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

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
    host: '0.0.0.0',  // Ensure the server binds to 'localhost' or '127.0.0.1'
    port: 8080,
    open: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',  // Update WebSocket host to 'localhost' or '127.0.0.1'
    },
    strictPort: true,
    cors: true,
  },
});
