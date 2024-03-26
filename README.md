### FormulateJS
FormulateJS é uma estrutura de pastas base para criação de aplicações Node.js, projetada para fornecer uma organização eficiente e consistente para seus projetos. 
Tem a finalidade de acelerar o desenvolvimento de aplicações web de forma fácil, para que qualquer programador somente com o básico de JavaScript possa operar o 
framework sem dificuldade evitando curvas de aprendizagem longas cansativas.

## Instalação:
# inicie uma nova aplicação node.js 
```bash

  npm init -q

```
# Baixe o framework FormulateJS de forma global.
```bash
 npm i -g formulatejs
 ```
# Faça a instalação do Framework

 ```bash
    npx create-formulatejs
 ```

A estrutura é composta pelos seguintes elementos:
## Arquivo app.js:
O arquivo principal da aplicação, responsável por conter as URLs das páginas principais (como login, home, esqueci minha senha, novo cadastro, etc.), bem como as configurações do roteador e SSL.

## Pasta Public:
Esta pasta contém os recursos do frontend da aplicação, incluindo:

# src: 
Um repositório para arquivos CSS e JavaScript, fornecendo a base para o estilo e interatividade da aplicação.
pages: Um repositório para as páginas que compõem a aplicação, facilitando a organização e manutenção do código do frontend.
# reports:
Um repositório para armazenar relatórios gerados pela aplicação.
## Pasta API:
Esta pasta contém os arquivos de backend e as configurações da API, incluindo:

# utils: 
Um repositório para arquivos JSON de configuração, permitindo a personalização e ajustes na configuração da aplicação.
# routes: 
Contém o arquivo do roteador da aplicação, que gerencia as rotas e controla o fluxo de requisições no backend.

FormulateJS oferece uma estrutura clara e intuitiva para o desenvolvimento de aplicações Node.js, facilitando o gerenciamento de código e permitindo um desenvolvimento mais eficiente e organizado.

**MakeaFormsDB:** Esta função cria arquivos de configuração com campos e botões para cada tabela do banco de dados fornecido.
**makeFormView:** Gera HTML para uma visualização de formulário com base nos dados de entrada.
**saveHTMLView:** Salva o HTML gerado em um arquivo no sistema de arquivos.
**MakeaTableDB:** Cria arquivos de configuração para visualizações de tabela.
**makeTableView:** Gera HTML para uma visualização de tabela.
**saveHTMLTableView:** Salva o HTML gerado para a visualização de tabela em um arquivo no sistema de arquivos.


**Fluxo Principal:**

-- A função MakeaFormsDB é chamada para criar arquivos de configuração com campos e botões para cada tabela do banco de dados.
-- A função makeFormView é chamada para gerar a visualização do formulário.
-- A função saveHTMLView é chamada para salvar o HTML gerado em um arquivo.
Similarmente, funções semelhantes são usadas para tabelas.

Processamento de Dados:

O código faz uso extensivo de consultas SQL para obter informações sobre as tabelas e campos do banco de dados.
Com base nessas informações, ele gera configurações de campos e botões para as visualizações de formulário e tabela.
Manipulação de Arquivos:

A biblioteca utiliza o módulo fs para manipulação de arquivos, incluindo verificação de existência, escrita e leitura de arquivos.
Em resumo, esta biblioteca é útil para automatizar a geração de formulários e visualizações de tabela para um banco de dados MySQL, simplificando o processo de desenvolvimento web para aplicativos que interagem com bancos de dados.

### Instalação
Para usar esta library, primeiro você precisa instalá-la em seu projeto. Você pode fazer isso usando npm:

```bash
npm install Rich-Forms-br
```

###Funções Disponíveis
```JavaScript
MakeaFormsDB(srcRoot, dataConection, opc)
```
Esta função gera um arquivo de configuração com os campos e botões para cada tabela do banco de dados indicado no objeto de configuração.

**srcRoot**: O caminho raiz onde os arquivos serão criados.
dataConection: Os detalhes da conexão com o banco de dados.
**opc**: Uma opção opcional.
###MakeaTableDB
```JavaScript
MakeaTableDB(srcRoot, dataConection, opc)
```
Esta função gera um arquivo de configuração com os campos para a view de tabela no objeto de configuração.

**srcRoot**: O caminho raiz onde os arquivos serão criados.
**dataConection**: Os detalhes da conexão com o banco de dados.
Abaixo segue o exemplo de dados de conexão:
```JSON
var conection = {
    host: 'ip_servidor',
    user: 'usuário',
    password: 'senha',
    database: 'Nome DB'
}
```
**opc**: Uma opção opcional.
###makeFormView
```JavaScript
makeFormView(url, view, operation)
```
Esta função gera o HTML da tabela informada para inclusão ou edição.

**url**: O caminho para a pasta onde o arquivo JSON de configuração está localizado.
**view**: A view da tabela para a qual o HTML será gerado.
**operation**: A operação a ser realizada ('new' ou 'edit').
###makeTableView
```JavaScript
makeTableView(url, view, operation)
```
Esta função gera o HTML da tabela informada para visualização.

**url**: O caminho para a pasta onde o arquivo JSON de configuração está localizado.
**view**: A view da tabela para a qual o HTML será gerado.
**Operation**: A operação a ser realizada ('new' ou 'edit').

###saveHTMLView
```JavaScript
saveHTMLView(outputSRC, URLInput, view, operation)
```
Esta função gera e salva um arquivo HTML na pasta indicada.

**outputSRC**: O caminho onde o arquivo HTML será salvo.
**URLInput**: O caminho para a pasta onde o arquivo JSON de configuração está localizado.
**view**: A view da tabela para a qual o HTML será gerado.
**operation**: A operação a ser realizada ('new' ou 'edit').

###saveHTMLTableView
```JavaScript
saveHTMLTableView(outputSRC, URLInput, view)
```
Esta função gera e salva um arquivo HTML da tabela na pasta indicada.

**outputSRC**: O caminho onde o arquivo HTML será salvo.
**URLInput**: O caminho para a pasta onde o arquivo JSON de configuração está localizado.

**view**: A view da tabela para a qual o HTML será gerado.
###Exemplo de Uso
```javascript
const { MakeaFormsDB, saveHTMLView } = require('nomedalib');

const srcRoot = './caminho/para/os/arquivos';
const dataConection = {
  host: 'localhost',
  user: 'root',
  password: 'senha',
  database: 'meubanco'
};

MakeaFormsDB(srcRoot, dataConection);
saveHTMLView(srcRoot, './caminho/para/o/arquivo.json', 'minhaView', 'new');


### Endpoint: **/MakeaViewFile**

*   **Descrição:** Este endpoint é responsável por criar arquivos de visualização (HTML) com base nos arquivos de configuração presentes nos diretórios **configTableview** e **configFormView**.
    
*   **Método HTTP:** POST
    
*   **Parâmetros:**
    
    *   Nenhum parâmetro é necessário.
        
*   **Resposta:**
    
    *   **Status 200 OK:** Retorna uma mensagem indicando que os arquivos de configuração foram criados com sucesso.
        
    *   **Status 400 Bad Request:** Retorna uma mensagem de erro em caso de falha ao criar os arquivos de configuração.
        

### Endpoint: **/MakeaConfigData**

*   **Descrição:** Este endpoint é responsável por gerar os arquivos de configuração com base nos dados fornecidos.
    
*   **Método HTTP:** POST
    
*   **Parâmetros:**
    
    *   Nenhum parâmetro é necessário.
        
*   **Resposta:**
    
    *   **Status 200 OK:** Retorna uma mensagem indicando que os arquivos de configuração foram criados com sucesso.
        
    *   **Status 400 Bad Request:** Retorna uma mensagem de erro em caso de falha ao criar os arquivos de configuração.
        

### Endpoint: **/getaformview**

*   **Descrição:** Este endpoint é responsável por obter uma visualização de formulário HTML com base no nome da tabela e na operação especificada.
    
*   **Método HTTP:** POST
    
*   **Parâmetros:**
    
    *   **table**: O nome da tabela.
        
    *   **operation**: A operação a ser realizada (por exemplo, "editar", "inserir", etc.).
        
*   **Resposta:**
    
    *   **Status 200 OK:** Retorna o formulário HTML correspondente à tabela e à operação especificadas.
        
    *   **Status 400 Bad Request:** Retorna uma mensagem de erro em caso de falha ao obter os dados HTML.
        

### Endpoint: **/getatableview**

*   **Descrição:** Este endpoint é responsável por obter uma visualização de tabela HTML com base no nome da tabela especificada.
    
*   **Método HTTP:** POST
    
*   **Parâmetros:**
    
    *   **table**: O nome da tabela.
        
*   **Resposta:**
    
    *   **Status 200 OK:** Retorna a visualização da tabela HTML correspondente ao nome da tabela especificado.
        
    *   **Status 400 Bad Request:** Retorna uma mensagem de erro em caso de falha ao obter os dados HTML.

    ## Utilitários

### sendMailPlus
- **Descrição:** Realiza o envio de e-mails utilizando a biblioteca nodemailer.
- **Exemplo de uso:**
  ```javascript
      const  transporter ={
        host: '',
        port: '',
        secure: '',
        auth: {
          user: '',
          pass: ''
        }
      };

  var msg = 'msg de teste';
  sendMailPlus('emailPara@email.com', 'emailDe@email2.com', 'Nova Solicitação email!', msg,transporter);

### exportTable

**Descrição:** Faz a exportação de uma tabela html que esteja utilizando o plugn datatables.

**Exemplo de Uso:**
```javascript
    exportTable('pedidosOCX', 'CSV', 'Pedido OCX, Pedido V11, Status V11, Split, Data, Cliente, Valor, Form. Pgto', 'PedidosOCX', 'N', 6);
```

**Parametros:** 
1°: id da tabela a ser exportada

2°: formato de exportação 

3°:Titulo das Colunas do arquivo 

4°:Titulo do arquivo

5°: S para remover coluna de opções ou N para não remover.

6°: Indice da coluna onde contem valores monetarios BR. 

7°: tipo de separador das colunas em caso de CSV. 
se não passado, é atribuido como default o separador ','

8°: objeto com as configurações de acesso do email a ser utilizado para envio.

### FormataValorBRL
- **Descrição:** Converte valores monetários do padrão americano para o padrão brasileiro.
- **Exemplo de uso:** 
  ```javascript
  FormataValorBRL(3000.00); // Retorna R$3.000,00
### removerCaracteresEspeciais
- **Descrição:** Remove caracteres especiais de uma string passada como parâmetro.

### removerCaracteresEspeciais
- **Descrição:** Remove caracteres especiais de uma string passada como parâmetro.
- **Exemplo de uso:** 
  ```javascript
  removerCaracteresEspeciais('Não quero mais caracteres especiais!!!%$*~^`;') 
  // Retorna 'Nao quero mais caracteres especiais!!!;'```

### removerItensDuplicados
- **Descrição:** Recebe um array como parâmetro e remove os itens duplicados, retornando um novo array simplificado.
- **Exemplo de uso:** 
  ```javascript
  var array1 = [1, 2, 2, 5, 1, 7, 5];
  removerItensDuplicados(array1); // Retorna [1, 2, 5, 7]

### isEmailValid
- **Descrição:** Verifica se o email passado por parâmetro é válido.
- **Exemplo de uso:** 
  ```javascript
  isEmailValid('email@gmail.com');```

### Dataextenso
- **Descrição:** Traz a data atual por extenso.
- **Exemplo de uso:** 
  ```javascript
  Dataextenso(); // Retorno: 'terça-feira, 5 de março de 2024'```

### getdateNow
- **Descrição:** Retorna a data e hora atual no padrão americano.```

- **Exemplo de uso:** 
  ```javascript
  getdateNow();
  ```
  ### formataDataBR
- **Descrição:** Formata a data e hora passada como parâmetro do padrão americano para o padrão brasileiro.
- **Exemplo de uso:** 
  ```javascript
  formataDataBR('2024-01-01 12:55:00'); // Retorno: '01/01/2024, 12:55:00'
  ```

### FormataCPFCNPJView
- **Descrição:** Retorna CPF ou CNPJ com máscara (Utilizado em Views).
- **Exemplo de uso:** 
  ```javascript
  FormataCPFCNPJView('20649397096'); // Retorno: '206.493.970-96'
  ```
### mascaraCPFCNPJ
- **Descrição:** Aplica máscara de CPF ou CNPJ em um input passado como parâmetro.
- **Exemplo de uso:** 
  ```javascript
  const cpfInput = document.getElementById('CPf');
  mascaraCPF(cpfInput);
  ```

### mascaraTelefone
- **Descrição:** Aplica máscara de telefone ou celular em um input passado como parâmetro.
- **Exemplo de uso:** 
  ```javascript
  const telefoneInput = document.getElementById('inputTelefone');
  mascaraTelefone(telefoneInput);
```
