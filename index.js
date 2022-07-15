const { createApp } = require('./src/app.js');
const { GuestBook } = require('./src/app/guestBook.js');

const main = () => {
  const sessions = {};
  const config = {
    resource: 'public',
    userDetails: '.data/userDetails.json',
    commentsFile: '.data/comments.json',
    guestBookTemplateFile: 'template/template.html'
  };

  const guestBook = new GuestBook(config.commentsFile, config.guestBookTemplateFile);

  guestBook.loadComments();

  const app = createApp(config, sessions, guestBook);
  const PORT = 8000;
  app.listen(PORT, console.log('Started listening on 8000'));
};

main();
