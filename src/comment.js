const fs = require('fs');

const writeInJson = (database, databaseContent) =>
  fs.writeFileSync(database, JSON.stringify(databaseContent), 'utf8');

const parseComment = (queries) => {
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

const comment = ({ queries }, response) => {
  const database = './.data/comments.json';
  const databaseContent = JSON.parse(fs.readFileSync(database, 'utf8'));
  const details = parseComment(queries);

  if (!details.name || !details.comment) {
    return false;
  }

  databaseContent[details.name] = details;
  writeInJson(database, databaseContent);
  displayComments(response, databaseContent);

  return true;
};

module.exports = { comment };
