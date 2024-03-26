const fs = require('fs');
const path = require('path');

const sourcePath = './cli.js'; // Caminho relativo para o cli.js
const destinationPath = path.join(process.cwd(), 'cli.js'); // Caminho para onde o cli.js será copiado (pasta raiz do projeto)

if (fs.existsSync(sourcePath)) {
    fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err) {
            console.error('Erro ao copiar o arquivo cli.js:', err);
        } else {
            console.log('Arquivo cli.js copiado com sucesso para', destinationPath);
        }
    });
} else {
    console.error('O arquivo cli.js não foi encontrado.');
}