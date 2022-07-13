const { serveFileContent } = require('./app/serveFileContent.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { createHandler } = require('./server/router.js');
const { guestBook } = require('./app/guestBook.js');
const { bodyParser } = require('./app/bodyParser.js');
const { loadGuestBook } = require('./app/loadGuestBook.js');
const { injectCookies } = require('./app/injectCookies.js');
const { injectSession } = require('./app/injectSession.js');
const { loginHandler } = require('./app/loginHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');
const { signupHandler } = require('./app/signupHandler.js');
const { multiPartHandler } = require('./app/multiPartHandler.js');
const { xhrHandler } = require('./app/xhrHandler.js');

const requestHandler =
  (sessions, fs, { resource, userDetails, commentsFile }) => {
    const handlers = [
      xhrHandler,
      injectCookies,
      injectSession(sessions),
      multiPartHandler(fs.writeFileSync),
      bodyParser,
      loginHandler(sessions),
      logoutHandler(sessions),
      signupHandler(userDetails, fs),
      loadGuestBook(fs),
      guestBook(commentsFile, fs),
      serveFileContent(resource, fs),
      notFoundHandler
    ];

    return createHandler(handlers);
  };

module.exports = { requestHandler };
