const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.setHeader('Content-type', 'text/plain');
  response.end('NOT FOUND');
};

module.exports = { notFoundHandler };
