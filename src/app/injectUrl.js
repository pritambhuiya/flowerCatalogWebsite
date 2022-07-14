const injectUrl = (req, res, next) => {
  const { url, headers } = req;
  req.url = new URL(`HTTP://${headers.host}${url}`);
  next();
};

module.exports = { injectUrl };