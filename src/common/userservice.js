import api from './apiservice'
import { isObject } from '../util'

let user = null;

async function userLogin(obj) {
  if (!isObject(obj)) {
    if (!api.isKey('login')) {
      return { status: 'error' };
    }
    try {
      let res = await api.get('/login');
      return user = res.data;
    } catch(err) {
      api.removeCookies('login');
      return { status: 'error' };
    }
  } else {
    try {
      let res = await api.post('/login', obj);
      user = res.data.userInfo;
      api.setCookies('login', res.data.cookieID);
      return user;
    } catch(err) {
      api.removeCookies('login');
      if (err.response) {
        return { status: 'error', message: '登录失败' };
      } else {
        return { status: 'error', message: '服务器连接失败' };
      }
    }
  }
}

function userLogout() {
  api.post('/logout').catch(() => {});
  user = null;
  api.removeCookies('login');
  return true;
}

function checkLogin() {
  return !!user;
}

export {
  userLogin, 
  userLogout,
  checkLogin
};