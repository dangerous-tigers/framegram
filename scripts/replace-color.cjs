const { join } = require('node:path');
const fs = require('fs');
const fsp = fs.promises;

const dirWithIcons = 'assets/icons/components';

async function main() {
  const files = await fsp.readdir(dirWithIcons);
  files.forEach(async (file) => {
    const filePath = join(dirWithIcons, file);
    const fileContent = await fsp.readFile(filePath, 'utf-8');
    const newFileContent = fileContent.replaceAll('#fff', 'currentcolor');
    fsp.writeFile(filePath, newFileContent);
  });
}

void main();
