import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import { FIRE } from '../settings/CONST_REFS'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/campaign',
    name: 'Campaign',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Campaign.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Clients.vue'),
      meta: { requiresAuth: true },
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Notifications.vue'),
      meta: { requiresAuth: true },
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Reports.vue'),
      meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


//* Before we go to the route validate if the user is Auth
 router.beforeEach((to: any, from: any, next: any) => {
   const requiresAuth = to.matched.some(
     (record: any) => record.meta.requiresAuth,
   );
   const isAuthenticated = FIRE.auth().currentUser;
   console.log(`User Authentication: -> ${isAuthenticated ? true : false}`);
   if (requiresAuth && !isAuthenticated) {
     next('/login');
   } else {
     next();
   }
 });

export default router;
