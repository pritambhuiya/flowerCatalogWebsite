const formatComment = (response) => {
  const { date, name, comment } = JSON.parse(response);
  return `${date} ${name}: ${comment}`;
};

const addComment = ({ response }) => {
  const commentElement = document.querySelector('#comments-area');
  const commentLine = document.createElement('p');
  commentElement.prepend(commentLine);

  const formattedComment = formatComment(response);
  commentLine.innerText = formattedComment;
};

const displayComment = () => {
  const xhr = new XMLHttpRequest();
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);

  xhr.onload = () => addComment(xhr);
  xhr.open('POST', '/guestBook');
  xhr.send(data);
  form.reset();
};

const add = () => {
  const submitElement = document.getElementById("submit");
  submitElement.addEventListener("click", displayComment);
};

window.onload = add;

