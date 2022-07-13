const http = require('http');

const createServer = (PORT, requestListener, log) => {
  const server = http.createServer((request, response) => {
    const { method, url, headers } = request;
    request.url = new URL(`HTTP://${headers.host}${url}`);
    log(method, request.url.pathname);

    requestListener(request, response);
  });
  server.listen(PORT, () => log('Listening on', PORT));
};

module.exports = { createServer };
