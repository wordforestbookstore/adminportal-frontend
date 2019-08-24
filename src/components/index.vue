<template>
  <v-container>
    <v-app-bar app class="red lighten-1" dark>
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
      <v-btn text @click="logout"><span>退出</span></v-btn>
    </v-app-bar>

    <router-view></router-view>
  </v-container>
</template>

<script>
import { userLogout } from '../common/userservice'

export default {
  name: 'index-page',
  data: () => ({

  }),
  methods: {
    logout() {
      userLogout();
      this.$router.push('/login');
    }
  }
}
</script>

<style>

</style>