const { serveFileContent } = require('./app/serveFileContent.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { createHandler } = require('./server/router.js');
const { bodyParser } = require('./app/bodyParser.js');
const { guestBookHandler } = require('./app/guestBookHandler.js');
const { injectCookies } = require('./app/injectCookies.js');
const { injectSession } = require('./app/injectSession.js');
const { loginHandler } = require('./app/loginHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');
const { signupHandler } = require('./app/signupHandler.js');
const { multiPartHandler } = require('./app/multiPartHandler.js');
const { injectUrl } = require('./app/injectUrl.js');

const requestHandler = (
  { resource, userDetails, commentsFile, guestBookTemplateFile }, sessions) => {
  const handlers = [
    injectUrl,
    injectCookies,
    injectSession(sessions),
    multiPartHandler,
    bodyParser,
    loginHandler(sessions),
    logoutHandler(sessions),
    signupHandler(userDetails),
    guestBookHandler(commentsFile, guestBookTemplateFile),
    serveFileContent(resource),
    notFoundHandler
  ];

  return createHandler(handlers);
};

module.exports = { requestHandler };
