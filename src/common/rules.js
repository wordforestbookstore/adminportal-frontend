const charReg = /^[a-zA-Z0-9_]+$/;

export const UsernameRules = [
  v => !!v || '用户名不能为空',
  v => (v && v.length >= 4 && v.length <= 32) || '用户名长度为 4 到 32 个字符',
  v => (v && charReg.test(v)) || '用户名包含非法字符'
];

export const PasswordRules = [
  v => !!v || '密码不能为空',
  v => (v && v.length >= 6 && v.length <= 16) || '密码长度为 6 到 16 个字符',
  v => (v && charReg.test(v)) || '密码包含非法字符'
];

export const BookRules = {
  title: [
    v => !!v || '书名不能为空'
  ],
  author: [
    v => !!v || '作者不能为空'
  ],
  isbn: [
    v => !!v || 'ISBN 不能为空'
  ],
  category: [
    v => !!v || '分类不能为空'
  ],
  image: [
    v => (v && v.size <= 1024 * 1024) || '封面图片过大'
  ]
};