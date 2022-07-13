const { createServer } = require('./src/server/server.js');
const { requestHandler } = require('./src/app.js');

const fs = require('fs');
const { log } = require('console');

const sessions = {};
const config =
{
  resource: './public',
  userDetails: '.data/userDetails.json',
  commentsFile: '.data/comments.json'
};

createServer(8000, requestHandler(sessions, fs, config), log);
