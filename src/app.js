const { createHandler } = require('./server/router.js');
const { serveFileContent, guestBook, notFoundHandler } =
  require('./app/handlers.js');

const handlers = [serveFileContent, guestBook, notFoundHandler];
const requestHandler = createHandler(handlers);
exports.requestHandler = requestHandler;
