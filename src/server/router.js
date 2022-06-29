const createHandler = (handlers) => (request, response) => {
  const { method, url, headers } = request;
  request.requestLine = new URL(`HTTP://${headers.host}${url}`);
  console.log(method, request.requestLine.pathname);

  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
  return false;
};

module.exports = { createHandler };
