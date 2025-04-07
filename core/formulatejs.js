const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

class MailSender {
  constructor(transporterConfig) {
    this.transporter = nodemailer.createTransport(transporterConfig);
  }

  async sendMail(emailTo, emailFrom, title, message) {
    const agora = new Date();
    const dataAtual = `${agora.getFullYear()}-${('0' + (agora.getMonth() + 1)).slice(-2)}-${('0' + agora.getDate()).slice(-2)} às ${agora.getHours()}:${agora.getMinutes()}:${agora.getSeconds()}`;
    
    message += `<br> Email enviado ${dataAtual}`;

    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: title,
      html: message
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email enviado para (${emailTo}): ${info.response}`);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }
  }
}

class Report {
    constructor(elementoPai, elementoName, functionName, color_btn='primary', labelreport, icon = null) {
      this.elementoPai = elementoPai;
      this.elementoName = elementoName;
      this.functionName = functionName;
      this.color_btn = color_btn;
      this.labelreport = labelreport;
      this.icon = icon ? `<i class="${icon}"></i> ` : ''; // Corrigido para inicializar antes do uso
  
      // Criação do elemento principal
      this.report = document.createElement('button');
      this.report.setAttribute('class', `btn btn-sm btn-${color_btn} btnReport`);
      this.report.setAttribute('id', `BTN_${this.elementoName}`);
      this.report.setAttribute('onclick', `${this.functionName}()`);
      this.report.innerHTML = `${this.icon}${this.labelreport}`;
    }
  
    makeLink() {
      const destino = document.getElementById(this.elementoPai);
  
      if (!destino) {
        console.error(`Elemento pai com ID "${this.elementoPai}" não encontrado.`);
        return;
      }
  
      destino.appendChild(this.report); // Adiciona o elemento ao DOM
    }
  }

class DateFormatter {
    constructor(input) {
        this.input = input;
        this.formats = [
            { regex: /^\d{4}-\d{2}-\d{2}$/, format: "YYYY-MM-DD" }, // ISO
            { regex: /^\d{2}\/\d{2}\/\d{4}$/, format: "DD/MM/YYYY" }, // BR
            { regex: /^\d{2}-\d{2}-\d{4}$/, format: "DD-MM-YYYY" }, // Variantes
            { regex: /^\d{2}\/\d{2}\/\d{2}$/, format: "DD/MM/YY" }, // BR abreviado
            { regex: /^\d{4}\/\d{2}\/\d{2}$/, format: "YYYY/MM/DD" }, // Outro
        ];
    }

    startFormatter() {
        for (const { regex, format } of this.formats) {
            if (regex.test(this.input)) {
                try {
                    let date;
                    if (format === "YYYY-MM-DD" || format === "YYYY/MM/DD") {
                        date = new Date(this.input + "T00:00:00"); // Adiciona meia-noite
                    } else if (format === "DD/MM/YYYY" || format === "DD-MM-YYYY") {
                        const [day, month, year] = this.input.split(/[-\/]/).map(Number);
                        date = new Date(year, month - 1, day, 0, 0, 0);
                    } else if (format === "DD/MM/YY") {
                        const [day, month, year] = this.input.split("/").map(Number);
                        date = new Date(2000 + year, month - 1, day, 0, 0, 0);
                    }

                    if (date && !isNaN(date.getTime())) {
                        const formattedDate = date.toLocaleDateString("pt-BR");
                        const formattedTime = date.toLocaleTimeString("pt-BR");
                        return {
                            isValid: true,
                            format,
                            formattedDateTime: `${formattedDate} ${formattedTime}`
                        };
                    }
                } catch (error) {
                    // Ignora erros de parsing
                }
            }
        }

        return { isValid: false, format: null, formattedDateTime: null };
    }
}

class DocumentFormatter {
    constructor(documento) {
        this.documento = documento.replace(/\D/g, '');
    }

    formatCPF() {
        if (this.documento.length !== 11) return this.documento;
        return this.documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    formatCNPJ() {
        if (this.documento.length !== 14) return this.documento;
        return this.documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    formatRG() {
        if (this.documento.length < 8) return this.documento;
        return this.documento.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }

    formatCNH() {
        if (this.documento.length !== 11) return this.documento;
        return this.documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    formatTelefone() {
        if (this.documento.length === 10) {
            return this.documento.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (this.documento.length === 11) {
            return this.documento.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        return this.documento;
    }

    formatCelular() {
        if (this.documento.length !== 11) return this.documento;
        return this.documento.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
}

class CurrencyFormatter {
    constructor(valor) {
        this.valor = parseFloat(valor) || 0;
    }

    brl() {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(this.valor);
    }

    usd() {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(this.valor);
    }

    eur() {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(this.valor);
    }
}

class ActionButtons {
    constructor(elementoPai, options = {}) {
        this.elementoPai = elementoPai;
        this.options = {
            edit: options.edit || false,
            del: options.del || false,
            view: options.view || false
        };
        this.buttons = [];
    }

    createButton(type, functionName, icon, color) {
        const button = document.createElement('button');
        button.setAttribute('class', `btn btn-sm btn-${color} me-1`);
        button.setAttribute('onclick', `${functionName}()`);
        button.innerHTML = `<i class="${icon}"></i>`;
        return button;
    }

    makeButtons() {
        const container = document.createElement('div');
        container.setAttribute('class', 'd-flex justify-content-center');

        if (this.options.edit) {
            const editBtn = this.createButton('edit', 'editRow', 'bi bi-pencil', 'primary');
            this.buttons.push(editBtn);
            container.appendChild(editBtn);
        }

        if (this.options.view) {
            const viewBtn = this.createButton('view', 'viewRow', 'bi bi-eye', 'info');
            this.buttons.push(viewBtn);
            container.appendChild(viewBtn);
        }

        if (this.options.del) {
            const delBtn = this.createButton('del', 'deleteRow', 'bi bi-trash', 'danger');
            this.buttons.push(delBtn);
            container.appendChild(delBtn);
        }

        const destino = document.getElementById(this.elementoPai);
        if (!destino) {
            console.error(`Elemento pai com ID "${this.elementoPai}" não encontrado.`);
            return;
        }

        destino.appendChild(container);
    }
}

class LoadReport {
    constructor(title='Minha Tabela', cabecalhos=null, dados=null,tabela='mytable',FEdit=null,FView=null, Fout=null, FoutName=null){
        this.title = title
        this.cabecalhos = cabecalhos
        this.dados = dados
        this.tabela = tabela
        this.FEdit = FEdit
        this.FView = FView
        this.Fout = Fout
        this.FoutName = FoutName
    }

    printSimpleTable(){
        console.log(this.tabela)
        // verifica se os cabeçalhos foram informados
        if (this.cabecalhos===null) {
            alert('Cabeçalhos da tabela não informado!')
            return
        }
        // verifica se existem dados informados
        if (this.dados===null) {
            alert('Dados da tabela não informado!')
            return
        }

        if (!Array.isArray(this.cabecalhos)){
            alert('Array de colunas não fornecido como array')
            return   
        }
        
        

        if (!Array.isArray(this.dados)){
            alert('Dados não fornecido como array')
            return   
        }

        const header = document.getElementById('headerTable')
        const body =  document.getElementById('bodyTable')

        for (let H = 0; H < this.cabecalhos.length; H++) {
            let element = document.createElement('th')
            element.setAttribute("scope",'col')
            let texto = this.cabecalhos[H]
            element.textContent = texto.replace('_',' ')

            header.appendChild(element)
        }

        
            if (this.Fout==='S' || this.Fout==='Y') {
                let element4 = document.createElement('td')
                element4
                element4.innerHTML= this.FoutName
                header.appendChild(element4)
            }
        

        var dadosx = this.dados
        for (let B = 0; B < dadosx.length; B++) {
            // setProgress(B)

            let TRx = document.createElement('tr')
            for (const chave in dadosx[B]) {
                let element2 = document.createElement('td')
                // console.log(dadosx[B][chave])
                element2.setAttribute('id',`${B}_${dadosx[B][chave]}`)
                // var testValue = detectAndFormatDate(dadosx[B][chave])
                element2.textContent = dadosx[B][chave] //testValue.isValid==='true'? testValue.Formatted:dadosx[B][chave]
                TRx.appendChild(element2)
                
              }   
            if (this.Fout==='S' || this.Fout==='Y') {
                let element3 = document.createElement('td')
                element3
                element3.innerHTML= '<i class="fa-solid fa-hourglass-half fa-shake"></i>'
                TRx.appendChild(element3)
                
            }
            body.appendChild(TRx)
        }
  
    }

    RemoveDTTables = ()=>{
        let NameTb = `#${this.tabela}`
        if ($.fn.DataTable.isDataTable(NameTb)) {
            // Se foi inicializado, destrua o DataTable atual
            $(NameTb).DataTable().destroy();

        }else{
           console.log('Tabela ainda não criada') 
        }

    }

    makeDtTables = ()=>{
        let NameTb = `#${this.tabela}`
        $(NameTb).DataTable({
            searching: true, // Manter a funcionalidade de pesquisa
            ordering: true, // Remover a funcionalidade de ordenação (tabulação)
            paging: true,
            dom: 'Bfrtip', // Adiciona a barra de botões
            buttons: [
                {
                    extend: 'excelHtml5', // Define o formato de exportação
                    text: 'Exportar XLS', // Texto do botão
                    title: `${this.title.replace(' ','_')}`, // Nome do arquivo
                    className: 'btn btn-info', // Classe CSS para estilizar o botão
                   
                    exportOptions: {
                        columns: ':visible', // Apenas colunas visíveis
                        modifier: {
                            search: 'applied', // Inclui apenas linhas filtradas
                            order: 'applied', // Inclui a ordem atual
                           // page: 'current'   // Apenas a página visível
                        }
                    }
                }
            ], drawCallback: function(settings) {
               
                
                console.log('Tabela atualizada. Preparando exportação.');
            },
            responsive: true // Torna a tabela responsiva
       });
    }

}

class TableActions {
    constructor(options = {}) {
        this.options = {
            edit: options.edit || false,
            del: options.del || false,
            view: options.view || false,
            editFunction: options.editFunction || 'editRow',
            delFunction: options.delFunction || 'deleteRow',
            viewFunction: options.viewFunction || 'viewRow'
        };
    }

    createButton(type, functionName, icon, color, rowId) {
        const button = document.createElement('button');
        button.setAttribute('class', `btn btn-sm btn-${color} me-1`);
        button.setAttribute('onclick', `${functionName}(${rowId})`);
        button.innerHTML = `<i class="${icon}"></i>`;
        return button;
    }

    addActionsToRow(row, rowId) {
        const actionCell = document.createElement('td');
        actionCell.setAttribute('class', 'text-center');
        
        const container = document.createElement('div');
        container.setAttribute('class', 'd-flex justify-content-center');

        if (this.options.edit) {
            const editBtn = this.createButton('edit', this.options.editFunction, 'bi bi-pencil', 'primary', rowId);
            container.appendChild(editBtn);
        }

        if (this.options.view) {
            const viewBtn = this.createButton('view', this.options.viewFunction, 'bi bi-eye', 'info', rowId);
            container.appendChild(viewBtn);
        }

        if (this.options.del) {
            const delBtn = this.createButton('del', this.options.delFunction, 'bi bi-trash', 'danger', rowId);
            container.appendChild(delBtn);
        }

        actionCell.appendChild(container);
        row.appendChild(actionCell);
    }

    addActionsToTable(tableId) {
        const table = document.getElementById(tableId);
        if (!table) {
            console.error(`Tabela com ID "${tableId}" não encontrada.`);
            return;
        }

        const tbody = table.querySelector('tbody');
        if (!tbody) {
            console.error('Corpo da tabela não encontrado.');
            return;
        }

        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            this.addActionsToRow(row, index);
        });
    }
}

class FormGenerator {
    constructor(srcRoot, dataConection) {
        this.srcRoot = srcRoot;
        this.dataConection = dataConection;
    }

    async MakeaFormsDB(opc = null) {
        try {
            const connection = await mysql.createConnection(this.dataConection);
            
            // Obtém todas as tabelas do banco de dados
            const [tables] = await connection.query('SHOW TABLES');
            
            for (const table of tables) {
                const tableName = Object.values(table)[0];
                
                // Obtém informações das colunas
                const [columns] = await connection.query(`SHOW COLUMNS FROM ${tableName}`);
                
                const config = {
                    table: tableName,
                    fields: [],
                    buttons: []
                };

                // Processa cada coluna
                for (const column of columns) {
                    const field = {
                        name: column.Field,
                        type: this.getFieldType(column.Type),
                        label: column.Field.replace(/_/g, ' '),
                        required: column.Null === 'NO',
                        maxlength: this.getMaxLength(column.Type)
                    };
                    config.fields.push(field);
                }

                // Adiciona botões padrão
                config.buttons = [
                    { type: 'submit', label: 'Salvar', class: 'btn-primary' },
                    { type: 'reset', label: 'Limpar', class: 'btn-secondary' }
                ];

                // Salva a configuração
                const configPath = path.join(this.srcRoot, 'configFormView', `${tableName}.json`);
                await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
            }

            await connection.end();
            return { success: true, message: 'Configurações de formulários geradas com sucesso' };
        } catch (error) {
            console.error('Erro ao gerar configurações de formulários:', error);
            return { success: false, message: error.message };
        }
    }

    async MakeaTableDB(opc = null) {
        try {
            const connection = await mysql.createConnection(this.dataConection);
            
            const [tables] = await connection.query('SHOW TABLES');
            
            for (const table of tables) {
                const tableName = Object.values(table)[0];
                const [columns] = await connection.query(`SHOW COLUMNS FROM ${tableName}`);
                
                const config = {
                    table: tableName,
                    columns: []
                };

                for (const column of columns) {
                    const colConfig = {
                        field: column.Field,
                        title: column.Field.replace(/_/g, ' '),
                        visible: true,
                        orderable: true,
                        searchable: true
                    };
                    config.columns.push(colConfig);
                }

                const configPath = path.join(this.srcRoot, 'configTableview', `${tableName}.json`);
                await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
            }

            await connection.end();
            return { success: true, message: 'Configurações de tabelas geradas com sucesso' };
        } catch (error) {
            console.error('Erro ao gerar configurações de tabelas:', error);
            return { success: false, message: error.message };
        }
    }

    async makeFormView(view, operation = 'new') {
        try {
            const configPath = path.join(this.srcRoot, 'configFormView', `${view}.json`);
            const config = JSON.parse(await fs.promises.readFile(configPath, 'utf8'));

            let html = `<form id="form-${view}" class="needs-validation" novalidate>`;
            
            // Adiciona campos
            for (const field of config.fields) {
                html += this.generateFieldHTML(field, operation);
            }

            // Adiciona botões
            html += '<div class="form-actions">';
            for (const button of config.buttons) {
                html += `<button type="${button.type}" class="btn ${button.class}">${button.label}</button>`;
            }
            html += '</div>';

            html += '</form>';
            return html;
        } catch (error) {
            console.error('Erro ao gerar HTML do formulário:', error);
            return '';
        }
    }

    async makeTableView(view) {
        try {
            const configPath = path.join(this.srcRoot, 'configTableview', `${view}.json`);
            const config = JSON.parse(await fs.promises.readFile(configPath, 'utf8'));

            let html = `<table id="table-${view}" class="table table-striped table-bordered">`;
            html += '<thead><tr>';

            // Adiciona cabeçalhos
            for (const column of config.columns) {
                if (column.visible) {
                    html += `<th>${column.title}</th>`;
                }
            }
            html += '</tr></thead><tbody></tbody></table>';

            return html;
        } catch (error) {
            console.error('Erro ao gerar HTML da tabela:', error);
            return '';
        }
    }

    async saveHTMLView(outputSRC, view, operation = 'new') {
        try {
            const html = await this.makeFormView(view, operation);
            const outputPath = path.join(outputSRC, `${view}-${operation}.html`);
            await fs.promises.writeFile(outputPath, html);
            return { success: true, message: 'HTML do formulário salvo com sucesso' };
        } catch (error) {
            console.error('Erro ao salvar HTML do formulário:', error);
            return { success: false, message: error.message };
        }
    }

    async saveHTMLTableView(outputSRC, view) {
        try {
            const html = await this.makeTableView(view);
            const outputPath = path.join(outputSRC, `${view}-table.html`);
            await fs.promises.writeFile(outputPath, html);
            return { success: true, message: 'HTML da tabela salvo com sucesso' };
        } catch (error) {
            console.error('Erro ao salvar HTML da tabela:', error);
            return { success: false, message: error.message };
        }
    }

    // Métodos auxiliares
    getFieldType(type) {
        if (type.includes('int')) return 'number';
        if (type.includes('char') || type.includes('text')) return 'text';
        if (type.includes('date')) return 'date';
        if (type.includes('time')) return 'time';
        if (type.includes('decimal') || type.includes('float')) return 'number';
        return 'text';
    }

    getMaxLength(type) {
        const match = type.match(/\((\d+)\)/);
        return match ? match[1] : null;
    }

    generateFieldHTML(field, operation) {
        let html = `<div class="form-group">`;
        html += `<label for="${field.name}">${field.label}</label>`;
        
        if (field.type === 'text') {
            html += `<input type="text" class="form-control" id="${field.name}" name="${field.name}"`;
            if (field.required) html += ' required';
            if (field.maxlength) html += ` maxlength="${field.maxlength}"`;
            html += '>';
        } else if (field.type === 'number') {
            html += `<input type="number" class="form-control" id="${field.name}" name="${field.name}"`;
            if (field.required) html += ' required';
            html += '>';
        } else if (field.type === 'date') {
            html += `<input type="date" class="form-control" id="${field.name}" name="${field.name}"`;
            if (field.required) html += ' required';
            html += '>';
        }
        
        html += '</div>';
        return html;
    }
}

class FormGeneratorMSSQL {
    constructor(srcRoot, dataConection) {
        this.srcRoot = srcRoot;
        this.dataConection = dataConection;
    }

    async MakeaFormsDB(opc = null) {
        try {
            const sql = require('mssql');
            const pool = await sql.connect(this.dataConection);
            
            // Obtém todas as tabelas do banco de dados
            const result = await pool.request()
                .query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`);
            
            for (const table of result.recordset) {
                const tableName = table.TABLE_NAME;
                
                // Obtém informações das colunas
                const columnsResult = await pool.request()
                    .query(`SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH 
                           FROM INFORMATION_SCHEMA.COLUMNS 
                           WHERE TABLE_NAME = '${tableName}'`);
                
                const config = {
                    table: tableName,
                    fields: [],
                    buttons: []
                };

                // Processa cada coluna
                for (const column of columnsResult.recordset) {
                    const field = {
                        name: column.COLUMN_NAME,
                        type: this.getFieldType(column.DATA_TYPE),
                        label: column.COLUMN_NAME.replace(/_/g, ' '),
                        required: column.IS_NULLABLE === 'NO',
                        maxlength: column.CHARACTER_MAXIMUM_LENGTH
                    };
                    config.fields.push(field);
                }

                // Adiciona botões padrão
                config.buttons = [
                    { type: 'submit', label: 'Salvar', class: 'btn-primary' },
                    { type: 'reset', label: 'Limpar', class: 'btn-secondary' }
                ];

                // Salva a configuração
                const configPath = path.join(this.srcRoot, 'configFormView', `${tableName}.json`);
                await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
            }

            await pool.close();
            return { success: true, message: 'Configurações de formulários geradas com sucesso' };
        } catch (error) {
            console.error('Erro ao gerar configurações de formulários:', error);
            return { success: false, message: error.message };
        }
    }

    // ... outros métodos similares ao FormGenerator ...
}

class FormGeneratorSQLite {
    constructor(srcRoot, dataConection) {
        this.srcRoot = srcRoot;
        this.dataConection = dataConection;
    }

    async MakeaFormsDB(opc = null) {
        try {
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database(this.dataConection);
            
            // Obtém todas as tabelas do banco de dados
            const tables = await new Promise((resolve, reject) => {
                db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            for (const table of tables) {
                const tableName = table.name;
                
                // Obtém informações das colunas
                const columns = await new Promise((resolve, reject) => {
                    db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                });
                
                const config = {
                    table: tableName,
                    fields: [],
                    buttons: []
                };

                // Processa cada coluna
                for (const column of columns) {
                    const field = {
                        name: column.name,
                        type: this.getFieldType(column.type),
                        label: column.name.replace(/_/g, ' '),
                        required: column.notnull === 1,
                        maxlength: null // SQLite não fornece essa informação diretamente
                    };
                    config.fields.push(field);
                }

                // Adiciona botões padrão
                config.buttons = [
                    { type: 'submit', label: 'Salvar', class: 'btn-primary' },
                    { type: 'reset', label: 'Limpar', class: 'btn-secondary' }
                ];

                // Salva a configuração
                const configPath = path.join(this.srcRoot, 'configFormView', `${tableName}.json`);
                await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
            }

            db.close();
            return { success: true, message: 'Configurações de formulários geradas com sucesso' };
        } catch (error) {
            console.error('Erro ao gerar configurações de formulários:', error);
            return { success: false, message: error.message };
        }
    }

    // ... outros métodos similares ao FormGenerator ...
}

module.exports = {
    MailSender, DateFormatter, Report, DocumentFormatter, CurrencyFormatter, ActionButtons, LoadReport, TableActions, FormGenerator, FormGeneratorMSSQL, FormGeneratorSQLite
}