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

const serveFileContent = (resourcePath, { readFileSync }) =>
  (request, response, next) => {
    const { url } = request;
    const filePath = isRoot(url) ? '/homepage.html' : url.pathname;
    const resource = resourcePath + filePath;

    try {
      const content = readFileSync(resource);
      const mimeType = getMimeType(resource);

      response.setHeader('Content-type', mimeType);
      response.end(content);
    } catch (error) {
      next();
    }
  };

module.exports = { serveFileContent };
