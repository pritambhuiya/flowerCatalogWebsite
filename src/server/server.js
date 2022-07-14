const http = require('http');

const createServer = (PORT, requestListener) => {
  const server = http.createServer((request, response) => {
    const { method, url, } = request;
    console.log(method, url);

    requestListener(request, response);
  });
  server.listen(PORT, () => console.log('Listening on', PORT));
};

module.exports = { createServer };
