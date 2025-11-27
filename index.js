const selectFolder = require("./pickers/folder");
const selectFile = require("./pickers/file");

module.exports = {
  folder: selectFolder,
  file: selectFile,
  default: selectFolder
};
