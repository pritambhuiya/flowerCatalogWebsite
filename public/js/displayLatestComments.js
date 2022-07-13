/* eslint-disable no-undef */
const formatComment = ({ date, name, comment }) =>
  `${date} ${name}: ${comment}`;

const appendComment = (commentArea, comment) => {
  const commentLine = document.createElement('p');
  commentArea.appendChild(commentLine);

  const formattedComment = formatComment(comment);
  commentLine.innerText = formattedComment;
};

const createCommentArea = () => {
  const bodyElement = document.querySelector('body');
  const commentArea = document.createElement('div');
  bodyElement.appendChild(commentArea);

  commentArea.className = 'comment';
  commentArea.id = 'comments-area';
  return commentArea;
};

const hasErrorOccurred = (status) => status.toString().startsWith('4');

const removeOldComments = () => {
  const commentElement = document.querySelector('#comments-area');
  commentElement.remove();
};

const addAllComments = ({ response, status }) => {
  if (hasErrorOccurred(status)) {
    return;
  }
  removeOldComments();

  const commentArea = createCommentArea();
  const comments = JSON.parse(response);

  for (const aComment of comments) {
    appendComment(commentArea, aComment);
  }
};

const displayComment = () => {
  const xhr = new XMLHttpRequest();
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);

  xhr.onload = () => addAllComments(xhr);
  xhr.open('POST', '/guestBook');
  xhr.send(data);
  form.reset();
};

const add = () => {
  const submitElement = document.getElementById('submit');
  submitElement.addEventListener('click', displayComment);
};

window.onload = add;
