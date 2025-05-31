<<<<<<< HEAD
const express =  require('express')
const path = require('path');
const app = express()
const router = express.Router();
const routes = require('./api/routes/router');
const cors = require('cors')
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    
    next();
  });
  
app.use((err, req, res, next) => {
    if (err) {
        return res.status(200).json({ error: err.message || 'Erro interno do servidor' });
    }
    next(err);
});

app.use(cors())
// chama as rotas de api internas 
app.use('/api/',routes)


app.listen(3002,()=>{
    console.log("rodando da porta 3002")
})

// https.createServer({
//     cert: fs.readFileSync('./public/server.crt'),
//     key: fs.readFileSync('./public/server.key')
// }, app).listen(443, ()=> console.log("Rodando em https"));

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(__dirname + '/public'));


// app.use(express.static(path.join(__dirname, 'public')));

const oneWeekInSeconds = 604800000; // 7 dias em milissegundos
app.use(express.static(publicDirectoryPath, { maxAge: oneWeekInSeconds }));

// Rotas publicas (acessadas pelo navegador)===========================================================

// rota que solicita o codigo do funcionario(motorista)
app.get('/',(req, res)=>{
      res.sendFile(path.join(__dirname, 'public', 'login.html'));
})



=======
const express =  require('express')
const path = require('path');
const app = express()
const router = express.Router();
const routes = require('./api/routes/router');
const cors = require('cors')
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    
    next();
  });
  
app.use((err, req, res, next) => {
    if (err) {
        return res.status(200).json({ error: err.message || 'Erro interno do servidor' });
    }
    next(err);
});

app.use(cors())
// chama as rotas de api internas 
app.use('/api/',routes)


app.listen(3002,()=>{
    console.log("rodando da porta 3002")
})

// https.createServer({
//     cert: fs.readFileSync('./public/server.crt'),
//     key: fs.readFileSync('./public/server.key')
// }, app).listen(443, ()=> console.log("Rodando em https"));

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(__dirname + '/public'));


// app.use(express.static(path.join(__dirname, 'public')));

const oneWeekInSeconds = 604800000; // 7 dias em milissegundos
app.use(express.static(publicDirectoryPath, { maxAge: oneWeekInSeconds }));

// Rotas publicas (acessadas pelo navegador)===========================================================

// rota que solicita o codigo do funcionario(motorista)
app.get('/',(req, res)=>{
      res.sendFile(path.join(__dirname, 'public', 'login.html'));
})



>>>>>>> 7a7339d8af9a2228acf0d620d15f2daca4e838d5
