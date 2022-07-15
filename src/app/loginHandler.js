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
  ({ method, session, cookies, body }, res) => {

    if (!session && method === 'GET') {
      res.end(serveLoginPage());
      return;
    }

    let location = '/guestBook';
    if (!session && method === 'POST') {
      const { username, password } = body;

      if (username && password) {
        const session = createSession(cookies, sessions);
        res.cookie('sessionId', session.sessionId);
        location = '/login';
      }
    }

    res.redirect(302, location);
    res.end();

  };

exports.loginHandler = loginHandler;
