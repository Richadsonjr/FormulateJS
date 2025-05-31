<<<<<<< HEAD
FormulateJS
===========

Framework simples para aplicações Full-Stack em Node.js. O objetivo do FormulateJS é acelerar o desenvolvimento de CRUDs, relatórios, API's e interfaces dinâmicas a partir da estrutura do banco de dados.

🚀 Instalação
-------------

```
npm install formulatejs
npx create-formulatejs
```

Esse comando `npx create-formulatejs` prepara a estrutura inicial da aplicação com pastas e arquivos padrões.

📦 Funcionalidades
------------------

| Nome                  | Descrição                                                                                   |
|-----------------------|---------------------------------------------------------------------------------------------|
| `MailSender`          | Envia e-mails utilizando `nodemailer` com configuração personalizada.                       |
| `DateFormatter`       | Utilitários para formatação de datas e horas.                                               |
| `Report`              | Cria botões e estruturas de relatório dinâmico.                                             |
| `DocumentFormatter`   | Formata documentos como CPF, CNPJ, RG, CNH, telefone e celular.                             |
| `CurrencyFormatter`   | Formata valores monetários (R\$, \$, €) com casas decimais e separadores.                   |
| `ActionButtons`       | Cria botões de ação (editar, excluir, visualizar) com estilização.                          |
| `LoadReport`          | Carrega relatórios dinamicamente via URL e parâmetros.                                      |
| `TableActions`        | Gera ações interativas sobre tabelas HTML (clicks, botões, etc.).                           |
| `FormGenerator`       | Gera formulários HTML com base em metadados do banco de dados (genérico).                   |
| `FormGeneratorMySQL`  | Gera formulários a partir da estrutura de tabelas do MySQL.                                 |
| `FormGeneratorMSSQL`  | Gera formulários a partir da estrutura de tabelas MSSQL.                                    |
| `FormGeneratorSQLite` | Gera formulários a partir da estrutura de tabelas SQLite.                                   |
| `MakeaFormsDB`        | Cria arquivos de configuração com campos e botões para cada tabela do banco.               |
| `makeFormView`        | Gera HTML de visualização de formulário.                                                    |
| `saveHTMLView`        | Salva o HTML gerado do formulário no sistema de arquivos.                                   |
| `MakeaTableDB`        | Cria arquivos de configuração para tabelas.                                                 |
| `makeTableView`       | Gera HTML de visualização de tabela.                                                        |
| `saveHTMLTableView`   | Salva a visualização HTML de uma tabela.                                                    |


📁 Exemplos de uso
------------------

### `MailSender`

```
const { MailSender } = require('formulatejs');
const mailer = new MailSender({ host: 'smtp.exemplo.com', port: 587, secure: false, auth: { user: 'user', pass: 'pass' } });
await mailer.sendMail({ to: 'alguem@exemplo.com', subject: 'Assunto', text: 'Mensagem' });
```

### `DateFormatter`

```
const { DateFormatter } = require('formulatejs');
console.log(DateFormatter.format('2024-12-25')); // 25/12/2024
```

### `Report`

```
const { Report } = require('formulatejs');
const html = Report.createButton('Exportar', '/export');
```

### `DocumentFormatter`

```
const { DocumentFormatter } = require('formulatejs');
console.log(DocumentFormatter.formatCPF('12345678901'));
```

### `CurrencyFormatter`

```
const { CurrencyFormatter } = require('formulatejs');
console.log(CurrencyFormatter.format(1234.56)); // R$ 1.234,56
```

### `ActionButtons`

```
const { ActionButtons } = require('formulatejs');
const html = ActionButtons.generate('editar', 1);
```

### `LoadReport`

```
const { LoadReport } = require('formulatejs');
LoadReport('/api/relatorio', { filtro: 'ativo' });
```

### `TableActions`

```
const { TableActions } = require('formulatejs');
TableActions.attachListeners('minhaTabela');
```

### `FormGenerator`

```
const { FormGenerator } = require('formulatejs');
FormGenerator.generateFromMetadata({ table: 'usuarios', fields: ['nome', 'email'] });
```

### `FormGeneratorMySQL`

```
const { FormGeneratorMySQL } = require('formulatejs');
const formGen = new FormGeneratorMySQL({ host: 'localhost', user: 'root', database: 'app' });
formGen.generateForm('clientes').then(console.log);
```

### `FormGeneratorMSSQL`

```
const { FormGeneratorMSSQL } = require('formulatejs');
const formGen = new FormGeneratorMSSQL({ user: 'sa', password: 'pass', server: 'localhost', database: 'app' });
formGen.generateForm('produtos').then(console.log);
```

### `FormGeneratorSQLite`

```
const { FormGeneratorSQLite } = require('formulatejs');
const formGen = new FormGeneratorSQLite('./app.db');
formGen.generateForm('usuarios').then(console.log);
```

### `MakeaFormsDB`

```
const { MakeaFormsDB } = require('formulatejs');
const maker = new MakeaFormsDB();
maker.create('clientes', ['nome', 'email']);
```

### `makeFormView` e `saveHTMLView`

```
const { makeFormView, saveHTMLView } = require('formulatejs');
const html = makeFormView({ nome: 'Nome' });
saveHTMLView('form-clientes.html', html);
```

### `MakeaTableDB`

```
const { MakeaTableDB } = require('formulatejs');
const tableMaker = new MakeaTableDB();
tableMaker.create('clientes', ['nome', 'email']);
```

### `makeTableView` e `saveHTMLTableView`

```
const { makeTableView, saveHTMLTableView } = require('formulatejs');
const html = makeTableView([{ nome: 'João' }, { nome: 'Maria' }]);
saveHTMLTableView('clientes.html', html);
```

🤝 Contribuições
----------------

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

📄 Licença
----------

Este projeto está licenciado sob a Licença MIT.
=======
# FJS - Framework JavaScript

Framework para desenvolvimento web com classes utilitárias para facilitar o desenvolvimento de aplicações.


## Instalação:
# inicie uma nova aplicação node.js 
```bash

  npm init -y

```
# Baixe o framework FormulateJS.
```bash
 npm i formulatejs
 ```
# Faça a instalação do Framework

 ```bash
    npx create-formulatejs
 ```



## Classes Disponíveis

### 1. MailSender
Classe para envio de emails utilizando nodemailer.

```javascript
const mailer = new MailSender({
    host: 'smtp.exemplo.com',
    port: 587,
    secure: false,
    auth: {
        user: 'seu-email@exemplo.com',
        pass: 'sua-senha'
    }
});

await mailer.sendMail(
    'destinatario@exemplo.com',
    'remetente@exemplo.com',
    'Assunto do Email',
    'Conteúdo do email em HTML'
);
```

### 2. Report
Classe para criar botões de relatório.

```javascript
const report = new Report(
    'elementoPai',    // ID do elemento onde o botão será inserido
    'nomeElemento',   // Nome do elemento
    'funcaoRelatorio', // Nome da função a ser chamada
    'primary',        // Cor do botão (opcional)
    'Gerar Relatório', // Texto do botão
    'bi bi-file-earmark-text' // Ícone (opcional)
);

report.makeLink();
```

### 3. DateFormatter
Classe para formatação de datas.

```javascript
const formatter = new DateFormatter('2024-03-20');
const resultado = formatter.startFormatter();

if (resultado.isValid) {
    console.log(resultado.formattedDateTime); // 20/03/2024 00:00:00
}
```

### 4. DocumentFormatter
Classe para formatação de documentos brasileiros.

```javascript
const doc = new DocumentFormatter('12345678901');

console.log(doc.formatCPF());      // 123.456.789-01
console.log(doc.formatCNPJ());     // 12.345.678/0001-90
console.log(doc.formatRG());       // 12.345.678-9
console.log(doc.formatCNH());      // 123.456.789-01
console.log(doc.formatTelefone()); // (11) 9999-9999
console.log(doc.formatCelular());  // (11) 99999-9999
```

### 5. CurrencyFormatter
Classe para formatação de valores monetários.

```javascript
const money = new CurrencyFormatter('1234.56');

console.log(money.brl()); // R$ 1.234,56
console.log(money.usd()); // $1,234.56
console.log(money.eur()); // 1.234,56 €
```

### 6. ActionButtons
Classe para criar botões de ação em elementos específicos.

```javascript
const actions = new ActionButtons('elementoPai', {
    edit: true,
    del: true,
    view: true
});

actions.makeButtons();
```

### 7. LoadReport
Classe para criar e gerenciar tabelas de dados.

```javascript
const report = new LoadReport(
    'Título da Tabela',
    ['Coluna1', 'Coluna2', 'Coluna3'],
    [
        { Coluna1: 'Dado1', Coluna2: 'Dado2', Coluna3: 'Dado3' },
        { Coluna1: 'Dado4', Coluna2: 'Dado5', Coluna3: 'Dado6' }
    ],
    'mytable',
    'S', // Habilitar edição
    'S', // Habilitar visualização
    'S', // Habilitar exportação
    'Exportar' // Nome do botão de exportação
);

report.printSimpleTable();
report.makeDtTables();
```

### 8. TableActions
Classe para adicionar botões de ação em tabelas.

```javascript
const tableActions = new TableActions({
    edit: true,
    del: true,
    view: true,
    editFunction: 'minhaFuncaoEditar',
    delFunction: 'minhaFuncaoDeletar',
    viewFunction: 'minhaFuncaoVisualizar'
});

tableActions.addActionsToTable('mytable');
```

### 9. FormGenerator
Classe para geração automática de formulários e tabelas baseadas na estrutura do banco de dados.

```javascript
// Inicialização
const formGenerator = new FormGenerator('./src', {
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'meubanco'
});

// Gerar configurações de formulários
await formGenerator.MakeaFormsDB();

// Gerar configurações de tabelas
await formGenerator.MakeaTableDB();

// Gerar HTML de um formulário
const formHTML = await formGenerator.makeFormView('usuarios', 'new');

// Gerar HTML de uma tabela
const tableHTML = await formGenerator.makeTableView('usuarios');

// Salvar HTML do formulário
await formGenerator.saveHTMLView('./output', 'usuarios', 'new');

// Salvar HTML da tabela
await formGenerator.saveHTMLTableView('./output', 'usuarios');
```

## Dependências

- Bootstrap 5
- Bootstrap Icons
- jQuery
- DataTables
- Nodemailer
- MySQL2

## Instalação

```bash
npm install
```

## Uso

```html
<!-- Inclua os arquivos necessários -->
<link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="bootstrap-icons.css">
<link rel="stylesheet" href="dataTables.bootstrap5.min.css">

<script src="jquery.min.js"></script>
<script src="bootstrap.bundle.min.js"></script>
<script src="jquery.dataTables.min.js"></script>
<script src="dataTables.bootstrap5.min.js"></script>
<script src="core.js"></script>
```

## Licença

MIT
>>>>>>> 7a7339d8af9a2228acf0d620d15f2daca4e838d5
