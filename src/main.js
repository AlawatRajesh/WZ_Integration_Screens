import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router';
import Table from './components/Table.vue';
import Pagination from './components/Pagination.vue';
import Modal from './components/Modal.vue';
import { debounce } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
//import BootstrapVue3 from 'bootstrap-vue-next';

// Import specific components from bootstrap-vue-next
import { BModal, BButton, BTable, BPagination, BFormSelect, BFormInput, } from 'bootstrap-vue-next';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';  // Correct BootstrapVueNext CSS import

// Create the app
const app = createApp(App);

// Register BootstrapVueNext components globally
app.component('BModal', BModal);
app.component('BButton', BButton);
app.component('BTable', BTable);
app.component('BPagination', BPagination);
app.component('BFormSelect', BFormSelect);
app.component('BFormInput', BFormInput);

// Register other components globally
app.component('Table', Table);
app.component('Pagination', Pagination);
app.component('Modal', Modal);

// Use the router
app.use(router);

// Mount the app
app.mount('#app');
