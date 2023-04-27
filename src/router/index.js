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
      props: true // props: (route) => ({
      //   id: route.query.id,
      //   currencyRate: route.query.currencyRate,
      //   currencyType: route.query.currencyType
      // })
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
    },
    {
      path: '/MSaleItems',
      name: 'ManageSaleItems',
      component: () => import('../components/ManageSaleItems.vue')
    },
    {
      path: '/MUsers',
      name: 'ManageUsers',
      component: () => import('../components/ManageUsers.vue')
    }
  ]
});

export default router;
