const logoutHandler = sessions =>
  ({ method, cookies }, res, next) => {

    if (method === 'POST') {
      next();
      return;
    }

    const sessionId = cookies && cookies.sessionId;
    if (sessionId) {
      delete sessions[sessionId];
      res.clearCookie('sessionId', sessionId);
    }

    res.redirect(302, '/');
    res.end();
  };

exports.logoutHandler = logoutHandler;
