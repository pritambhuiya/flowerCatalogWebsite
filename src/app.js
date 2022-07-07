const fs = require('fs');
const { notFoundHandler, serveFileContent } = require('./app/handlers.js');
const { createHandler } = require('./server/router.js');
const { guestBook } = require('./app/guestBook.js');

const loadGuestBook = (request, response, next) => {
  const existingComments = fs.readFileSync('.data/comments.json', 'utf8');
  request.comments = JSON.parse(existingComments);
  request.template = fs.readFileSync('.data/template.html', 'utf8');

  next();
};

const bodyParser = (request, response, next) => {
  if (request.method !== 'POST') {
    next();
    return;
  }

  let data = '';
  request.on('data', (chunk) => data += chunk);
  request.on('end', () => {
    request.bodyParams = new URLSearchParams(data);
    next();
  });
};

const handlers = [
  bodyParser,
  loadGuestBook,
  guestBook,
  serveFileContent,
  notFoundHandler
];

const requestHandler = createHandler(handlers);

module.exports = { requestHandler };
