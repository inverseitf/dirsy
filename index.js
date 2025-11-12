const selectFolder = require("./pickers/folder");

// future 
async function selectFile(title = "Select a file") {
  throw new Error("selectFile() is not yet implemented in dirsy v1.");
}

module.exports = {
  folder: selectFolder,
  file: selectFile,
  default: selectFolder
};
