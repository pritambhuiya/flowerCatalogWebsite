const fs = require('fs');

const isRoot = ({ pathname }) => pathname === '/';

const guestBook = (request, response) => {
  const params = {};
  const queryParams = request.requestLine.searchParams.entries();

  for (const [fieldName, fieldValue] of queryParams) {
    params[fieldName] = fieldValue;
  }

  response.setHeader('Content-type', 'text/plain');
  response.end(JSON.stringify(params));
  return true;
};

const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.setHeader('Content-length', 9);
  response.setHeader('Content-type', 'text/plain');
  response.end('NOT FOUND');
  return true;
};

const serveFileContent = ({ requestLine }, response) => {
  const filePath =
    isRoot(requestLine) ? '/homepage.html' : requestLine.pathname;
  const resource = './public' + filePath;

  try {
    const content = fs.readFileSync(resource);
    response.setHeader('Content-type', 'text/html');
    response.end(content);
    return true;

  } catch (error) {
    return false;
  }
};

module.exports = { serveFileContent, guestBook, notFoundHandler };
