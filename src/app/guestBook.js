const fs = require('fs');

const formatComments = (comments) => {
  let formattedComments = '';

  comments.forEach(({ date, name, comment }) => {
    formattedComments += `<p>${date} ${name}: ${comment}</p>`;
  });
  return formattedComments;
};

const parseComment = ({ url }) => {
  const rawComment = url.searchParams.entries();
  const comment = {};
  comment.date = new Date().toLocaleString();

  for (const [fieldName, fieldValue] of rawComment) {
    comment[fieldName] = fieldValue;
  }
  return comment;
};

const storeComment = (comments, latestComment) => {
  comments.unshift(latestComment);
  fs.writeFileSync('.data/comments.json', JSON.stringify(comments), 'utf8');
};

const updateGuestBook = (comments) => {
  const template = fs.readFileSync('.data/template.html', 'utf8');
  const formattedComments = formatComments(comments);

  const html = template.replace('__COMMENTS__', formattedComments);
  fs.writeFileSync('public/guestBook.html', html, 'utf8');
};

const isRequestLineInvalid = ({ url, method }) =>
  url.pathname !== '/comment' || method !== 'GET';

const addComment = (latestComment, comments, response) => {
  if (latestComment.name && latestComment.comment) {
    storeComment(comments, latestComment);
    updateGuestBook(comments);
  }

  response.statusCode = 301;
  response.setHeader('Content-type', 'text/html');
  response.setHeader('Location', 'guestBook.html');
  response.end();
  return true;
};

const guestBook = (comments) => (request, response) => {
  if (isRequestLineInvalid(request)) {
    return false;
  }

  const latestComment = parseComment(request);
  return addComment(latestComment, comments, response);
};

module.exports = { guestBook };
