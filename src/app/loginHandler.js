/* eslint-disable max-statements */
/* eslint-disable complexity */

const serveLoginPage = () => `<html>
<head>
  <title>Login</title>
</head>
<body>
  <h1>Log in</h1>
  <form action="/login" method="post">
    <label for="username">username:</label>
    <input type="text" name="username" id="username"><br>
    <label for="password">password:</label>
    <input type="password" name="password" id="password"><br>
    <input type="submit" value="Submit">
  </form>
</body>
</html>`;

const createSession = (cookies, sessions) => {
  const time = new Date();
  const sessionId = time.getTime();
  const session = { sessionId, time, username: cookies };

  sessions[sessionId] = session;
  return session;
};

const loginHandler = sessions =>
  ({ url, method, session, cookies }, res, next) => {

    if (url.pathname !== '/login') {
      next();
      return;
    }

    if (!session && method === 'GET') {
      res.setHeader('content-type', 'text/html');
      res.end(serveLoginPage());
      return;
    }

    if (!session && method === 'POST') {
      const session = createSession(cookies, sessions);
      res.setHeader('Set-Cookie', `sessionId=${session.sessionId}`);
    }

    res.statusCode = 302;
    res.setHeader('location', '/guestBook');
    res.end();
  };

exports.loginHandler = loginHandler;
