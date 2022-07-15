const { bodyParser } = require('./app/bodyParser.js');
const { guestBookHandler } = require('./app/guestBookHandler.js');
const { injectCookies } = require('./app/injectCookies.js');
const { injectSession } = require('./app/injectSession.js');
const { loginHandler } = require('./app/loginHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');
const { signupHandler } = require('./app/signupHandler.js');
const { multiPartHandler } = require('./app/multiPartHandler.js');

const logger = ({ method, url }, res, next) => {
  console.log(method, url);
  next();
};

const express = require('express');

const createApp = ({ resource, userDetails, commentsFile, guestBookTemplateFile }, sessions) => {
  const app = express();

  app.use(logger);
  app.use(express.static(resource));

  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.use(bodyParser);

  app.get('/guestBook', guestBookHandler(commentsFile, guestBookTemplateFile));
  app.post('/guestBook', guestBookHandler(commentsFile, guestBookTemplateFile));

  app.get('/signup', signupHandler(userDetails));
  app.post('/signup', signupHandler(userDetails));

  app.get('/login', loginHandler(sessions));
  app.post('/login', loginHandler(sessions));

  app.get('/logout', logoutHandler(sessions));
  app.post('/logout', logoutHandler(sessions));
  return app;
};

module.exports = { createApp };
