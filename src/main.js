
import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './components/Table.vue';
import Pagination from './components/Pagination.vue';
import Modal from './components/Modal.vue';
import { debounce } from 'lodash';


const app = createApp(App);


app.use(router);


app.component('App',App)
app.component('Table', Table);
app.component('Pagination', Pagination);
app.component('Modal', Modal);

app.mount('#app');


