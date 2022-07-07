const { serveFileContent } = require('./app/serveFileContent.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { createHandler } = require('./server/router.js');
const { guestBook } = require('./app/guestBook.js');
const { bodyParser } = require('./app/bodyParser.js');
const { loadGuestBook } = require('./app/loadGuestBook.js');
const { injectCookies } = require('./app/injectCookies.js');

const handlers = [
  injectCookies,
  bodyParser,
  loadGuestBook,
  guestBook,
  serveFileContent,
  notFoundHandler
];

const requestHandler = createHandler(handlers);

module.exports = { requestHandler };
