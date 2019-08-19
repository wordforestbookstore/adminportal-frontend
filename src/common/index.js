let user = null;

function userLogin(obj) {
  user = obj;
}

function userLogout() {
  user = null;
}

function checkLogin() {
  return !!user;
}

export {
  userLogin, 
  userLogout,
  checkLogin
};