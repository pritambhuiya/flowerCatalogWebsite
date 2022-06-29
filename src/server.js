const http = require('http');

const { handleRequest } = require('./server/handleRequest.js');

const onConnection = (request, response) => {
  const { method, url, headers } = request;
  request.requestLine = new URL(`HTTP://${headers.host}${url}`);

  console.log(method, request.requestLine.pathname);
  handleRequest(request, response);
};

const createServer = (PORT) => {
  const server = http.createServer(onConnection);
  server.listen(PORT, () => console.log('Listening on', PORT));
};

module.exports = { createServer };
