<<<<<<< HEAD
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
=======
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
>>>>>>> 7a7339d8af9a2228acf0d620d15f2daca4e838d5
});