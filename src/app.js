const { addComments, serveGuestBook } = require('./app/guestBookHandler.js');
const { injectCookies } = require('./app/injectCookies.js');
const { injectSession } = require('./app/injectSession.js');
const { loginHandler, serveLoginPage } = require('./app/loginHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');
const { signupHandler, serveSignupPage } = require('./app/signupHandler.js');
// const { multiPartHandler } = require('./app/multiPartHandler.js');

const logger = ({ method, url }, res, next) => {
  console.log(method, url);
  next();
};

const express = require('express');

const createApp = (config, sessions, guestBook) => {
  const { resource, userDetails } = config;
  const app = express();

  app.use(logger);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(resource));

  app.use(injectCookies);
  app.use(injectSession(sessions));

  app.get('/guestBook', serveGuestBook(guestBook));
  app.post('/guestBook', addComments(guestBook));
  app.get('/api/comments', comments(guestBook));

  app.get('/signup', serveSignupPage);
  app.post('/signup', signupHandler(userDetails));

  app.get('/login', serveLoginPage);
  app.post('/login', loginHandler(sessions));

  app.get('/logout', logoutHandler(sessions));
  app.post('/logout', logoutHandler(sessions));
  return app;
};

const comments = (guestBook) => (req, res) => {
  res.end(guestBook.comments);
};

module.exports = { createApp };
