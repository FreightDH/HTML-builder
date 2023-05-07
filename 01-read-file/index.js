const fs = require('fs');
const path = require('path');

const stream = new fs.ReadStream(path.join(__dirname, 'text.txt'));

stream.on('data', (data) => {
  data = data.toString();
  process.stdout.write(data);
});

stream.on('error', err => {
  console.error(err.message);
});