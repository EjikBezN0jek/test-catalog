import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: () => import('@/views/Catalog.vue'),
  },
  {
    path: '/category/:categorySlug/:subcategorySlug?',
    name: 'category',
    component: () => import('@/views/Category.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
