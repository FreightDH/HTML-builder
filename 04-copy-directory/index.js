const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) console.error(err.message);
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) console.error(err.message);

  fs.readdir(path.join(__dirname, 'files-copy'), (err, copyFiles) => {
    if (err) console.error(err.message);

    copyFiles.forEach(element => {
      if (!files.includes(element)) {
        fs.rm(path.join(__dirname, 'files-copy', element), (err) => {
          if (err) console.error(err.message);
        });
      }
    });
  });

  files.forEach((file) => {
    fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
      if (err) console.error(err.message);
    });
  });
});