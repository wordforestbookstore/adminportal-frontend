import api from './apiservice'

let user = null;

async function userLogin(obj) {
  try {
    let res = await api.post('/login', obj);
    user = res.data;
    // console.log(res);
    return user;
  } catch(err) {
    // console.dir(err);
    if (err.response) {
      return { status: 'error', message: '登录失败' };
    } else {
      return { status: 'error', message: '服务器连接失败' };
    }
  }
}

function userLogout() {
  user = null;
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