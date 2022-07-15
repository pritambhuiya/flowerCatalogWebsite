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

const comments = (guestBook) => (req, res) => {
  res.end(guestBook.comments);
};

const express = require('express');

const createApp = (config, sessions, guestBook) => {
  const { resource, userDetails } = config;
  const app = express();

  const loginRouter = express.Router();
  const signupRouter = express.Router();
  const guestBookRouter = express.Router();

  app.use(logger);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(resource));

  app.use(injectCookies);
  app.use(injectSession(sessions));

  app.use('/login', loginRouter);
  loginRouter.get('', serveLoginPage);
  loginRouter.post('', loginHandler(sessions));

  app.use('/signup', signupRouter);
  signupRouter.get('/', serveSignupPage);
  signupRouter.post('/', signupHandler(userDetails));

  app.get('/logout', logoutHandler(sessions));

  app.use('/guestBook', guestBookRouter);
  guestBookRouter.get('/', serveGuestBook(guestBook));
  guestBookRouter.post('/', addComments(guestBook));

  app.get('/api/comments', comments(guestBook));
  return app;
};

module.exports = { createApp };
