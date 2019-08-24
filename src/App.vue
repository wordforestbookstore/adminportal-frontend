<template>
  <v-app style="background-color: white">

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data: () => ({

  }),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>