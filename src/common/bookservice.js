import api from './apiservice'

async function addBook(obj) {
  try {
    let res = await api.post('/book', obj, {
      params: { cookie: api.getCookie('login') }
    });
    return res.data;
  } catch(err) {
    return { status: 'error', message: '上传失败' };
  }
}

function editBook(id, obj) {

}

async function getBookList(l, r) {
  try {
    let res = await api.get('/booklist', {  
      params: { l, r, cookie: api.getCookie('login') }
    });
    return res.data;
  } catch(err) {
    return { status: 'error' }
  }
}

async function getBookInfo(id) {
  try {
    let res = await api.get(`/book/${id}`, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return res.data;
  } catch(err) {
    return { status: 'error' };
  }
}

export {
  addBook,
  editBook,
  getBookList,
  getBookInfo
};