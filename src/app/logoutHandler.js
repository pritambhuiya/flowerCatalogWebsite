const logoutHandler = sessions =>
  ({ url, method, cookies }, res, next) => {

    if (url !== '/logout' || method === 'POST') {
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
