const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;

stdout.write('Hello! Enter some text below:\n');
fs.writeFile(path.join(__dirname, 'text.txt'), '', err => {
  if (err) console.error(err.message);
});

stdin.on('data', data => {
  const text = data.toString();
  
  if (text.trim() === 'exit') exit();
  
  fs.appendFile(path.join(__dirname, 'text.txt'), text, err => {
    if (err) console.error(err.message);
  });
});

process.on('exit', () => {
  stdout.write('Have a nice day!\n');
});

process.on('SIGINT', () => {
  stdout.write('\n');
  exit();
});