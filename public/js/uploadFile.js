/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const createName = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/xhrName');
  xhr.send();
  xhr.onload = () => {
    const nameElement = document.getElementById('name');
    const name = document.createElement('h2');
    nameElement.appendChild(name);

    name.innerText = JSON.parse(xhr.response).name;
  };
};

const getNumberOfFiles = function () {
  const files = this.files;
  const numberOfFiles = files.length;

  document.getElementById('fileNum').innerHTML = numberOfFiles;
};

const manipulateFiles = () => {
  const files = document.getElementById('uploadFile');
  files.addEventListener('change', getNumberOfFiles, false);
};

window.onload = manipulateFiles;
