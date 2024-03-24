const express = require('express');
const router = express.Router();
const mysql = require('mysql2')
const mysqlP = require('mysql2/promise'); // Importando a versão de promessas do MySQL
const jwt = require('jsonwebtoken')
const cors = require('cors')
const util = require('util');
const { result } = require('lodash');
const { Console } = require('console');
const axios = require('axios')

const qs = require('qs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer')
    // const Linkpainel = config.configs.Linkpainel
const { exec } = require('child_process');

const {
    MakeaFormsDB,
    makeFormView,
    saveHTMLView,
    MakeaTableDB,
    makeTableView,
    saveHTMLTableView
} = require("rich-forms-br")
const {
    sendMailPlus,
    exportTable,
    FormataValorBRL,
    removerCaracteresEspeciais,
    removerItensDuplicados,
    isEmailValid,
    Dataextenso,
    getdateNow,
    formataDataBR,
    FormataCPFCNPJView,
    mascaraCPFCNPJ,
    mascaraTelefone
} = require("rich-utils-br")

// dados de conexão ao bd base da aplicação 
const moment = require('moment-timezone');
// Defina o fuso horário para São Paulo
moment.tz.setDefault('America/Sao_Paulo');


const config = require('../utils/define.json')
const menus = require('../utils/menu.json')
const permissions = require('../utils/permissions.json')
const tokenSRC = config.configs.secrectK


const dataBd = {
    host: config.configs.databasePrime.host,
    user: config.configs.databasePrime.user,
    password: config.configs.databasePrime.pass,
    database: config.configs.databasePrime.db
}


//inicio das rotas da api 
// gera os arquivos de view para cada tabela com arquivo de configuração gerado. 
router.post('/MakeaViewFile', async(req, res) => {
    try {
        var directoryPath = config.configs.path.configTableview;

        // Lendo o conteúdo do diretório
        fs.readdir(directoryPath, function(err, files) {
            if (err) {
                return console.log('Erro ao ler o diretório: ' + err);
            }

            // Iterando sobre os arquivos e imprimindo seus nomes
            files.forEach(async function(file) {
                let namefile = file
                namefile = namefile.replace('.json', '')
                await saveHTMLTableView(config.configs.path.TableViewExport, directoryPath, namefile)
            });
        });


        var directoryPath2 = config.configs.path.configFormView;

        // Lendo o conteúdo do diretório
        fs.readdir(directoryPath2, function(err, files) {
            if (err) {
                return console.log('Erro ao ler o diretório: ' + err);
            }

            // Iterando sobre os arquivos e imprimindo seus nomes
            files.forEach(async function(file) {
                let namefile = file
                namefile = namefile.replace('.json', '')
                    // console.log(namefile)
                await saveHTMLView(config.configs.path.FormViewExport, directoryPath2, namefile, 'edit')
            });
        });

        res.status(200).send('Arquivos de configuração criados com sucesso.')
    } catch (error) {
        console.log(error)
        res.status(400).json({
            "msg": "Falha ao criar arquivos de configuração.",

        })
    }
})


// gera os arquivos de configuração 
router.post('/MakeaConfigData', async(req, res) => {
    try {
        await MakeaFormsDB(config.configs.path.configFormView, dataBd)
        await MakeaTableDB(config.configs.path.configTableview, dataBd)
        res.status(200).send('Arquivos de configuração criados com sucesso.')
    } catch (error) {
        console.log(error)
        res.status(400).json({
            "msg": "Falha ao criar arquivos de configuração.",

        })
    }
})



router.post('/getaformview', async(req, res) => {
    const { table, operation } = req.body
    try {
        let response = await makeFormView(config.configs.path.configFormView, table, operation)
        res.status(200).json({ "form": response })
    } catch (error) {
        console.log(error)
        res.status(400).send('Falha ao obter dados HTML')
    }

})

router.post('/getatableview', async(req, res) => {
    const { table } = req.body
    try {
        let response = await makeTableView(config.configs.path.configTableview, `Table_${table}`)
        res.status(200).json({ "form": response })
    } catch (error) {
        console.log(error)
        res.status(400).send('Falha ao obter dados HTML')
    }

})

//=============================================

router.use(cors())

module.exports = router;