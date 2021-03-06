# TODO
- [ ] Implement login feature before accessing guestBook
- [ ] Implement signup feature if username and password doesn't match with database
- [ ] Read all comments in server and client and write differences (3rd approach)
- [ ] Don't upload if no file is chosen
- [ ] Upload multiple files 
- [ ] Upload files with other fields
- [ ] Apply css properly
 - [ ] Homepage
 - [ ] Abeliophyllum
 - [ ] Ageratum
 - [ ] Guest Book

# MAYBE
- [ ] Consider pulling creation of app in before in test 
- [ ] Consider if comments or user details files are empty
- [ ] Consider removing guestBook.html 
- [ ] Consider removing homepage.html
- [ ] Refactor guestBook
- [ ] Refactor signupHandler
- [ ] Refactor loginHandler
- [ ] Extract comment entity 

# DONE 
- [x] Test for login if session is already present 
- [x] Implement router
- [x] Extracted serveUploadFile function
- [x] Extracted serveLoginPage function
- [x] Extracted serveSignUp function
- [x] Extracted addComments function
- [x] Extracted serveGuestBook function
- [x] Implement apiHandler for comments
- [x] Remove server.js, router.js, bodyParser.js, serveStaticFile.js, notFoundHandler.js
- [x] Replace bodyParser using use express.urlEncoded
- [x] Replace handlers 
- [x] Consider renaming homepage.css to index.css
- [x] Consider renaming homepage.html to index.html
- [x] Implement serveStaticContent
- [x] Use logger as middleWare
- [x] Replace server using express
- [x] Verify express exists
- [x] Separate testData
- [x] Redirect to login page if name or password is not given in login page
- [x] Extract guestBook entity 
- [x] Consider injectUrl as handler
- [x] Test app
  - [x] NotFoundHandler 
  - [x] serveFileContent 
  - [x] /guestBook 
  - [x] /signUp 
  - [x] /logout 
  - [x] /login 
- [x] Install mocha
- [x] Install supertest
- [x] Pass config, log, fs from outside
- [x] Make a link from homepage to uploadFile
- [x] Implement multiPartHandler and xhrHandler
- [x] Reorganize directory structure
 - [x] css 
 - [x] frontEnd js 
 - [x] template
 - [x] Upload file
- [x] Read all comments and replace (2nd approach)
- [x] Reset formData
- [x] Implement xhr while loading comments(1st approach only append latest comment)
- [x] Implement link of logout in guestBook
- [x] Implement link of login, signup in homepage
- [x] Implement closure for serveFileContent
- [x] Implement signup handler
- [x] Move signup into signupHandler.js
- [x] Implement logout
- [x] Move logout into logoutHandler.js
- [x] Move login into loginHandler.js
- [x] Implement login
- [x] Move injectSession into injectSession.js
- [x] Implement injectSession
- [x] Move injectCookies into injectCookies.js
- [x] Implement injectCookies
- [x] Create separate file for handlers
- [x] Implement POST method
  - [x] NotFoundHandler
  - [x] serveFileHContent handler
  - [x] guestBookHandler
- [x] Move notFound and serveFileHandler into handlers
- [x] Created getMimeType
- [x] Extract updateGuestBook
- [x] Extract storeComment
- [x] Extract parseComment
- [x] Extract addComment
- [x] Replace guestBook.html after generated new comments
- [x] Redirect comments into guestBook page
- [x] Implement redirection
- [x] Store comments in file
- [x] Store comments in array
- [x] Move guestBook handler into guestBook.js
- [x] Return false from guestBook when 
 - [x] method not get
 - [x] resource is not comment
- [x] Make a closure of guest book
- [x] Reorganized server and created router
- [x] Implement guestBook
- [x] Use npm
- [x] Implement serveFileContent
- [x] set requestLine in request.requestLine 
- [x] Extract createServer
- [x] Set header
 - [x] Content-length
 - [x] Content-type
- [x] Implement notFoundHandler
- [x] Use URL 
- [x] Use http 
- [x] Queries are optional
- [x] Should only work for GET method
- [x] Maintain contract of handler in comment
- [x] Consider renaming saveComment to parseComment
- [x] Show error if name or comment is empty 
- [x] Handle comment
  - [x] Store comment in json
  - [x] Add date
  - [x] Display in guestBook
- [x] Implement download
- [x] Create html for guestBook
- [x] Create css for guestBook
- [x] Create links to homepage
- [x] Create links for homepage
- [x] Create the html of ageratum
- [x] Create the css of ageratum
- [x] Create the css of abeliophyllum
- [x] Create the html of abeliophyllum
- [x] Create the html of firstPage
- [x] Create the css for the first page
- [x] Download data in .data
- [x] Create public
- [x] Copy from server/
  - [x] server.js
  - [x] parseRequest.js 
  - [x] handleRequest.js 
  - [x] response.js
- [x] Make the server run
