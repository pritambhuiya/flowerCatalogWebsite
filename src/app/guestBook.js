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

const storeComment =
  (comments, latestComment, commentsFile, { writeFileSync }) => {
    comments.unshift(latestComment);
    writeFileSync(commentsFile, JSON.stringify(comments), 'utf8');
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

const addComment = ({ bodyParams, comments }, res, commentsFile, fs) => {
  const { name, comment } = getParams(bodyParams);

  if (!name || !comment) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Need to provide name and comment');
    return;
  }

  const latestComment = createComment(name, comment);
  storeComment(comments, latestComment, commentsFile, fs);
  res.end(JSON.stringify(comments));
};

const guestBook = (commentsFile, fs) => (req, res, next) => {
  const { url, method } = req;
  if (url.pathname !== '/guestBook') {
    next();
    return;
  }

  if (method === 'GET') {
    serveGuestBook(req, res);
    return;
  }

  addComment(req, res, commentsFile, fs);
};

module.exports = { guestBook, getParams };
