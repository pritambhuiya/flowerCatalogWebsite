const fs = require('fs');

const loadGuestBook = (request, response, next) => {
  const existingComments = fs.readFileSync('.data/comments.json', 'utf8');
  request.comments = JSON.parse(existingComments);
  request.template = fs.readFileSync('.data/template.html', 'utf8');

  next();
};
exports.loadGuestBook = loadGuestBook;
