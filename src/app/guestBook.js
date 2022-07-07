/* eslint-disable complexity */
/* eslint-disable max-statements */
const fs = require('fs');

const formatComments = ({ comments }) => {
  let formattedComments = '';

  comments.forEach(({ date, name, comment }) => {
    formattedComments += `<p>${date} ${name}: ${comment}</p>`;
  });
  return formattedComments;
};

const getParams = (rawParams) => {
  const params = {};
  for (const [fieldName, fieldValue] of rawParams.entries()) {
    params[fieldName] = fieldValue;
  }
  return params;
};

const storeComment = (comments, latestComment) => {
  comments.unshift(latestComment);
  fs.writeFileSync('.data/comments.json', JSON.stringify(comments), 'utf8');
};

const createComment = (name, comment) => {
  const date = new Date().toLocaleString();
  return { name, comment, date };
};

const serveGuestBook = (req, res) => {
  const formattedComments = formatComments(req);
  const html = req.template.replace('__COMMENTS__', formattedComments);

  res.setHeader('Content-type', 'text/html');
  res.end(html);
};

const addComment = ({ bodyParams, comments }, res) => {
  const { name, comment } = getParams(bodyParams);
  if (!name || !comment) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Need to provide name and comment');
    return;
  }

  const latestComment = createComment(name, comment);
  storeComment(comments, latestComment);

  res.statusCode = 302;
  res.setHeader('Location', '/guestBook');
  res.end();
};

const guestBook = (req, res, next) => {
  const { url, method } = req;
  if (url.pathname === '/guestBook' && method === 'GET') {
    serveGuestBook(req, res);
    return;
  }

  if (url.pathname === '/add-comment' && method === 'POST') {
    addComment(req, res);
    return;
  }

  next();
};

module.exports = { guestBook };
