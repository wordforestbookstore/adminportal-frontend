import api from './apiservice'

function uploadImage(id, obj) {
  let form = new FormData();
  form.append('file', obj, obj.name);
  try {
    api.put(`/book/img/${id}`, form, {
      params: { cookie: api.getCookie('login') },
      headers: {'Content-Type':'multipart/form-data'}
    });
  } catch(err) {
    return { status: 'error' };
  }
}

async function addBook(obj, img = null) {
  try {
    let res = await api.post('/book', obj, {
      params: { cookie: api.getCookie('login') }
    });
    if (img) {
      uploadImage(res.data.id, img);
    }
    return res.data;
  } catch(err) {
    return { status: 'error', message: '上传失败' };
  }
}

async function editBook(id, obj, img = null) {
  try {
    let res = await api.put(`/book/${id}`, obj, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    if (img) {
      uploadImage(id, img);
    }
    return res.data;
  } catch(err) {
    return { status: 'error', message: '更新失败' };
  }
}

async function deleteBook(id) {
  try {
    let res = await api.delete(`/book/${id}`, {
      params: { 
        cookie: api.getCookie('login')
      }
    });
    return res.data;
  } catch(err) {
    return { status: 'error' };
  }
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
  deleteBook,
  getBookList,
  getBookInfo
};