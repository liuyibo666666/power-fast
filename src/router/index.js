import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '@/views/layout/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { requireAuth: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard'
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: () => import('@/views/user/index.vue'),
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        component: () => import('@/views/user/Login.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
