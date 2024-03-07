const express = require('express');
const router = express.Router();
const config = require('../utils/define.json')
const menus = require('../utils/menu.json')
const permissions = require('../utils/permissions.json')
const tokenSRC= config.configs.secrectK
const mysql = require('mysql2')
const mysqlP = require('mysql2/promise'); // Importando a versão de promessas do MySQL
const jwt = require('jsonwebtoken')
const cors = require('cors')
const util = require('util');
const mysqlx = require('mysql2/promise'); // Importe o pacote mysql2 com a interface de promessa
const { result } = require('lodash');
const { Console } = require('console');
const axios = require('axios')
const ambiente=config.configs.Ambiente
const qs = require('qs');
const multer = require('multer');
const imgsfolder = config.configs.UrlFolderImgs
const path = require('path');
const fs = require('fs');
const nodemailer= require('nodemailer')
const Linkpainel =config.configs.Linkpainel
const { exec } = require('child_process');
// dados de conexão ao bd base da aplicação 
var emailsSacFiliais= {}
const  emailSac = config.configs.emailSac
// config de envio de email 

// Configura o envio de email
const transporter = nodemailer.createTransport({
  host: config.configs.emailEnvio.host, // substitua pelo host do seu provedor de email
  port: config.configs.emailEnvio.port, // substitua pela porta adequada do seu provedor de email
  secure:config.configs.emailEnvio.secure, 
  auth: {
    user: emailenvio,
    pass: config.configs.emailEnvio.pass
  }
});
const saveHistory= async(status,user,protocol)=>{
   const connection = await mysqlP.createConnection(dataBd);
        console.log(`Connected to MySQL database Padrao.`);
       
       var sql=`INSERT INTO HISTORICO_CONCESSAO
                (PROTOCOLO,
                STATUS,
                USER_ACTION)
                VALUES
                ('${protocol}','${status}','${user}');`
       await connection.execute(sql);
       connection.end()
}

const sendMailPlus = async(emailTo,emailFrom,title, Mensagem)=>{
  var toX = emailTo
  var msg = Mensagem
  var fromX= emailFrom
  var title = title
  var agora = new Date();
  var dataAtual = `${agora.getFullYear()}-${('0' + (agora.getMonth() + 1)).slice(-2)}-${('0' + agora.getDate()).slice(-2)} as ${agora.getHours()}:${agora.getMinutes()}:${agora.getSeconds()}`;
  msg +=`<br> Email enviado ${dataAtual}`
  let mailOptions = {
    from: fromX,
    to: toX,
    subject: title,
    html: msg
  };
// console.log(mailOptions)
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      // console.log('Email enviado: ' + info.response);
      console.log(`email enviado para (${toX})`);
    }
  });
  
}


const dataBd={
  host: config.configs.databasePrime.host,
  user: config.configs.databasePrime.user,
  password: config.configs.databasePrime.pass,
  database: config.configs.databasePrime.db
}

// verifica se usuário já existe no bd
function VerifyExistUser(req, res, next) {
    let corpo = req.body
    let email=corpo.email
    var cnpj 
    
    
      var entrada = corpo.CPFCNPJ
  var apenasNumeros = entrada.replace(/\D/g, '');
  cnpj = apenasNumeros;
    
    let pass = corpo.senha
  // Faça a lógica de verificação do token no banco de dados aqui
  let connection = mysql.createConnection(dataBd)
  connection.connect((err) => {
      if (err) {

        console.error('Error connecting to MySQL database: ', err);
        return;
      }
      console.log('Connected to MySQL databaseAAA.');
    });
  
  let busca='select * from USUARIOS where (EMAIL="'+email+'" or CPFCNPJ="'+cnpj+'") and SENHA="'+pass+'"  and STATUS="1"';
  
    // console.log(busca)
    // process.exit()
  connection.query(busca,function (err, results, fields) {
    let total=results
    
       if (total.length === 0) {
         next();
      }else{
        console.log(total.length)
        return res.status(401).json({ error: 'Usuário ja cadastrado' });
      }
  })
  // Retorne true se o token estiver presente no banco de dados e false caso contrário
  connection.end(()=>{
    console.log('Conexão VerifyExistUser encerrada')
  })
}

const VerifyTokenSol =(req, res, next)=>{
  let token = req.headers.authorization;
// console.log(token)
  if (!token) {
    // Token não fornecido
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Verifique se o cabeçalho de autorização começa com "Bearer "
  if (token.startsWith('Bearer ')) {
    // Remova a substring "Bearer " do valor do token
    token = token.slice(7);
  }
  try {
    // Verifique a validade do token JWT
    const decoded = jwt.verify(token, tokenSRC);

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}



const VerifyToken = async (req, res, next) => {
    const body = req.body;
    let user = body.user;
    let pass = body.pass;
    var dataUser = await RegVerifyTokenClient(user, pass);

    if (dataUser === 'CNL') {
        return res.status(401).json({ error: 'Cliente não logado' });
    } else {
        let token = dataUser;
        try {
            const decoded = jwt.verify(token, tokenSRC);
            next();
        } catch (err) {
            return res.status(400).json({ error:'Token inválido'});
        }
    }
};

const VerifyDadosUser=(req, res, next)=>{
  let body= req.body
  console.log(body)
  let nomeRazao = body.nomeRazao
  let cpfCnpj = body.cpfCnpj
  let email = body.email
  let telefone = body.telefone
  let celular =  body.celular
  let responsavel = body.contato
  let senha = body.pass

  if (email==''| senha ==''| nomeRazao ==''|cpfCnpj ==''|telefone ==''|celular ==''| responsavel =='') {
    // console.log()
    res.status(400).send('Payload Inválido')
  }else{
    next()
  }
}


// Rota para /api/usuarios
router.post('/CreateUser',VerifyDadosUser,  VerifyExistUser, async (req, res, next) => {
  let body= req.body
  console.log(body)

  var cnpj  = body.cpfCnpj
  cnpj = cnpj.replace(/[.-/]/g, '');

   let payload={
    "nomeRazao": body.nomeRazao,
    "cpfCnpj" : cnpj,
    "email" : body.email,
    "telefone" : body.telefone,
    "celular" :  body.celular,
    "responsavel" : body.responsavel,
    "senha" : body.senha
    }
    let token = jwt.sign(payload, tokenSRC);
    payload.token=token

try{
  

 

let sqlM=`INSERT INTO USUARIOS (TOKEN,NOME,CPFCNPJ,EMAIL,SENHA,CELULAR,TELEFONE,CONTATO,GRUPO) 
                 VALUES("${token}","${body.nomeRazao}","${cnpj}","${body.email}","${body.senha}","${body.telefone}","${body.celular}","${body.responsavel}","CUSTOMER");`
      
            const connection = await mysqlP.createConnection(dataBd);
            console.log(`Connected to MySQL database Padrão.`);
            
            const [dadosRequest] = await connection.execute(sqlM);
            connection.end();
            SendMailNewClient(body.email,body.nomeRazao)
            res.status(200).json({"MSG":"Cadastro Realizado com sucesso!"});

}catch(error){
  console.log(error)
  res.status(400).json({"MSG":`Falha ao Criar usuario ${payload.cpfCnpj}`})
}
});

const RegVerifyTokenClient = async (user, pass) => {
  try {
    const agora = new Date();
    const dataAtual = `${agora.getFullYear()}-${('0' + (agora.getMonth() + 1)).slice(-2)}-${('0' + agora.getDate()).slice(-2)}`;

    const sqlClientReg = `
      SELECT * FROM LOGINREGISTER A
      LEFT JOIN (
        SELECT token, EMAIL, CPFCNPJ 
        FROM USUARIOS 
        WHERE (EMAIL = '${user}' OR CPFCNPJ = '${user}') AND SENHA = '${pass}'
      ) USX ON user = EMAIL OR user = CPFCNPJ
      WHERE user = '${user}'
      AND created_at BETWEEN '${dataAtual} 00:00:00' AND '${dataAtual} 23:30:00'
      ORDER BY id DESC 
      LIMIT 1
    `;

    const connection = mysql.createConnection(dataBd);
    connection.connect();

    const results = await new Promise((resolve, reject) => {
      connection.query(sqlClientReg, function (err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
        connection.end();
      });
    });

    if (results.length === 0) {
      return 'CNL';
    } else {
      console.log(results[0].token)
      return results[0].token;
    }
  } catch (error) {
    console.log("Falha ao verificar o usuário registrado:", error);
    throw error;
  }
};
//inicio das rotas da api 







//=============================================

router.use(cors())

module.exports = router;