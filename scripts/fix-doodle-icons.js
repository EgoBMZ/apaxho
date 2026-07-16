const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'node_modules', 'react-doodle-icons', 'dist');

function walk(currentDir) {
  if (!fs.existsSync(currentDir)) {
    console.log(`Directory not found: ${currentDir}`);
    return;
  }
  const files = fs.readdirSync(currentDir);
  files.forEach(file => {
    const filePath = path.join(currentDir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.mjs') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('"clip-path"')) {
        console.log(`Fixing clip-path in: ${filePath}`);
        content = content.replace(/"clip-path"/g, '"clipPath"');
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

walk(dir);
console.log('Finished fixing react-doodle-icons clip-path issue.');
