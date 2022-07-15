const bodyParser = (request, response, next) => {
  if (request.method !== 'POST') {
    next();
    return;
  }

  let data = '';
  request.on('data', (chunk) => data += chunk);

  request.on('end', () => {
    request.bodyParams = new URLSearchParams(data);
    next();
  });
};

exports.bodyParser = bodyParser;
