/* eslint-disable max-len */
// const fs = require('fs');
// const { serveFileContent, notFoundHandler } = require('./app/handlers.js');
const { notFoundHandler, serveFileContent } = require('./app/handlers.js');

const { createHandler } = require('./server/router.js');
const { guestBook } = require('./app/guestBook.js');

const existingComments = fs.readFileSync('.data/comments.json', 'utf8');
const parsedComments = JSON.parse(existingComments);

// const handlers = [serveFileContent, guestBook(parsedComments), notFoundHandler];
const handlers = [notFoundHandler];
const requestHandler = createHandler(handlers);

module.exports = { requestHandler };
