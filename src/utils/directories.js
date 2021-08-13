const fs = require('fs');
const path = require('path');

// @ desc - function will check if a directory exists,
// and create it if it doesn't
const checkDirectory = (directory, callback) => {
  fs.stat(directory, function (err) {
    //Check if error defined and the error code is "not exists"
    if (err && err.code === 'ENOENT') {
      //Create the directory, call the callback.
      fs.mkdirSync(directory, { recursive: true });
      callback();
    } else {
      //just in case there was a different error:
      callback(err);
    }
  });
};
// @ desc - delete all of the files in the
// given directory
const clearFolder = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
};

module.exports.checkDirectory = checkDirectory;
module.exports.clearFolder = clearFolder;
