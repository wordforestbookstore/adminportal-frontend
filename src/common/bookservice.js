function addBook() {

}

function editBook(id) {

}

function getBookList() {
  return [
    {
      title: 'test1', author: 'admin',
      p1: 1, p2: 2,
      category: 'programming', active: 'true'
    },
    {
      title: 'test2', author: 'root',
      p1: 1, p2: 2,
      category: 'management', active: 'true'
    },
    {
      title: 'test3', author: 'hzy',
      p1: 1, p2: 2,
      category: 'fiction', active: 'false'
    }
  ];
}

export {
  addBook,
  editBook,
  getBookList
};