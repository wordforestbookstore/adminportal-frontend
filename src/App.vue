<template>
  <v-app style="background-color: white">
    <v-app-bar app v-if="isLogin" class="red lighten-1" dark>
      <v-toolbar-title class="headline text-uppercase">
        <router-link class="white--text" to="/book">管理系统</router-link>
      </v-toolbar-title>
      <v-menu offset-y open-on-hover class="ml-5">
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">书籍</v-btn>
        </template>
        <v-list>
          <v-list-item key="add" to="/book/add">
            <v-list-item-title>新增书籍</v-list-item-title>
          </v-list-item>
          <v-list-item key="list" to="/book/bookList">
            <v-list-item-title>书籍列表</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn text @click="onlogout"><span>退出</span></v-btn>
    </v-app-bar>

    <v-snackbar top v-model="snackbar.isShow" :timeout="5000" color="error">
      {{ snackbar.text }}
      <v-btn color="white" text @click="snackbar.isShow = false">Close</v-btn>
    </v-snackbar>

    <v-content>
      <router-view @userlogin="onlogin"></router-view>
    </v-content>

  </v-app>
</template>

<script>
import { userLogin, userLogout } from './common/userservice'
import { hasOwn } from './util'

export default {
  name: 'App',
  components: {

  },
  data: () => ({
    isLogin: false,
    snackbar: {
      isShow: false, text: '登录失败'
    }
  }),
  methods: {
    async onlogin(data) {
      let res = await userLogin(data);
      if (hasOwn(res, 'status') && res.status === 'error') {
        this.snackbar.text = res.message;
        this.snackbar.isShow = true;
      } else {
        this.isLogin = true;
        this.$router.push('/book');
      }
    },
    onlogout() {
      this.isLogin = false;
      userLogout();
      this.$router.push('/login');
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>