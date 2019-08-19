import Vue from 'vue'
import VueRouter from 'vue-router'

import { checkLogin } from './common/index'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: resolve => require(['./components/login.vue'], resolve)
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      component: resolve => require(['./components/index.vue'], resolve),
      beforeEnter: (to, from, next) => {
        if (checkLogin()) {
          next();
        } else {
          next('/login');
        }
      }
    }
  ]
});