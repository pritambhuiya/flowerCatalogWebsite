const { createApp } = require('./src/app.js');

const main = () => {
  const sessions = {};
  const config = {
    resource: 'public',
    userDetails: '.data/userDetails.json',
    commentsFile: '.data/comments.json',
    guestBookTemplateFile: 'template/template.html'
  };

  const app = createApp(config, sessions);
  const PORT = 8000;
  app.listen(PORT, console.log('Started listening on 8000'));
};

main();
