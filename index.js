const { createServer } = require('./src/server/server.js');
const { requestHandler } = require('./src/app.js');

const config = {
  resource: './public',
  userDetails: '.data/userDetails.json',
  commentsFile: '.data/comments.json',
  guestBookTemplateFile: 'template/template.html'
};

const sessions = {};
const PORT = 8000;

const app = requestHandler(config, sessions);
createServer(PORT, app);
