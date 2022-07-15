const fs = require('fs');
const CRLF = Buffer.from('\r\n');

const filterArgs = (headerBodyPair) =>
  headerBodyPair.filter(element => element);

const parseHeaders = (rawHeaders) => {
  const headers = {};

  rawHeaders.forEach((header) => {
    const [field, value] = header.split('=');
    const splittedValues = value.trim().split('"');

    headers[field.trim()] = filterArgs(splittedValues)[0];
  });

  return headers;
};

const extractHeaders = (headersString) =>
  headersString.replaceAll(':', '=').replaceAll(',', ';');

const parseBodyContent = (rawBodyContents) => {
  const CRLFPosition = rawBodyContents.slice(1).indexOf(CRLF + CRLF);
  const rawHeaders = rawBodyContents.slice(0, CRLFPosition + 1);
  const headersString = rawHeaders.toString().replaceAll(CRLF, ';');

  const headersArray = extractHeaders(headersString).split(';');
  const filteredHeaders = filterArgs(headersArray);
  const headers = parseHeaders(filteredHeaders);

  const bodyStartingPosition = CRLFPosition + (2 * CRLF.length) + 1;
  const fileContent = rawBodyContents.slice(bodyStartingPosition);
  return { headers, fileContent };
};

const parseBody = (content) => {
  const CRLFPosition = content.indexOf(CRLF);
  const boundary = content.slice(0, CRLFPosition);
  const body = content.slice(CRLFPosition);

  const boundaryPosition = body.indexOf(boundary);
  const bodyContents = body.slice(0, boundaryPosition);

  const { headers, fileContent } = parseBodyContent(bodyContents);
  return { boundary, headers, fileContent };
};

const multiPartHandler = (req, res) => {
  const data = [];
  req.on('data', chunk => data.push(chunk));

  req.on('end', () => {
    req.formData = parseBody(Buffer.concat(data));
    const { headers, fileContent } = req.formData;
    const filePath = '.upload/' + headers.filename;

    fs.writeFileSync(filePath, fileContent);
    res.end('Uploaded successfully');
  });
};

const uploadFile = `<html>
<head>
  <title>Upload File</title>
  <script src="js/uploadFile.js"></script>
</head>
<body>
  <div id="name"></div>
  <form action="/uploadFile" method="post" enctype="multipart/form-data">
    <div>
      <input id="uploadFile" type="file" name="myFiles">
      selected files: <span id="fileNum">0</span>;
    </div>
    <div><input type="submit" value="Submit"></div>
  </form>
</body>
</html>`;

const serveUploadFile = (req, res) => {
  res.end(uploadFile);
  return 0;
};

module.exports = { multiPartHandler, serveUploadFile };
