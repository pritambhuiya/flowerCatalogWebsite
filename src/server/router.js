const router = (request, response, handlers) => {
  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
  return false;
};

const createHandler = (handlers) => (request, response) => {
  const { method, url, headers } = request;
  request.url = new URL(`HTTP://${headers.host}${url}`);

  console.log(method, request.url.pathname);
  router(request, response, handlers);
};

module.exports = { createHandler };
