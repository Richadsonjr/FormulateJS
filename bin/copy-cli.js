const fs = require('fs');
const path = require('path');

const sourceFile = path.resolve(__dirname, 'cli.js');
const destFile = path.resolve(process.cwd(), 'cli.js');
console.log(`${sourceFile} -> ${destFile}`)
fs.copyFile(sourceFile, destFile, (err) => {
    if (err) {
        console.error('Erro ao copiar o arquivo cli.js:', err);
    } else {
        console.log('Arquivo cli.js copiado com sucesso.');
    }
});