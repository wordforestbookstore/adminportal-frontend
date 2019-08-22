const charReg = /^[a-zA-Z0-9_]+$/;

export const UsernameRules = [
  v => !!v || '用户名不能为空',
  v => (v && v.length >= 6 && v.length <= 32) || '用户名长度为 6 到 32 个字符',
  v => charReg.test(v) || '用户名包含非法字符'
];

export const PasswordRules = [
  v => !!v || '密码不能为空',
  v => (v && v.length >= 6 && v.length <= 16) || '密码长度为 6 到 16 个字符',
  v => charReg.test(v) || '密码包含非法字符'
];