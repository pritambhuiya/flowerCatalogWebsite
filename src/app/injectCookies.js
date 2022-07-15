const parseCookie = (cookie) => {
  const cookies = {};
  const rawCookies = cookie.split(';');

  rawCookies.forEach(rawCookie => {
    const [field, value] = rawCookie.split('=');
    cookies[field] = value;
  });

  return cookies;
};

const injectCookies = (req, res, next) => {
  const { cookie } = req.headers;
  if (cookie) {
    const parsedCookies = parseCookie(cookie);
    req.cookies = parsedCookies;
  }

  next();
};

exports.injectCookies = injectCookies;
