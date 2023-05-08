const { LOADIPHLPAPI } = require('dns');
const fs = require('fs');
const path = require('path');

// CREATE project-dist FOLDER
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) console.error(err.message);
});
//----------------------------------------------------------------------------------------------

// CREATE MARKUP
fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
  if (err) console.error(err.message);
});

fs.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf-8' }, (err, data) => {
  if (err) console.error(err.message);
  
  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    if (err) console.error(err.message); 

    const compNames = files.map((file) => file.slice(0, file.indexOf('.')));
    const number = compNames.length - 1;

    compNames.forEach((component, index) => {
      fs.readFile(path.join(__dirname, 'components', `${component}.html`), { encoding: 'utf-8' }, (err, compData) => {
        if (err) console.error(err.message); 
        
        data = data.replaceAll(`{{${component}}}`, compData);
        
        if (index === number) {
          fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, (err) => {
            if (err) console.error(err.message);
          });
        }
      });
    });
  });
});
//----------------------------------------------------------------------------------------------

// BUILD CSS STYLES
fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
  if (err) console.error(err.message);
});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) console.error(err.message);

  files.forEach((file) => {
    fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
      if (err) console.error(err.message);

      if (!stats.isDirectory() && path.extname(file) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', file), (err, data) => {
          if (err) console.error(err.message);

          fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {
            if (err) console.error(err.message);
          });
        })
      }
    });
  });
});
//----------------------------------------------------------------------------------------------

// COPY ASSETS FOLDER
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
  if (err) console.error(err.message);
});

fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
  if (err) console.error(err.message);

  files.forEach((file) => {
    const srcPath = path.join(__dirname, 'assets', file);
    const destPath = path.join(__dirname, 'project-dist', 'assets', file);
    
    fs.stat(srcPath, (err, stats) => {
      if (err) console.error(err.message);

      if (stats.isDirectory()) {
        copyDirectory(srcPath, destPath, file);
      } else {
        fs.copyFile(srcPath, destPath, (err) => {
          if (err) console.error(err.message);
        });
      }
    });
  });
});
//----------------------------------------------------------------------------------------------
function copyDirectory(folderPath, where, name) {
  fs.mkdir(where, { recursive: true }, (err) => {
    if (err) console.error(err.message);
  });
  
  fs.readdir(folderPath, (err, files) => {
    if (err) console.error(err.message);
  
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const destPath = path.join(where, file);
      
      fs.stat(filePath, (err, stats) => {
        if (err) console.error(err.message);

        if (stats.isDirectory()) {
          copyDirectory(filePath, destPath, file);
        } else {
          fs.copyFile(filePath, destPath, (err) => {
            if (err) console.error(err.message);
          });
        }
      });
    });
  });
}
//----------------------------------------------------------------------------------------------