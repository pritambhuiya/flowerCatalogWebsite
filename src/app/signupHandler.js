const fs = require('fs');

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
  (userDetails, userDetailsFile) => {
    userDetails.date = new Date().toLocaleString();
    const register = JSON.parse(fs.readFileSync(userDetailsFile, 'utf8'));

    register[userDetails.username] = userDetails;
    fs.writeFileSync(userDetailsFile, JSON.stringify(register), 'utf8');
  };

const serveSignUpPage = (req, res) => {
  res.set('content-type', 'text/html');
  res.end(serveSignupPage());
};

const signupHandler = (userDetailsFile) =>
  ({ body }, res) => {
    const { name, username, password } = body;
    let location = '/signup';

    if (name && username && password) {
      storeUserDetails(body, userDetailsFile);
      location = '/';
    }

    res.status(302).location(location);
    res.end();
  };

module.exports = { signupHandler, serveSignUpPage };
