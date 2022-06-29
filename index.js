const { createServer } = require('./src/server/server.js');

const { requestHandler } = require('./src/app.js');

createServer(8000, requestHandler);
