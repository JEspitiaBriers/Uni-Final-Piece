import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dash',
      component: () => import('../components/Dash.vue')
    },
    {
      path: '/productPage/:id/:currencyRate/:currencyType',
      name: 'Product',
      component: () => import('../components/ProductPage.vue'),
      props: true
    },
    {
      path: '/payment/:id/:currencyRate/:currencyType',
      name: 'Payment',
      component: () => import('../components/Payment.vue'),
      props: true
    },
    {
      path: '/offline',
      name: 'Offline',
      component: () => import('../views/OfflineView.vue')
    },
    {
      path: '/login/',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/Register.vue')
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: () => import('../views/AnalysisView.vue')
    },
    {
      path: '/manage',
      name: 'ManageAccount',
      component: () => import('../views/ManageAccountView.vue')
    },
    {
      path: '/addProduct',
      name: 'AddProduct',
      component: () => import('../components/AddProduct.vue')
    }
  ]
});

export default router;
