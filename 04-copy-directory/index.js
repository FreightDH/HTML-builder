const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) console.error(err.message);
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) console.error(err.message);

  files.forEach((file) => {
    fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
      if (err) console.error(err.message);
    });
  });
});