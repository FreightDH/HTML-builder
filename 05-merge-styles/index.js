const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'test-files', 'bundle.css'), '', (err) => {
  if (err) console.error(err.message);
});

fs.readdir(path.join(__dirname, 'test-files','styles'), (err, files) => {
  if (err) console.error(err.message);

  files.forEach((file) => {
    fs.stat(path.join(__dirname, 'test-files','styles', file), (err, stats) => {
      if (err) console.error(err.message);

      if (!stats.isDirectory() && path.extname(file) === '.css') {
        fs.readFile(path.join(__dirname, 'test-files','styles', file), (err, data) => {
          if (err) console.error(err.message);

          fs.appendFile(path.join(__dirname, 'test-files', 'bundle.css'), data, (err) => {
            if (err) console.error(err.message);
          });
        })
      }
    });
  });
});