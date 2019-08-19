<template>
<v-container id="login">
  <v-row class="title py-3">欢迎进入 辞林书店 管理系统</v-row>
  <v-row><v-divider light></v-divider></v-row>
  <v-row class="pt-3">
    <v-col cols="3">
      <v-img src="../assets/logo.png">
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="6">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="nameRules"
          label="用户名"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="密码"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          block
          @click="login"
        >登录</v-btn>
      </v-form>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    valid: true, username: '', password: '',
    nameRules: [
      v => !!v || '用户名不能为空',
      v => (v && v.length <= 16) || '用户名过长',
    ],
    passwordRules: [
      v => !!v || '密码不能为空'
    ]
  }),
  methods: {
    login() {
      let data = { 'username': '123' }; 
      this.$emit('userlogin', data);
      this.$router.push('/index');
    }
  }
}
</script>

<style>

</style>