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
  response.send('not found');
  return true;
};

const isHandlerInvalid = (handlers, handler, queries) =>
  !handlers[handler] || !queries.length;

const dynamicHandler = (request, response) => {
  const { resource, queries } = request;
  const handlers = { '/comment': comment };

  if (isHandlerInvalid(handlers, resource, queries)) {
    return false;
  }

  const handler = handlers[resource];
  return handler(request, response);
};

const handleRequest = (request, socket) => {
  const response = new Response(socket, request);
  const handlers = [fileHandler, dynamicHandler, notFoundHandler];

  handlers.forEach((handler) => {
    if (handler(request, response)) {
      return true;
    }
  });
};

module.exports = { handleRequest, fileHandler };
