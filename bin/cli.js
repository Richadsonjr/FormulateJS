#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const tar = require('tar');

const tarballUrl = 'https://registry.npmjs.org/formulatejs/-/formulatejs-1.0.25.tgz'; // Substitua pelo URL do tarball correto

const downloadFile = (url, dest) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(resolve);
        });
    }).on('error', error => {
        fs.unlink(dest);
        reject(error);
    });
});

// const extractTarball = async(tarballPath, destDir) => {
//     await tar.x({
//         file: tarballPath,
//         cwd: destDir,
//     });
// };

// const extractTarball = async(tarballPath, destDir) => {
//     await tar.x({
//         file: tarballPath,
//         cwd: destDir,
//         strip: 1, // Ignora o primeiro diretório (package)
//     });
// };

const extractTarball = async(tarballPath, destDir) => {
    await tar.x({
        file: tarballPath,
        cwd: destDir,
        strip: 1, // Ignora o primeiro diretório (package)
        filter: (path, entry) => {
            // Ignora os arquivos README.md, cli.js e copy-cli.js
            return !['README.md', 'cli.js', 'copy-cli.js'].includes(path);
        }
    });
};


async function downloadAndExtract() {
    try {
        // Diretório de destino para os arquivos extraídos
        const currentDir = process.cwd(); // Diretório atual
        console.log(currentDir)
        const destinationDir = path.resolve(currentDir); // Pasta de destino dentro de node_modules
        // console.log(destinationDir)

        // Nome do arquivo tarball (última parte do URL)
        const tarballFilename = path.basename(tarballUrl);

        console.log('Baixando tarball...');

        // Baixar o tarball
        await downloadFile(tarballUrl, tarballFilename);

        console.log('Extraindo arquivos...');

        // Extrair o tarball
        await extractTarball(tarballFilename, destinationDir);

        // Remover o arquivo tarball após extração (opcional)
        fs.unlinkSync(tarballFilename);

        console.log('Arquivos extraídos com sucesso.');

    } catch (error) {
        console.error('Ocorreu um erro ao baixar e extrair os arquivos:', error);
    }
}

// Chamar a função para realizar o download e extração dos arquivos quando o script for executado
downloadAndExtract();