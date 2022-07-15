const createComment = (name, comment) => {
  const date = new Date().toLocaleString();
  return { name, comment, date };
};

const serveGuestBook = (guestBook) => (req, res) => {
  const html = guestBook.serveGuestBook();
  res.end(html);
};

const addComments = (guestBook) => {
  return (req, res) => {
    const { name, comment } = req.body;

    if (!name || !comment) {
      res.status(400);
      res.end('Need to provide name and comment');
      return;
    }

    const latestComment = createComment(name, comment);
    guestBook.storeComment(latestComment);
    res.end(guestBook.comments);
  };
};

module.exports = { addComments, serveGuestBook };
