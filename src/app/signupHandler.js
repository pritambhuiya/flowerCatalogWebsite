const { getParams } = require('./guestBook.js');

const serveSignupPage = () => `<html>
<head>
  <title>Sign up</title>
</head>
<body>
  <h1>Sign up</h1>
  <form action="/signup" method="post">
    <label for="name">name:</label>
    <input type="text" name="name" id="name"><br>
    <label for="username">username:</label>
    <input type="text" name="username" id="username"><br>
    <label for="password">password:</label>
    <input type="password" name="password" id="password"><br>
    <input type="submit" value="Submit">
  </form>
</body>
</html>`;

const storeUserDetails =
  (userDetails, userDetailsFile, { readFileSync, writeFileSync }) => {
    userDetails.date = new Date().toLocaleString();
    const register = JSON.parse(readFileSync(userDetailsFile, 'utf8'));

    register[userDetails.username] = userDetails;
    writeFileSync(userDetailsFile, JSON.stringify(register), 'utf8');
  };

const signupHandler = (userDetailsFile, fs) =>
  ({ url, method, bodyParams }, res, next) => {
    if (url.pathname !== '/signup') {
      next();
      return;
    }

    if (method === 'GET') {
      res.setHeader('content-type', 'text/html');
      res.end(serveSignupPage());
      return;
    }

    if (method === 'POST') {
      const userDetails = getParams(bodyParams);
      const { name, username, password } = userDetails;
      let location = '/signup';

      if (name && username && password) {
        storeUserDetails(userDetails, userDetailsFile, fs);
        location = '/';
      }

      res.statusCode = 302;
      res.setHeader('location', location);
      res.end();
    }
  };

exports.signupHandler = signupHandler;
