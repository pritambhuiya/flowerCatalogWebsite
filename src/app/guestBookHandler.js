const { GuestBook } = require('./guestBook.js');

const getParams = (rawParams) => {
  const params = {};
  for (const [fieldName, fieldValue] of rawParams.entries()) {
    params[fieldName] = fieldValue;
  }
  return params;
};

const createComment = (name, comment) => {
  const date = new Date().toLocaleString();
  return { name, comment, date };
};

const guestBookHandler = (commentsFile, guestBookTemplateFile) => {
  const flowerGuestBook = new GuestBook(commentsFile, guestBookTemplateFile);
  flowerGuestBook.loadComments();

  return (req, res, next) => {
    const { url, method, bodyParams } = req;
    if (url.pathname !== '/guestBook') {
      next();
      return;
    }

    if (method === 'GET') {
      const html = flowerGuestBook.serveGuestBook();
      res.setHeader('Content-type', 'text/html');
      res.end(html);
      return;
    }

    const { name, comment } = getParams(bodyParams);

    if (!name || !comment) {
      res.statusCode = 400;
      res.setHeader('content-type', 'text/plain');
      res.end('Need to provide name and comment');
      return;
    }

    const latestComment = createComment(name, comment);
    flowerGuestBook.storeComment(latestComment);
    res.end(flowerGuestBook.getComments());
  };
};

module.exports = { guestBookHandler, getParams };
