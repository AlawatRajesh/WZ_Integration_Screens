import { createRouter, createWebHistory } from 'vue-router'; 
import App from './components/App.vue';
import Table from './components/Table.vue';
import Pagination from './components/Pagination.vue';
import Modal from './components/Modal.vue'; 
import { debounce } from 'lodash';


const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  
  {
    path: '/workshop/:id', 
    name: 'Table',
    component: Table
  },
  
  {
    path: '/customer/:view', 
    name: 'CustomerModal',
    component: Modal
  }
];

const router = createRouter({
  history: createWebHistory(),  
  routes  
});

export default router;
