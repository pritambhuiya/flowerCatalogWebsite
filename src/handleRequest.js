const fs = require('fs');
const { Response } = require('./response.js');

const isRoot = (path) => path === '/';

const writeInJson = (database, databaseContent) =>
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

const getComments = (databaseContent) => {
  const comments = [];

  for (const commentor in databaseContent) {
    const { time, name, comment } = databaseContent[commentor];
    comments.unshift(`<p>${time}, ${name}: ${comment}</p>`);
  }

  return comments;
};

const displayComments = (response, databaseContent) => {
  const comments = getComments(databaseContent);
  const formattedComments = comments.join('\n');

  const guestBook = fs.readFileSync('./.data/template.html', 'utf8');
  const guestBookPage = guestBook.replace('__COMMENTS__', formattedComments);
  response.send(guestBookPage);
};

const comment = (queries, response) => {
  const database = './.data/comments.json';
  const databaseContent = JSON.parse(fs.readFileSync(database, 'utf8'));
  const details = saveComment(queries);

  if (!details.name || !details.comment) {
    return false;
  }

  databaseContent[details.name] = details;
  writeInJson(database, databaseContent);
  displayComments(response, databaseContent);

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
