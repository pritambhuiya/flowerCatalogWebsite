const fs = require('fs');
const path = require('path');

const isRoot = ({ pathname }) => pathname === '/';

const getMimeType = (filePath) => {
  const extensions = {
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.pdf': 'application/pdf',
    '.gif': 'application/gif'
  };

  const extension = path.extname(filePath);
  return extensions[extension] || 'text/plain';
};

const serveFileContent = (request, response, next) => {
  const { url } = request;
  const filePath = isRoot(url) ? '/homepage.html' : url.pathname;
  const resource = './public' + filePath;

  try {
    const content = fs.readFileSync(resource);
    const mimeType = getMimeType(resource);

    response.setHeader('Content-type', mimeType);
    response.end(content);
  } catch (error) {
    next();
  }
};

const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.setHeader('Content-type', 'text/plain');
  response.end('NOT FOUND');
};

module.exports = { serveFileContent, notFoundHandler };
