const fs = require('fs');

class GuestBook {
  #templateFile;
  #commentsFile;
  #comments;
  #template;

  constructor(commentsFile, templateFile) {
    this.#templateFile = templateFile;
    this.#commentsFile = commentsFile;
  }

  loadComments() {
    const existingComments = fs.readFileSync(this.#commentsFile, 'utf8');
    this.#comments = JSON.parse(existingComments);
    this.#template = fs.readFileSync(this.#templateFile, 'utf8');
  }

  storeComment(latestComment) {
    this.#comments.unshift(latestComment);
    fs.writeFileSync(this.#commentsFile, JSON.stringify(this.#comments), 'utf8');
  }

  #formatComments() {
    let formattedComments = '';

    this.#comments.forEach(({ date, name, comment }) => {
      formattedComments += `<p>${date} ${name}: ${comment}</p>`;
    });
    return formattedComments;
  }

  serveGuestBook() {
    const formattedComments = this.#formatComments();
    return this.#template.replace('__COMMENTS__', formattedComments);
  }

  getComments() {
    return JSON.stringify(this.#comments);
  }
}

module.exports = { GuestBook };
