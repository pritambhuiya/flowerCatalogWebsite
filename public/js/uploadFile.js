/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

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
