const fs = require('fs');
const { Response } = require('./response.js');

const isRoot = (path) => path === '/';

const writeFile = (database, databaseContent) =>
  fs.writeFileSync(database, JSON.stringify(databaseContent), 'utf8');

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

const saveComment = (queries) => {
  const details = {};

  queries.forEach(({ fieldName, fieldValue }) => {
    details[fieldName] = fieldValue;
  });

  details.time = new Date().toLocaleString();
  return details;
};

const showComments = (response, databaseContent) => {
  const comments = [];

  for (const commentor in databaseContent) {
    const { time, name, comment } = databaseContent[commentor];
    comments.push(`${time}, ${name}, ${comment}`);
  }

  response.send(comments.join('\n'));
};

const comment = (queries, response) => {
  const database = './.data/comments.json';
  const databaseContent = JSON.parse(fs.readFileSync(database, 'utf8'));
  const details = saveComment(queries);

  databaseContent[details.name] = details;
  writeFile(database, databaseContent);
  showComments(response, databaseContent);

  // response.send('sign up successful.');
  return true;
};

const isHandlerInvalid = (handlers, handler, queries) =>
  !handlers[handler] || !queries.length;

const dynamicHandler = ({ resource, queries }, response) => {
  const handlers = { '/comment': comment };

  if (isHandlerInvalid(handlers, resource, queries)) {
    return false;
  }

  const handler = handlers[resource];
  return handler(queries, response);
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
