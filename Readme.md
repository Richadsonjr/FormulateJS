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