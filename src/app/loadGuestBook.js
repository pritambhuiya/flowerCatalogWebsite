const loadGuestBook = ({ readFileSync }) =>
  (request, response, next) => {
    const existingComments = readFileSync('.data/comments.json', 'utf8');
    request.comments = JSON.parse(existingComments);
    request.template = readFileSync('template/template.html', 'utf8');

    next();
  };
exports.loadGuestBook = loadGuestBook;
