const logoutHandler = sessions =>
  ({ url, method, cookies }, res, next) => {

    if (url.pathname !== '/logout' || method === 'POST') {
      next();
      return;
    }

    const sessionId = cookies && cookies.sessionId;
    if (sessionId) {
      delete sessions[sessionId];
      res.setHeader('Set-Cookie', 'sessionId=0;Max-Age=0');
    }

    res.statusCode = 302;
    res.setHeader('location', '/');
    res.end();
  };

exports.logoutHandler = logoutHandler;
