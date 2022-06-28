const fs = require('fs');
const { Response } = require('./response.js');
const { comment } = require('./comment.js');

const isRoot = (path) => path === '/';

const fileHandler = ({ resource }, response) => {

  try {
    const path = isRoot(resource) ? '/homepage.html' : resource;
    const filePath = './public' + path;
    const body = fs.readFileSync(filePath);

    response.send(body);
    return true;

  } catch (error) {
    return false;
  }
};

const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.send('404 not found');
  return true;
};

const isHandlerInvalid = (handlers, handler) => !handlers[handler];

const dynamicHandler = (request, response) => {
  const { resource } = request;
  const handlers = { '/comment': comment };

  if (isHandlerInvalid(handlers, resource)) {
    return false;
  }

  const handler = handlers[resource];
  return handler(request, response);
};

const isMethodGet = (method) => method === 'GET';

const requestValidator = ({ method }, response) => {
  if (isMethodGet(method)) {
    return false;
  }

  response.statusCode = 403;
  response.send('403 Forbidden');
  return true;
};

const handleRequest = (request, socket) => {
  const response = new Response(socket, request);
  const handlers =
    [requestValidator, fileHandler, dynamicHandler, notFoundHandler];

  handlers.forEach((handler) => {
    if (handler(request, response)) {
      return true;
    }
  });
};

module.exports = { handleRequest, fileHandler };
