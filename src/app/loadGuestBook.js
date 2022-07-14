const fs = require('fs');

const loadGuestBook = (commentsFile, guestBookTemplateFile) =>
  (request, response, next) => {
    const existingComments = fs.readFileSync(commentsFile, 'utf8');
    request.comments = JSON.parse(existingComments);
    request.template = fs.readFileSync(guestBookTemplateFile, 'utf8');

    next();
  };

exports.loadGuestBook = loadGuestBook;
