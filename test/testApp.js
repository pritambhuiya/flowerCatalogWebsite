const request = require('supertest');

const { createApp } = require('../src/app.js');
const { GuestBook } = require('../src/app/guestBook.js');

describe('Testing app', () => {
  let app;
  beforeEach(() => {
    const sessions = {};
    const config = {
      resource: './public',
      commentsFile: 'test/testData/comments.json',
      userDetails: 'test/testData/userDetails.json',
      guestBookTemplateFile: 'template/template.html'
    };

    const guestBook = new GuestBook(config.commentsFile, config.guestBookTemplateFile);

    guestBook.loadComments();
    app = createApp(config, sessions, guestBook);
  });

  describe('Not found handler', () => {
    it('Should say 404 not found if resource is /unknown', (done) => {
      request(app)
        .get('/unknown')
        .expect('content-type', /html/)
        .expect(404, done);
    });
  });

  describe('serveFileContent', () => {
    it('Should serve index.html if resource is /', (done) => {
      request(app)
        .get('/')
        .expect(/Flower Catalog/)
        .expect('content-type', /html/)
        .expect(200, done);
    });

    it('Should serve ageratum.html if resource is /ageratum.html', (done) => {
      request(app)
        .get('/ageratum.html')
        .expect(/Ageratum/)
        .expect('content-type', /html/)
        .expect(200, done);
    });
  });

  describe('/guestBook', () => {
    it('Should serve guestBook if method is GET',
      (done) => {
        request(app)
          .get('/guestBook')
          .expect(/guestBook/)
          .expect(200, done);
      });

    it('Should response as bad request if method is POST and name or comment is not provided',
      (done) => {
        request(app)
          .post('/guestBook')
          .expect(400, done);
      });

    it('Should add comment if method is POST and name and comment are provided',
      (done) => {
        request(app)
          .post('/guestBook')
          .send('name=sai&comment=Hi')
          .expect(200, done);
      });
  });

  describe('/signup', () => {
    it('Should serve signup page if method is GET',
      (done) => {
        request(app)
          .get('/signup')
          .expect(/Sign up/)
          .expect('content-type', /html/)
          .expect('content-length', '473')
          .expect(200, done);
      });

    it('Should redirect to index if method is POST and name, username and password are given',
      (done) => {
        request(app)
          .post('/signup')
          .send('name=sai&username=sai&password=1234')
          .expect('location', '/')
          .expect(302, done);
      });

    it('Should redirect to signup if method is POST and name, username or password are not given',
      (done) => {
        request(app)
          .post('/signup')
          .expect('location', '/signup')
          .expect(302, done);
      });
  });

  describe('/logout', () => {
    it('Should redirect to index page if method is GET and session is not present',
      (done) => {
        request(app)
          .get('/logout')
          .expect('location', '/')
          .expect(302, done);
      });

    it('Should redirect to index page and delete session if method is GET and session is present',
      (done) => {
        request(app)
          .get('/logout')
          .set('cookie', 'sessionId=1234')
          .expect('set-cookie', 'sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT')
          .expect('location', '/')
          .expect(302, done);
      });
  });

  describe('/login', () => {
    it('Should serve login page if method is GET and session is present',
      (done) => {
        request(app)
          .get('/login')
          .expect(/login/)
          .expect(200, done);
      });

    it('Should redirect to guestBook if method is POST and session is present',
      (done) => {
        request(app)
          .post('/login')
          .set('cookie', 'sessionId=1234')
          .send('username=sai&password=1234')
          .expect('location', '/guestBook')
          .expect(302, done);
      });

    it('Should redirect to guestBook page if method is POST and session is not present',
      (done) => {
        request(app)
          .post('/login')
          .send('username=sai&password=1234')
          .expect('location', '/guestBook')
          .expect(302, done);
      });

    it('Should redirect to login if method is POST and session is not present and username or password is not present',
      (done) => {
        request(app)
          .post('/login')
          .set('cookie', 'sessionId=1234')
          .send('')
          .expect('location', '/login')
          .expect(302, done);
      });
  });
});
