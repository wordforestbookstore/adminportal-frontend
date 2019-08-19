import Vue from 'vue'
import VueRouter from 'vue-router'

import { checkLogin } from './common/index'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['./components/login.vue'], resolve)
    },
    {
      path: '/login',
      redirect: '/'
    },
    {
      path: '/book',
      component: resolve => require(['./components/index.vue'], resolve),
      children: [
        {
          path: 'add',
          component: resolve => require(['./components/add.vue'], resolve)
        },
        {
          path: 'bookList',
          component: resolve => require(['./components/booklist.vue'], resolve)
        }
      ],
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