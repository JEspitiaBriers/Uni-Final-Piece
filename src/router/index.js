import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dash',
      component: defineAsyncComponent(() => import('../components/Dash.vue'))
    },
    {
      path: '/productPage/:id/:currencyRate/:currencyType',
      name: 'Product',
      component: defineAsyncComponent(() => import('../components/ProductPage.vue')),
      props: true
    },
    {
      path: '/payment/:id?/:quantity?/:currencyRate?/:currencyType?',
      name: 'Payment',
      component: defineAsyncComponent(() => import('../components/Payment.vue')),
      props: (route) => ({
        id: route.params.id || null,
        quantity: route.params.quantity || null,
        currencyRate: route.params.currencyRate || null,
        currencyType: route.params.currencyType || null,
        basket: route.query.basket ? JSON.parse(decodeURIComponent(route.query.basket)) : null
      })
    },
    {
      path: '/successfulPurchase',
      name: 'successfulPurchase',
      component: defineAsyncComponent(() => import('../components/successfulPurchase.vue')),
      props: true
    },
    {
      path: '/offline',
      name: 'Offline',
      component: defineAsyncComponent(() => import('../components/Offline.vue'))
    },
    {
      path: '/login/',
      name: 'Login',
      component: defineAsyncComponent(() => import('../views/LoginView.vue'))
    },
    {
      path: '/register',
      name: 'Register',
      component: defineAsyncComponent(() => import('../views/RegisterView.vue'))
    },
    {
      path: '/basket',
      name: 'Basket',
      component: defineAsyncComponent(() => import('../components/Basket.vue'))
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Dash',
      component: defineAsyncComponent(() => import('../components/Dash.vue'))
    }
  ]
});

export default router;
