const { join } = require('node:path');
const fs = require('fs');
const fsp = fs.promises;

const dirWithIcons = 'assets/icons/components';

async function main() {
  const files = await fsp.readdir(dirWithIcons);
  files.forEach(async (file) => {
    const filePath = join(dirWithIcons, file);
    const fileContent = await fsp.readFile(filePath, 'utf-8');
    let newFileContent = fileContent.replaceAll('#fff', 'currentcolor');

    const viewBoxMatch = newFileContent.match(/viewBox=["']0 0 (\d+(\.\d+)?) (\d+(\.\d+)?)["']/);

    if (viewBoxMatch) {
      const width = viewBoxMatch[1];
      const height = viewBoxMatch[3];

      newFileContent = newFileContent
        .replace(/width=["']1em["']/, `width={${width}}`)
        .replace(/height=["']1em["']/, `height={${height}}`);
    }

    fsp.writeFile(filePath, newFileContent);
  });
}

void main();
