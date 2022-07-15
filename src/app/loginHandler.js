const loginPage = () => `<html>
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

const serveLoginPage = ({ session }, res) => {
  if (!session) {
    res.end(loginPage());
    return;
  }

  res.redirect(302, '/guestBook');
  res.end();
};

const loginHandler = sessions =>
  ({ session, cookies, body }, res) => {
    let location = '/login';
    if (!session) {
      const { username, password } = body;

      if (username && password) {
        const session = createSession(cookies, sessions);
        // console.log(session);
        res.cookie('sessionId', session.sessionId);
        location = '/guestBook';
      }
    }

    res.redirect(302, location);
    res.end();
  };

module.exports = { loginHandler, serveLoginPage };
