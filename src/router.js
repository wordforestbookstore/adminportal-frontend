import Vue from 'vue'
import VueRouter from 'vue-router'

import { checkLogin } from './common/userservice'
import { hasOwn } from './util'

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
        },
        {
          path: 'bookInfo',
          component: resolve => require(['./components/bookinfo.vue'], resolve),
          beforeEnter: (to, from, next) => {
            if (hasOwn(to.query, 'id')) {
              next();
            } else {
              next('/book');
            }
          }
        },
        {
          path: 'updateBook',
          component: resolve => require(['./components/edit.vue'], resolve),
          beforeEnter: (to, from, next) => {
            if (hasOwn(to.query, 'id')) {
              next();
            } else {
              next('/book');
            }
          }
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