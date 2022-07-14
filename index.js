const { createServer } = require('./src/server/server.js');
const { requestHandler } = require('./src/app.js');

const config = {
  resource: './public',
  userDetails: '.data/userDetails.json',
  commentsFile: '.data/comments.json',
  guestBookTemplateFile: 'template/template.html'
};

const logger = ({ method, url }, res, next) => {
  console.log(method, url);
  next();
};

const PORT = 8000;
const express = require('express');
const app = express();
app.listen(PORT, console.log('Started listening on 8000'));

app.use(logger);
app.use(express.static('public'));
