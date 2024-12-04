// import { createRouter, createWebHistory } from 'vue-router';

// import Steps from './components/Steps.vue';
// import { componentNames } from 'bootstrap-vue-next';
// const routes = [
  
//   {
//     path: '/steps',
//     name: 'steps',
//     component: Steps,  // Steps component to show important steps
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// });

// export default router;
import { createRouter, createWebHistory } from 'vue-router';
import Steps from './components/Steps.vue';


const routes = [
  
  {
    path: '/steps',
    name: 'steps',
    component: Steps,  // This will render on the /steps page
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;


