import api from './apiservice'
import { isObject } from '../util'

let user = null, once = false;

async function userLogin(obj) {
  if (!isObject(obj)) {
    if (once) {
      if (user) return user;
      else return { status: 'error' };
    }
    if (!api.isKey('login')) {
      return { status: 'error' };
    }
    once = true;
    try {
      let res = await api.get('/login', { 
        params: { 
          cookie: api.getCookie('login'),
          admin: true
        }
      });
      return user = res.data;
    } catch(err) {
      api.removeCookie('login');
      return { status: 'error' };
    }
  } else {
    try {
      let res = await api.post('/login', obj, {
        params: {
          admin: true
        }
      });
      user = res.data.userInfo;
      api.setCookie('login', res.data.cookieID);
      return user;
    } catch(err) {
      api.removeCookie('login');
      if (err.response) {
        if (err.response.status === 401) {
          return { status: 'error', message: '权限不足' };  
        } else {
          return { status: 'error', message: '登录失败' };
        }
      } else {
        return { status: 'error', message: '服务器连接失败' };
      }
    }
  }
}

function userLogout() {
  api.post('/logout', {}, {
    params: { cookie: api.getCookie('login') }
  }).catch(() => {});
  user = null;
  once = false;
  api.removeCookie('login');
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