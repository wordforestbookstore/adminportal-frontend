<template>
<v-container id="login">
  <v-row class="title py-3">欢迎进入 辞林书店 管理系统</v-row>
  <v-row><v-divider light></v-divider></v-row>
  <v-row class="pt-3">
    <v-col cols="3">
      <v-img src="../assets/logo.png"></v-img>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="6">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          autofocus
          v-model="username"
          :rules="usernameRules" validate-on-blur
          label="用户名"
          required clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules" validate-on-blur
          type="password"
          label="密码"
          required clearable
          @keyup.enter="login"
        ></v-text-field>

        <v-btn color="success" block @click="login">登录</v-btn>
      </v-form>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { UsernameRules, PasswordRules } from '../common/rules'

export default {
  name: 'login',
  data: () => ({
    valid: true, username: '', password: '',
    usernameRules: UsernameRules,
    passwordRules: PasswordRules
  }),
  methods: {
    login() {
      if (!this.$refs.form.validate()) return ;
      let data = { 'username': this.username, password: this.password }; 
      this.$emit('userlogin', data);
    }
  }
}
</script>

<style>

</style>