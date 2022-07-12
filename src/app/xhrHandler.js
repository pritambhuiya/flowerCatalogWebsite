const xhrHandler = (req, res, next) => {
  if (req.url.pathname === '/xhrName') {
    res.end(JSON.stringify({ name: 'Sai' }));
    return;
  }

  next();
};

exports.xhrHandler = xhrHandler;
