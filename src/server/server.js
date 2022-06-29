const http = require('http');

const createServer = (PORT, requestListener) => {
  const server = http.createServer(requestListener);
  server.listen(PORT, () => console.log('Listening on', PORT));
};

module.exports = { createServer };
