const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, data) => {
  if (err) console.error(err.message);

  data.forEach((element) => {
    fs.stat(path.join(__dirname, 'secret-folder', element), (err, stats) => {
      if (!stats.isDirectory()) {
        const filename = element.slice(0, element.lastIndexOf('.'));
        const extension = path.extname(element).slice(1);
        const size = Math.round(stats.size / 1024)
        
        console.log(`${filename} - ${extension} - ${size} Kb`);
      }
    })
  })
});