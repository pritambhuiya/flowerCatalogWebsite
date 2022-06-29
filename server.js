const http = require('http');

const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.setHeader('Content-length', 9);
  response.setHeader('Content-type', 'text/plain');
  response.end('NOT FOUND');
};

const onConnection = (request, response) => {
  const { url, headers } = request;
  const requestLine = new URL(`HTTP://${headers.host}${url}`);

  console.log(requestLine);
  notFoundHandler(request, response);
};

const createServer = (PORT) => {
  const server = http.createServer(onConnection);
  server.listen(PORT, () => console.log('Listening on', PORT));
};

createServer(8000);
