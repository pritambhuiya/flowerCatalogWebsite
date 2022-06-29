const { serveFileContent, notFoundHandler } = require('../app/handlers.js');

const handleRequest = (request, response) => {
  const handlers = [serveFileContent, notFoundHandler];

  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
  return false;
};

module.exports = { handleRequest };
