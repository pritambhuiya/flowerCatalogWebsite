const { GuestBook } = require('./guestBook.js');

const createComment = (name, comment) => {
  const date = new Date().toLocaleString();
  return { name, comment, date };
};

const guestBookHandler = (commentsFile, guestBookTemplateFile) => {
  const flowerGuestBook = new GuestBook(commentsFile, guestBookTemplateFile);
  flowerGuestBook.loadComments();

  return (req, res) => {
    const { method, body } = req;

    if (method === 'GET') {
      const html = flowerGuestBook.serveGuestBook();
      res.end(html);
      return;
    }

    const { name, comment } = body;

    if (!name || !comment) {
      res.status(400);
      res.end('Need to provide name and comment');
      return;
    }

    const latestComment = createComment(name, comment);
    flowerGuestBook.storeComment(latestComment);
    res.end(flowerGuestBook.getComments());
  };
};

module.exports = { guestBookHandler };
