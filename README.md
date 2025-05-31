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
