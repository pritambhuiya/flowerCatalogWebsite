const injectSession = sessions => (req, res, next) => {
  if (!req.cookies?.sessionId) {
    next();
    return;
  }

  const { sessionId } = req.cookies;
  const session = sessions[sessionId];

  if (session) {
    req.session = session;
  }
  next();
};

exports.injectSession = injectSession;
