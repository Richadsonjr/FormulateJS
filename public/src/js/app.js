// const { default: axios } = require("axios")

var CSVTRAYDATA=[]
const stsData = {}


// Salva os dados editados do usuario no servidor
const saveDataUser = async(opc)=>{
let funcao = opc
var payload
var status = document.getElementById('inputStatus')
var nome = document.getElementById('inputNome')
var email = document.getElementById('inputEmail')
var cpf = document.getElementById('CPf')

var grupo = document.getElementById('inputGrupo')
var senha = document.getElementById('inputSenha')
var celular = document.getElementById('inputCelular')
var telefone = document.getElementById('inputTelefone')
var Contato = document.getElementById('inputContato')
var Filial = document.getElementById('inputFilSacDisplay')
var url =  getUlrAPI()
var urlapp
switch (funcao) {
    case 0:
       urlapp = `${url}api/CreateUserData`
       payload = JSON.stringify({
    "user":sessionStorage.getItem('usr300'),
    "pass":sessionStorage.getItem('psw300'),
    "acesso":sessionStorage.getItem('acc300'),
    "STATUS":status.value, 
    "NOME":nome.value,
    "EMAIL":email.value,
    "CPFCNPJ":cpf.value, 
    "GRUPO":grupo.value,
    "SENHA":senha.value,
    "CELULAR":celular.value, 
    "TELEFONE":telefone.value,
    "CONTATO":Contato.value, 
    "FIL_SAC":Filial.value
    })
    break;

    default:
       urlapp = `${url}api/UpdateUserData`
       payload = JSON.stringify({
    "user":sessionStorage.getItem('usr300'),
    "pass":sessionStorage.getItem('psw300'),
    "acesso":sessionStorage.getItem('acc300'),
    "STATUS":status.value, 
    "NOME":nome.value,
    "EMAIL":email.value,
    "CPFCNPJ":cpf.value, 
    "GRUPO":grupo.value,
    "SENHA":senha.value,
    "CELULAR":celular.value, 
    "TELEFONE":telefone.value,
    "CONTATO":Contato.value, 
    "FIL_SAC":Filial.value,
    "IDUser": sessionStorage.getItem('TmpiU')
    })
    break;
}


let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: urlapp,
  headers: { 
    'Content-Type': 'application/json'
  },data:payload
};

axios(config)
    .then(()=>{
        alert('Operação realizada com sucesso')
        status.value='' 
        nome.value='' 
        email.value=''
        cpf.value='' 
        grupo.value=''
        senha.value=''
        celular.value='' 
        telefone.value=''
        Contato.value='' 
        Filial.value=''
        $('#modaoCli').modal('hide');
        let verify = sessionStorage.getItem('userConfsetType')
        switch (verify) {
            case 'cli':
                ContUserCostumerUser('ContUserCostumerUser')
                
                break;
        
            default:
                ContUser('ContUser')
            break;
        }
    })
    .catch((e)=>{
        console.log(e)
        alert('Falha ao Relizar a operação! \nTente novamente mais tarde.')
        $('#modaoCli').modal('hide');
        
    })
}

const verifyLogin=()=>{
    var user= sessionStorage.getItem('usr300')
    var pass = sessionStorage.getItem('psw300')

     if (user==null | pass== null |user=='null' | pass== 'null' |user=='' | pass== ''  ) {
        window.location.href='/'
     } 
}

const getUlrAPI =()=>{
    let urlAtual = window.location.href
    urlAtual= urlAtual.split('app')
    return urlAtual[0]
}

const getSts = async()=>{
      var urlapp =  getUlrAPI()
    var url = `${urlapp}api/getSts`
    
    axios(url)
        .then(resp=>{
            const dt = resp.data
            for (let l = 0; l < dt.length; l++) {
                 if (!stsData[dt[l].codigo]) { stsData[dt[l].codigo] = {};}
                stsData[dt[l].codigo].Display=dt[l].DISPLAY_NAME
                stsData[dt[l].codigo].Code=dt[l].codigo
                
            }
        })
}

getSts()

const lgn=()=>{
    var user = document.getElementById('cpfcnpj').value
    var password = document.getElementById('senha').value



    var dataX= JSON.stringify({
    "user":user,
    "pass":password
} )

    var url = window.location.href+'api/loginUser'
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url ,
        headers: { 
            'Content-Type': 'application/json', 
        },
        data : dataX };
  

    axios(config)
    .then(resp=>{
    sessionStorage.setItem('usr300',user)
    sessionStorage.setItem('psw300',password)
    let acc = resp.data
    // console.log(acc)
    sessionStorage.setItem('acc300',acc[0].GRUPO)
    
    window.location.href= './app'    

    })
    .catch(e=>{
        alert('Usuario ou senha Inválidos!')
    })

}
// extrai o cnpj da chave nfe ou nfce
const  extrairCNPJ= async(chave)=> {
  // Expressão regular para extrair o CNPJ da chave
var chaveNFe = chave
var cnpj = chaveNFe.substring(6, 20);
var numeroNota =  chaveNFe.substring(34, 43);

var payload = {
    Cnpj:cnpj,
    NumeroNF:numeroNota,
    chave:chaveNFe
}

// console.log(payload)
// process.exit()
return payload;

}

const downloadXML = async (chave)=> {
      // Cria um link temporário para fazer o download do XML
      var xmlLoad = sessionStorage.getItem('DXLSTR')
      xmlLoad = xmlLoad.replace(/\'/g, '"')
      const url = window.URL.createObjectURL(new Blob([xmlLoad]));
      const a = document.createElement('a');
      a.href = url;
        var ChaveEXT = await extrairCNPJ(chave)
      var nomeArquivo = `Nf-${ChaveEXT.NumeroNF}_${ChaveEXT.chave}.xml`
      a.download = nomeArquivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
}



const logout =()=>{

    sessionStorage.removeItem('usr300')
    sessionStorage.removeItem('psw300')
    sessionStorage.removeItem('accsr300')
    sessionStorage.removeItem('acc300')
    let urlAtual= window.location.href
    var result = urlAtual.split('/app')
    window.location.href= result[0]+'/'
}

const loadMenus = async()=>{
const menus = JSON.parse(sessionStorage.getItem('accsr300'))
var load = menus.links
var divMenu= document.getElementById('menuPlace')
for (let m = 0; m < load.length; m++) {
    let menu = document.createElement('li')    
    let link = document.createElement('a')    
    let icon = document.createElement('i')    
    let span = document.createElement('span')
    menu.setAttribute('class','nav-item')    
    icon.setAttribute('class',load[m].icon)
    link.appendChild(icon)
    link.setAttribute('class','nav-link')
    link.setAttribute('onclick',`${load[m].uri}('${load[m].uri}')`)
    link.setAttribute('href','#')
    span.innerText= load[m].nome
    link.appendChild(span)
    menu.appendChild(link)
    divMenu.appendChild(menu)
}

}


const loadAcess = () =>{
    const perfil = sessionStorage.getItem('acc300')
    var urlAtual = window.location.href
    var urlFull =  urlAtual.split('/app') 

    const dataX = JSON.stringify({
    "grupo":perfil
})
     var url = urlFull[0] + '/api/getAccess'
    //  console.log(url)
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url ,
        headers: { 
            'Content-Type': 'application/json', 
        },
        data : dataX };


    axios(config)
        .then(resp=>{
            // console.log(resp)
            sessionStorage.setItem('accsr300',JSON.stringify(resp.data))
            loadMenus()
        })
        .catch(e=>{
            alert('Falha ao carregar permissões e acessos, entre em contato com o T.I')
            console.log(e)
            window.location.href=urlFull[0]+'/'
        })
}



 const route= async(page)=>{
        let loadpage = '/pages/'+page+'.html'
        let div = document.getElementById('canvas')
        div.innerHTML=''
    var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            div.innerHTML = xhr.responseText;
          }
        };
        xhr.open('GET', loadpage, true);
        xhr.send();  
}

// CRIA A TABLA DE SOLICITAÇÕES DE RMA
const createDisplay=() =>{
    var tabela = document.createElement('table');
  tabela.classList.add('table', 'table-striped');
  tabela.id = 'table-prod';

  var thead = document.createElement('thead');
  var tr = document.createElement('tr');

  var colunas = [
    'Cod-Port',
    'Produto',
    'Gtin',
    'Dimensões(M)',
    'Peso(Kg)',
    '[Opções]'
  ];

  colunas.forEach(function (coluna) {
    var th = document.createElement('th');
    th.textContent = coluna;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  tabela.appendChild(thead);

  var tbody = document.createElement('tbody');
  tbody.id = 'body-table';

  var trLoading = document.createElement('tr');
  var tdLoading = document.createElement('td');
  tdLoading.colSpan = 6;
  tdLoading.style.textAlign = 'center';

  var divSpinner = document.createElement('div');
  divSpinner.classList.add('spinner-border', 'text-primary');
  divSpinner.setAttribute('role', 'status');

  var spanSrOnly = document.createElement('span');
  spanSrOnly.classList.add('sr-only');
  spanSrOnly.textContent = 'Loading...';

  var br = document.createElement('br');

  var spanMsgLoad = document.createElement('span');
  spanMsgLoad.id = 'Msg-load';
  spanMsgLoad.textContent = 'Carregando...';

  tdLoading.appendChild(divSpinner);
  tdLoading.appendChild(br);
  tdLoading.appendChild(spanMsgLoad);

  trLoading.appendChild(tdLoading);
  tbody.appendChild(trLoading);

  tabela.appendChild(tbody);
  var display = document.getElementById('tableContent')  
  display.appendChild(tabela)
  
  let btnxls= document.getElementById('btnExcell')
btnxls.removeAttribute('disabled')
}


const ReloadGetProducts = async()=>{

try {
  await clearTable('tableContent')
  await createDisplay()
 
} catch (error) {
 console.log('Faill - ' +error )    
}

// document.getElementById('Msg-load').innerText='Carregando...'
let Inp_Tp_prod = sessionStorage.getItem('Inp_Tp_prod')
 let Inp_Sts_prod =  sessionStorage.getItem('Inp_Sts_prod')
 let Inp_Esq_prod =  sessionStorage.getItem('Inp_Esq_prod')
 let Inp_mark_prod = sessionStorage.getItem('Inp_mark_prod')

var payload = JSON.stringify({
    f_Tp_prod:Inp_Tp_prod,
    f_Sts_prod:Inp_Sts_prod,
    f_Esq_prod:Inp_Esq_prod,
    f_mark_prod:Inp_mark_prod,
    usr300:sessionStorage.getItem('usr300')
})
var urlAtual = window.location.href
urlAtual = urlAtual.split('/app')
const url = `${urlAtual[0]}/api/getProducts`
console.log(url)
var config ={
 method: 'post',
        maxBodyLength: Infinity,
        url: url ,
        headers: { 
            'Content-Type': 'application/json', 
        },
        data : payload 

}
axios(config)
    .then(async resp=> {
        var retorno =  resp
        // console.log(retorno)
        await renderProducts(retorno)
        new DataTable('#table-prod')

    })
    .catch(e=>{
        console.log(e)
        alert('Falha ao obter produtos')
        products('products')
    })
}









function exportExcel() {
    var csv_data = []; // Variável para guardar os dados finais do CSV

    // Use a API do DataTables para obter todos os dados da tabela
    var table = $('#table-prod').DataTable(); // Substitua 'sua-tabela' pelo ID da sua tabela

    table.rows().every(function() {
        var data = this.data();
        var csvrow = [];

        // Loop através de cada coluna
        for (var i = 0; i < data.length; i++) {
            csvrow.push(data[i]);
        }

        // Combina cada valor de coluna com vírgula
        csv_data.push(csvrow.join(";"));
    });

    // Combina cada dado de linha com um caractere de nova linha
    csv_data = csv_data.join('\n');

    // Função para baixar o arquivo CSV
    downloadCSVFile(csv_data);
}


    function downloadCSVFile(csv_data) {

        //cria um objeto de arquivo csv e alimente nossos dados csv nele
        CSVFile = new Blob([csv_data], {
            type: "text/csv"
        });

        //Cria um link temporÃ¡rio para iniciar o processo de download
        var temp_link = document.createElement('a');

            var agora = new Date()
            var dataFormatada = `${agora.getFullYear()}_${agora.getMonth()}_${agora.getDay()}__${agora.getHours()}_${agora.getMinutes()}_${agora.getSeconds()}`
            console.log(dataFormatada)

        // Download arquivo CSV
        temp_link.download = `Relatorio_${dataFormatada}.csv`;
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // NÃ£o mostrar o link 
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        //Clica no link para download automatico
        temp_link.click();
        document.body.removeChild(temp_link);
    }



const checkPermission =()=>{

let acc300 = sessionStorage.getItem('acc300')

    switch (acc300) {
        case 'CUSTOMER':
            return 0;
        break;
    
        default:
          return 1;
        break;
    }

}

const countlength =(inputname)=>{
    var input = document.getElementById(inputname).value
   var total = input.length 
    if(total >= 55){
    document.getElementById('totalCaracteres').innerText=`Atenção! Você ultrapassou o limite de 55 caracteres, O Total atual de: ${total} Caracteres.`    
    document.getElementById('totalCaracteres').setAttribute('class','alertSpan')
    }else{
        switch (total) {
            case 0:
        document.getElementById('totalCaracteres').setAttribute('class','NormalSpan')
        
        document.getElementById('totalCaracteres').innerText=`${total} Caracteres.`    
                
            break;
        
            default:
                document.getElementById('totalCaracteres').setAttribute('class','NormalSpan')
                total = total+1
                document.getElementById('totalCaracteres').innerText=`${total} Caracteres.`    
            break;
        }

    }
    
    
}











// ==============start autocomplete=============
const getcategorysList=async()=>{
   const datalist= document.getElementById('CategoriasLista')
   datalist.innerHTML=''
var productID = sessionStorage.getItem('productEdition')

    let urlAtual = window.location.href
    urlAtual= urlAtual.split('app')

    var urlX = `${urlAtual[0]}api/getcategorysList`

// console.log(datax)

    axios(urlX)
        .then(resp=>{
            var dados= resp.data


             if(dados.length < 1 ){
                 let opt= document.createElement('option')
            opt.value =`Não Há Categorias Disponiveis para Vincular`
            datalist.appendChild(opt)
             }else{

            for (let dt = 0; dt < dados.length; dt++) {
            let opt= document.createElement('option')
            opt.value =`${dados[dt].category_id} | ${dados[dt].category_displayname}`
            datalist.appendChild(opt)
            }
             }   
        })
        .catch(e=>{
            let opt= document.createElement('option')
            opt.value =`Falha ao Carregar Categorias.`
            datalist.appendChild(opt)
        })




//    <option value="Chrome"></option> 
}

// ===============end autocomplete==============


function stripHTML(html) {
  // Remove tags HTML usando uma expressão regular
  var tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText;
}

function exportExcelTray() {
 // Define as colunas do CSV
const columns = [
  "ID PORT",
  "NOME COMPLETO ( WEB )",
  "EAN/GTIN",
  "MARCA",
  "MODELO",
  "ALTURA",
  "LARGURA",
  "PROFUNDIDADE",
  "PESO",
  "DESCRIÇÃO COMPLETA",
  "PREÇO V11",
  "ESTOQUE DF",
  "ESTOQUE VSP",
  "STATUS V11"
];

// Transforma os objetos em uma matriz de arrays com os valores das colunas
const csvData = CSVTRAYDATA.map(item => {
  for (const key in item) {
    const values = Object.values(item[key]);
    return values.map(val => (typeof val === "string" ? val : JSON.stringify(val)))
    }
});

// Adiciona as colunas como a primeira linha
csvData.unshift(columns);

// Converte a matriz de arrays em uma string CSV
const csv = csvData.map(row => row.join(";")).join("\n");

                    const blob = new Blob([csv], { type: 'text/csv' });

                    const blobUrl = URL.createObjectURL(blob);
                    let btnCSV = document.getElementById('DlwCSV')
                    btnCSV.setAttribute('href',blobUrl)
                    btnCSV.removeAttribute('disabled')
            
console.log(csv);
 
}



const setMyPassword = ()=>{
      var url = getUlrAPI()
    var urlX = `${url}api/savePassWord` 
    var newPass = document.getElementById('newPass').value
    var rePass = document.getElementById('rePass').value
    if (newPass != rePass) {
        document.getElementById('MensagePass').innerText='As senhas não são iguais!'
    }else{
        var payload=JSON.stringify({
            pass:newPass,
            user: sessionStorage.getItem('usr300')
        })


var config ={
      method: 'put',
        maxBodyLength: Infinity,
        url: urlX,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload  
    }    
axios(config)
 .then(resp=>{
    alert('Senha alterada com Sucesso...  Fazendo logoff....')
    logout()
 })
 .catch(e=>{
    alert('Falha ao alterar senha! Tente mais tarde!')
 })

    }

}

const showHidePass =(opc, element,btnO)=>{
    var btnx
    var btnEl =btnO
    switch (opc) {
        case '1':
           btnx= document.getElementById(btnEl)
           btnx.setAttribute('onclick',`showHidePass('0','${element}','${btnEl}')`)
           document.getElementById(element).setAttribute('type','text')
           let spn = document.createElement('span')
           spn.setAttribute('class','fa-solid fa-eye-slash')
             btnx.innerHTML=''
           btnx.appendChild(spn)
        break;
    
        case '0':
           btnx= document.getElementById(btnEl)
           btnx.setAttribute('onclick',`showHidePass('1','${element}','${btnEl}')`)
           document.getElementById(element).setAttribute('type','password')
           let spn2 = document.createElement('span')
           spn2.setAttribute('class','fa-solid fa-eye')
           btnx.innerHTML=''
           btnx.appendChild(spn2)
        break;
    }
}

const getMyRequests = async()=>{
    var url =  getUlrAPI()
    var urlapp = `${url}api/getMyRequests`
    
    var payload = JSON.stringify({
        user: sessionStorage.getItem('usr300'),
        pass: sessionStorage.getItem('psw300')
    })
    var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload  
    }  
    console.log(urlapp)  
axios(config)
 .then(resp=>{
    let result  =  resp.data
    let sts = result.MSG
    let dados = result.token
    const corpoTabela= document.getElementById('body_table_cliente')
    switch (sts) {
        case "Positivo":
            if (dados.length ===0) {
                let html=`<tr><td colspan="10"><center>Não Há Solicitações abertas...</center></td></tr>`
                corpoTabela.innerHTML= html
            }else{
            corpoTabela.innerHTML=''

                for (let i = 0; i < dados.length; i++) {

                    // cria os elementos
                    let tr = document.createElement('tr')
                    let tdStatus = document.createElement('td')
                    let tdProtocolo = document.createElement('td')
                    let tdabertura = document.createElement('td')
                    let tddataCompra = document.createElement('td')
                    let tdproduto = document.createElement('td')
                    let tdValUn = document.createElement('td')
                    let tdQtde = document.createElement('td')
                    // let tdQtdeTotal = document.createElement('td')
                    // let tValTot = document.createElement('td')
                    let tdOpc = document.createElement('td')
                    let DrwCircleSts = document.createElement('div')
                    let btnView = document.createElement('button')
                    let btnXML = document.createElement('button')
                    let btnCancel = document.createElement('button')
                    
                    tdOpc.setAttribute('id','tdOpc')

                    btnCancel.setAttribute('class','btn btn-sm btn-danger btn-round')
                    btnView.setAttribute('class','btn btn-sm btn-info btn-round')
                    btnXML.setAttribute('class','btn btn-sm btn-warning btn-round')

                    btnCancel.setAttribute('title','Cancelar Solicitação')
                    btnView.setAttribute('title','Ver Detalhes')
                    btnXML.setAttribute('title','Anexar xml de NF de Devolução')

                    btnCancel.setAttribute('onclick',`CancelMyRequest('${dados[i].ID}','${dados[i].PROTOCOLO}')`)
                    btnView.setAttribute('onclick',`ViewMyRequest('${dados[i].ID}','${dados[i].PROTOCOLO}')`)
                    btnView.setAttribute('data-target',`modalDetRMA`)
                    btnView.setAttribute('data-toggle',`modal`)

                    btnCancel.innerHTML='<i class="fa-solid fa-stop"></i>'
                    btnView.innerHTML = '<i class="fa-solid fa-eye"></i>' 
                    btnXML.innerHTML='<i class="fa-solid fa-cloud-arrow-up"></i>'
                    
                    btnXML.setAttribute('data-target',`ModalUPloadXML`)
                    btnXML.setAttribute('data-toggle',`modal`)
                    btnXML.setAttribute('onclick',`Pre_send_My_xml_Request('${dados[i].ID}','${dados[i].PROTOCOLO}')`)

                    let valsts = dados[i].STATUS
                    switch (valsts) {
                        case '0':

                            let spn = document.createElement('i')
                            spn.setAttribute('class','fa-solid fa-ban')

                            DrwCircleSts.appendChild(spn)
                            // tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)
                        break;
                        case '1':
                            DrwCircleSts.setAttribute('class','Circle cricle-gray')
                            tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)
                        break;
                        case '2':

                                let xml = `${dados[i].CHAVE_NFE_DEV_CLI}`
                                if (xml.length ===0 ||xml===null||xml==='null') {
                                    DrwCircleSts.setAttribute('class','Circle cricle-green')
                                    tdOpc.appendChild(btnCancel)
                                    tdOpc.appendChild(btnView) 
                                    tdOpc.appendChild(btnXML)
                                }else{
                                    DrwCircleSts.setAttribute('class','Circle cricle-green')
                                    tdOpc.appendChild(btnCancel)
                                    tdOpc.appendChild(btnView) 
                                }



                         
                        break;                        
                        case '3':
                            DrwCircleSts.setAttribute('class','Circle cricle-red')
                            tdOpc.appendChild(btnView)                            
                        break;                        
                        case '4':
                            DrwCircleSts.setAttribute('class','Circle cricle-blue')
                            tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)                            
                        break;                        
                        case '5':
                            DrwCircleSts.setAttribute('class','Circle cricle-brown')
                            tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)                           
                        break;                        
                        case '6':
                            DrwCircleSts.setAttribute('class','Circle cricle-outline-gray')
                            tdOpc.appendChild(btnView)                           
                        break;
                        default:
                            DrwCircleSts.setAttribute('class','Circle cricle-black')
                            tdOpc.appendChild(btnView)                            
                        break;
                    }

                    // formata a data 
                    // Formato brasileiro
                        const options = { 
                     day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric', 
                        timeZone: 'America/Sao_Paulo' 
                        };

                var datacompra = new Date(dados[i].DATA_COMPRA);
                datacompra = datacompra.toLocaleString('pt-BR', options); 
                  
                var dataregistro = new Date(dados[i].CREATED_AT);
                dataregistro = datacompra.toLocaleString('pt-BR', options); 

                    // preenche as celulas
                    DrwCircleSts.setAttribute('title',`${dados[i].LEGENDA}`)
                    tdabertura.innerText= dataregistro
                    tddataCompra.innerText= datacompra
                    tdProtocolo.innerText= dados[i].PROTOCOLO
                    tdproduto.innerText= dados[i].PRODUTO
                    tdValUn.innerText= parseFloat(dados[i].VALOR).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                    tdQtde.innerText= dados[i].QUANTIDADE
                    // tdQtdeTotal.innerText= dados[i].QUANTIDADE_TOTAL
                    // var valorTotal = parseFloat(dados[i].VALOR) * parseInt(dados[i].QUANTIDADE_TOTAL)
                    // valorTotal= valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                    // tValTot.innerText= valorTotal

                    // constroi os botões de ação 




                //  exibe a linha na tabela 
                    tdStatus.appendChild(DrwCircleSts)
                    tr.appendChild(tdStatus)
                    tr.appendChild(tdProtocolo)
                    tr.appendChild(tdabertura)
                    tr.appendChild(tddataCompra)
                    tr.appendChild(tdproduto)
                    tr.appendChild(tdValUn)
                    tr.appendChild(tdQtde)
                    // tr.appendChild(tdQtdeTotal)
                    // tr.appendChild(tValTot)
                    tr.appendChild(tdOpc)  
                    corpoTabela.appendChild(tr)

                    if (i === dados.length-1) {
                        new DataTable('#table_cliente')
                    }

                }


            }
        break;
    
        default:
          alert('Falha ao validar o usuário, Faça login novamente')
          logout()
        break;
    }


 })
 .catch(e=>{
    console.log(e)
    alert('Cliente não logado!')
    // logout()
    
 })
   
}

const SendRequest =()=>{
    var quantidade = document.getElementById('QTDE_RMA').value
  let chave = document.getElementById('chaveCode')
  var inputs = document.querySelectorAll('input[name="ProductSelect"]');
  let product 
  var url =  getUlrAPI()
  var urlapp = `${url}api/SendRequest`



    // Iterar sobre os inputs para encontrar o selecionado
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'radio' && inputs[i].checked) {
            product = inputs[i].value;
            break;
        }
    }
    if(!product || !quantidade || !inputs){
        alert('É necessário o preenchimento de todos os campos na tela de solicitação!')
    }else{

  chave = chave.innerHTML
    switch (sessionStorage.getItem('4f3c578031056534bf2468d605b8ebcb')) {
        case '1':
    var payload = {
        "chave":chave,
        "quantidade":quantidade,
        "produto": product,
        "user": sessionStorage.getItem('usr300'),
        "pass": sessionStorage.getItem('psw300'),
        "NS": document.getElementById('NSProduct').value
    }
            
        break;
    
        default:
        
    var payload = {
        "chave":chave,
        "quantidade":quantidade,
        "produto": product,
        "user": sessionStorage.getItem('usr300'),
        "pass": sessionStorage.getItem('psw300'),
        "NS": '0'
    }
        break;
    }


    var data = JSON.stringify(payload)
    console.log(data)
    var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload  
    }  

    axios(config)  
        .then(resp=>{
            let msg = resp.data
            var mensagem = `${msg.MSG} - Seu Protocolo é ${msg.Protocolo}`
            alert(mensagem)
            document.getElementById('ProductsQTDERequest').setAttribute('style','diplay:none')
            $('#modaldataNF').modal('hide');
            MyRequests('MyRequests')
        }).catch(function (error) {

    if (error.response.status === 400) {
        alert(error.response.data.error); // Mensagem de erro de autenticação
    } else if (error.response.status === 500) {
        alert('Erro interno do servidor'); // Mensagem de erro interno
        console.error(error.response); 
    } else {
        alert('Erro interno do servidor'); // Mensagem de erro interno

    }
            document.getElementById('ProductsQTDERequest').setAttribute('style','diplay:none')
            $('#modaldataNF').modal('hide');
            MyRequests('MyRequests')
})


    }

}

const showQTDERequest = async(qtde,opc)=>{
var div =document.getElementById('ProductsQTDERequest')
div.removeAttribute('style')

document.getElementById('QTDE_RMA').value=qtde
let opcao = opc
switch (opcao) {
    case '1':
        var div2 =document.getElementById('ProductsNSRequest')
        div2.removeAttribute('style')
    break;
    case '0':
        var div2 =document.getElementById('ProductsNSRequest')
        div2.setAttribute('style','display:none')
    break;
}
}





const SetDataSell = async(payload)=>{
$('#modalB2BActive').modal('hide');
$('#modaldataNF').modal('show');


var book = payload
// header =======================================================
document.getElementById('numNF').innerText =''
document.getElementById('numNF').innerText = book.data.cabecalhoNF[0].NUm_NF
document.getElementById('HeaderNfRequest').innerHTML =''
var textHeaderNf =`<b>Detalhes da Compra:</b><hr/>
<b>Cliente: </b> ${book.data.cabecalhoNF[0].Cliente}
<div><b>Endereço</b>: ${book.data.cabecalhoNF[0].Logradouro} ${book.data.cabecalhoNF[0].endereco}&nbsp; <b>N°</b>: ${book.data.cabecalhoNF[0].numero}</div>
<div><b>Bairro</b>: ${book.data.cabecalhoNF[0].bairro}&nbsp; <b>Cidade</b>: ${book.data.cabecalhoNF[0].cidade} <b>UF</b>: ${book.data.cabecalhoNF[0].UF}</div>
<div><b>Complemento</b>: ${book.data.cabecalhoNF[0].complemento}</div>
<hr/>
<div><b>Saida:</b>&nbsp; ${book.data.cabecalhoNF[0].Venda}<b>&nbsp;Número NF</b><b>:</b> ${book.data.cabecalhoNF[0].NUm_NF}&nbsp;<b> </b><b>&nbsp;</b></div>
<div><b>Chave:&nbsp;</b><span id="chaveCode">${book.data.cabecalhoNF[0].chave}</span></div>
`
document.getElementById('HeaderNfRequest').innerHTML = textHeaderNf
document.getElementById('ProductsQTDERequest').setAttribute('style','display: none;')

// body products ================================================

var products = book.data.Produtos
var bodyProduct = document.getElementById('ProductsRequest')
bodyProduct.innerHTML=''
bodyProduct.innerHTML=`<b>Selecione abaixo o produto para RMA</b><hr/>`
for (let i = 0; i < products.length; i++) {
    console.log(products[i].produtoCod)
    let divForm = document.createElement('div')
    let input = document.createElement('input')
    let label = document.createElement('label')
    
    divForm.setAttribute('class','form-check')
    input.setAttribute('class','form-check-input')
    input.setAttribute('class','form-check-input')
    let nameRadio = 'ProductSelect'
    let quantidade = Math.round(products[i].quantidade);
    input.setAttribute('name',`${nameRadio}`)
    var setNumberS = products[i].ValidaNumeroSerie

    switch (setNumberS) {
        case '1':
            input.setAttribute('onclick',`showQTDERequest('${quantidade}','1')`)
            sessionStorage.setItem('4f3c578031056534bf2468d605b8ebcb','1')
        break;
    
        default:
            input.setAttribute('onclick',`showQTDERequest('${quantidade}','0')`)
            sessionStorage.setItem('4f3c578031056534bf2468d605b8ebcb','0')

        break;
    }

    input.setAttribute('type',`radio`)
    input.setAttribute('id',`${nameRadio}${i}`)
    var valorRadio =`${products[i].produtoCod}--${products[i].produtoNome}--${book.data.cabecalhoNF[0].NUm_NF}--${book.data.cabecalhoNF[0].Venda}--${book.data.FilialDeCompra}--${book.data.cabecalhoNF[0].DATAVENDA}--${products[i].totalItem}--${quantidade}--${setNumberS}`
    input.setAttribute('value',`${valorRadio}`)

let valorNumerico = parseFloat(products[i].totalItem);
var valorEmReais
if (!isNaN(valorNumerico)) {
   valorEmReais =valorNumerico.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  console.log(valorEmReais); // Saída formatada como moeda brasileira
} else {
  console.log('O valor não pôde ser convertido para um número.');
}

    letDisplay=`<b>${products[i].produtoCod} - ${products[i].produtoNome}</b>&nbsp; -&nbsp; 
                <b>Qtde. Compra</b>: ${quantidade}Un&nbsp; -&nbsp; <b>Total</b>: ${valorEmReais}`
    label.setAttribute('for',`'${nameRadio}${i}'`)
    label.innerHTML = letDisplay
    divForm.appendChild(input)
    divForm.appendChild(label)
    bodyProduct.appendChild(divForm)
}
bodyProduct.removeAttribute('style')
}


// puxa os dados da nfe
const loadDataNF = async()=>{
    var chave = document.getElementById('CHAVE_NFE_PORT').value
    document.getElementById('CHAVE_NFE_PORT').value=''

   var chaveData = await extrairCNPJ(chave)
   var url =  getUlrAPI()
   var urlapp = `${url}api/loadDataNF`


let data = JSON.stringify({
  "user": sessionStorage.getItem('usr300'),
  "pass": sessionStorage.getItem('psw300'),
  "dados": {
    "Cnpj": chaveData.Cnpj,
    "NumeroNF": chaveData.NumeroNF,
    "chave": chaveData.chave
  }
});
  console.log(data)
   
      var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data  
    }  
   
axios(config)
    .then(resp=>{
        let retorno = resp.data
        switch (retorno.MSG) {
            case 'Permitido':
               SetDataSell(retorno) 
            break;
            default:
            alert(retorno.MSG)
          $('#modalB2BActive').modal('hide');
            break;
        }
    })
    .catch(e=>{
        alert('Falha ao consultar NFe, tente novamente mais tarde.')
          $('#modalB2BActive').modal('hide');

    })
   
}


const CancelMyRequest = async(idRequest,protocol)=>{
    let Request = idRequest
    var confirmX = confirm(`Deseja Cancelar o RMA ${Request}?`)
    if(confirmX){
    var url =  getUlrAPI()
   var urlapp = `${url}api/CancelMyRequest`
        


let data = JSON.stringify({
  "user": sessionStorage.getItem('usr300'),
  "pass": sessionStorage.getItem('psw300'),
  "IDRequest": Request,
  "Protocolo":protocol
  })
//   console.log(data)
      var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data  
    }  
   axios(config)
    .then(resp=>{
        let retorno = resp.data
            alert(retorno.MSG)
    MyRequests('MyRequests')
    })
    .catch(e=>{
        console.log(e)
    alert('Falha ao Cancelar solicitação de RMA, tente novamente mais tarde.')
    MyRequests('MyRequests')
    })
    }else{
        console.log('Cancelamento abortado!')
    }
}

const GetMySmgRequest = async (pld) => {
  let plMSG = pld;
  let url = plMSG.URL;
  var data = JSON.stringify({
    "user": plMSG.user,
    "pass": plMSG.pass,
    "IDRequest": plMSG.IDRequest,
    "Protocolo": plMSG.Protocolo
  });

  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios(config)
    .then(resp => {
      var dados = resp.data.data;
document.getElementById('card-msg-body').innerHTML=''
      for (let i = 0; i < dados.length; i++) {
        let divCardSender = document.createElement('div');
        let divLine = document.createElement('div');
        let LbLName = document.createElement('div');
        let textMsg = document.createElement('div');
        let LbLDataHora = document.createElement('div');
        let avatar = document.createElement('i');
        let DivLeft = document.createElement('div');
        let DivRigth = document.createElement('div');
        DivLeft.setAttribute('class', 'DVLF');

        switch (dados[i].PERFIL_SENDER) {
          case 'CUSTOMER':
            divCardSender.setAttribute('class', 'cardCustomer');
            LbLName.setAttribute('class', 'labelCustomer');
            textMsg.setAttribute('class', 'txtCustomer');
            LbLDataHora.setAttribute('class', 'DHCustomer');
            avatar.setAttribute('class', 'fa-solid fa-user');
            divLine.setAttribute('class', 'row left');
            break;

          default:
            divCardSender.setAttribute('class', 'cardSender');
            LbLName.setAttribute('class', 'labelSender');
            textMsg.setAttribute('class', 'textSender');
            LbLDataHora.setAttribute('class', 'DHSender');
            avatar.setAttribute('class', 'fa-solid fa-user-tie');
            divLine.setAttribute('class', 'row right');
            break;
        }

        LbLName.innerText = `${dados[i].Autor} - ${dados[i].PERFIL_SENDER}`;
        textMsg.innerText = dados[i].MSG;
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZone: 'America/Sao_Paulo'
        };
        var dataregistro = new Date(dados[i].CREATED_AT);
        dataregistro = dataregistro.toLocaleString('pt-BR', options);

        LbLDataHora.innerText = dataregistro;

        DivRigth.appendChild(LbLName);
        DivRigth.appendChild(textMsg);
        DivRigth.appendChild(LbLDataHora);
        DivLeft.appendChild(avatar);
        divCardSender.appendChild(DivLeft);
        divCardSender.appendChild(DivRigth);
        divLine.appendChild(divCardSender);

        let colLeft = document.createElement('div');
        let colRight = document.createElement('div');
        colLeft.classList.add('col-8');
        colRight.classList.add('col-8');

        if (dados[i].PERFIL_SENDER === 'CUSTOMER') {
          colLeft.appendChild(divLine);
          colLeft.appendChild(divCardSender);
          document.getElementById('card-msg-body').appendChild(colLeft);
        } else {
          colRight.appendChild(divLine);
          colRight.appendChild(divCardSender);
          document.getElementById('card-msg-body').appendChild(colRight);
        }
      }
    })
    .catch(e => {
      console.log(e);
      alert('Falha ao Retornar com conversas da Requisição');
    });
};




const ViewMyRequest = async(idRequest, protocol)=>{
$('#modalDetRMA').modal('show')
    document.getElementById('protocol-RMA').innerText= protocol

var url =  getUlrAPI()
var urlapp = `${url}api/ViewMyRequest`

let data = JSON.stringify({
  "user": sessionStorage.getItem('usr300'),
  "pass": sessionStorage.getItem('psw300'),
  "IDRequest": idRequest,
  "Protocolo":protocol
  })
  console.log(data)
      var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data  
    }  

axios(config)
    .then(resp=>{
        var dados =resp.data.data[0]
         document.getElementById('CabecalhoRMA').innerHTML=''
        var canceled
        var sts =dados.STATUS 
        switch (sts) {
            case '0':
            canceledFinished= `Cancelado em: ${dados.CANCELED_AT}`
            break;
            case '7':
            canceledFinished= `Concluido em: ${dados.FINISHED_AT}`
            break;
            default:
            canceledFinished=''
            break;
        }       

        var xmlCli = dados.CHAVE_NFE_DEV_CLI
        switch (xmlCli) {
            case null:
                xmlCli=''
            break;
        
            default:
            xmlCli = dados.CHAVE_NFE_DEV_CLI
            break;
        }

        var Display = `<div><br></div><div><div><b>Solicitação:</b> ${dados.PROTOCOLO}.</div>
        <div><br></div>
        <div><b>Data da solicitação:</b> ${dados.CREATED_AT} | <b>Data da Compra:</b> ${dados.DATA_COMPRA} <b>Filial:</b> ${dados.FILIAL}.</div>
        <div><br></div><div><b>Status da Solicitação:</b> ${dados.STATUSX}(${dados.STATUS_LEGENDA}) ${canceledFinished}.</div>
        <div><br></div><div><b>Chave NFe Compra:</b> ${dados.CHAVE_NFE_PORT} |&nbsp; <b>NFe Número:</b> ${dados.NUMERO_NFE} |&nbsp; <b>Venda:</b> ${dados.VENDA}.</div>
        <div><br></div><div><b>Chave NFe Devolução Cliente:</b> ${xmlCli}.</div><div><br></div>
        <div><b>Produto:</b> ${dados.PRODUTO}.</div><div><br></div><div><b>Numero de Série:</b> ${dados.NUMERO_SERIE}&nbsp; | <b>Quantidade RMA:</b> ${dados.QUANTIDADE}&nbsp; | <b>Valor Un.:</b>${dados.VALOR}.</div></div>`    

        document.getElementById('CabecalhoRMA').innerHTML= Display    
            var ns = dados.NUMERO_SERIE
            switch (ns) {
                case null:
                    ns =''
                    break;
            
                default:
                ns = ` - dados.NUMERO_SERIE`
                break;
            }
        var Item = `<div><b>Produto:</b></div><b>${dados.PRODUTO} ${ns}</b>`
        document.getElementById('ItemRMA').innerHTML=''
        document.getElementById('ItemRMA').innerHTML=Item

        // conversas do RMA
        
        document.getElementById('SendMsg').setAttribute('onclick',`SendMsg('${dados.ID}','${dados.PROTOCOLO}')`)
        

        let urlBuscaMSG=`${url}api/GetMsgRequest` 
        let plMSG = {
            "URL": urlBuscaMSG,
            "user": sessionStorage.getItem('usr300'),
            "pass": sessionStorage.getItem('psw300'),
            "IDRequest": dados.ID,
            "Protocolo":dados.PROTOCOLO
        }    
         GetMySmgRequest(plMSG)
    })
    .catch(e=>{
        console.log(e)
        alert('Falha Ao obter dados da solicitação, tente novamente mais tarde!')
    })

}

const ViewRMARequest = async(idRequest, protocol)=>{
$('#modalDetRMA').modal('show')
    document.getElementById('protocol-RMA').innerText= protocol

var url =  getUlrAPI()
var urlapp = `${url}api/ViewRMARequest`

let data = JSON.stringify({
  "user": sessionStorage.getItem('usr300'),
  "pass": sessionStorage.getItem('psw300'),
  "IDRequest": idRequest,
  "Protocolo":protocol
  })
  console.log(data)
      var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data  
    }  

axios(config)
    .then(resp=>{
        var dados =resp.data.data[0]
         document.getElementById('CabecalhoRMA').innerHTML=''
        var canceled
        var sts =dados.STATUS 
        switch (sts) {
            case '0':
            canceledFinished= `Cancelado em: ${dados.CANCELED_AT}`
            break;
            case '7':
            canceledFinished= `Concluido em: ${dados.FINISHED_AT}`
            break;
            default:
            canceledFinished=''
            break;
        }       

        var xmlCli = dados.CHAVE_NFE_DEV_CLI
        switch (xmlCli) {
            case null:
                xmlCli=''
            break;
        
            default:
                let xmlVs=dados.XML_DEV_CLI
                xmlVs = xmlVs.replace(/\"/g, "'")
                sessionStorage.removeItem('DXLSTR')
                sessionStorage.setItem('DXLSTR',xmlVs)
            xmlCli = `<button class="btn btn-default btn-sm DonwloadXMl" onclick="downloadXML('${dados.CHAVE_NFE_DEV_CLI}')" title="Fazer Download do xml"> ${dados.CHAVE_NFE_DEV_CLI}</button>`
            break;
        }

        var Display = `<div><br></div><div><div><b>Solicitação:</b> ${dados.PROTOCOLO}.</div>
        <div><br></div>
        <div><b>Data da solicitação:</b> ${dados.CREATED_AT} | <b>Data da Compra:</b> ${dados.DATA_COMPRA} <b>Filial:</b> ${dados.FILIAL}.</div>
        <div><br></div><div><b>Status da Solicitação:</b> ${dados.STATUSX}(${dados.STATUS_LEGENDA}) ${canceledFinished}.</div>
        <div><br></div><div><b>Chave NFe Compra:</b> ${dados.CHAVE_NFE_PORT} |&nbsp; <b>NFe Número:</b> ${dados.NUMERO_NFE} |&nbsp; <b>Venda:</b> ${dados.VENDA}.</div>
        <div><br></div><div><b>Chave NFe Devolução Cliente:</b> ${xmlCli}.</div><div><br></div>
        <div><b>Produto:</b> ${dados.PRODUTO}.</div><div><br></div><div><b>Numero de Série:</b> ${dados.NUMERO_SERIE}&nbsp; | <b>Quantidade RMA:</b> ${dados.QUANTIDADE}&nbsp; | <b>Valor Un.:</b>${dados.VALOR}.</div></div>`    

        document.getElementById('CabecalhoRMA').innerHTML= Display    
            var ns = dados.NUMERO_SERIE
            switch (ns) {
                case null:
                    ns =''
                    break;
            
                default:
                ns = ` - ${dados.NUMERO_SERIE}`
                break;
            }
        var Item = `<div><b>Produto:</b></div><b>${dados.PRODUTO} ${ns}</b>`
        document.getElementById('ItemRMA').innerHTML=''
        document.getElementById('ItemRMA').innerHTML=Item

        // conversas do RMA
        
        document.getElementById('SendMsg').setAttribute('onclick',`SendMsg('${dados.ID}','${dados.PROTOCOLO}')`)
        

        let urlBuscaMSG=`${url}api/GetMsgRequest` 
        let plMSG = {
            "URL": urlBuscaMSG,
            "user": sessionStorage.getItem('usr300'),
            "pass": sessionStorage.getItem('psw300'),
            "IDRequest": dados.ID,
            "Protocolo":dados.PROTOCOLO
        }    
         GetMySmgRequest(plMSG)
    })
    .catch(e=>{
        console.log(e)
        alert('Falha Ao obter dados da solicitação, tente novamente mais tarde!')
    })

}
const SendMsg = async (id,protocol)=>{
   var url =  getUlrAPI()
var urlapp = `${url}api/SetMsgRequest`
var IDRequest =id
var Protocolo =protocol

let data = JSON.stringify({
  "user": sessionStorage.getItem('usr300'),
  "pass": sessionStorage.getItem('psw300'),
  "IDRequest": IDRequest,
  "Protocolo":Protocolo,
  "perfil":sessionStorage.getItem('acc300'), 
  "msg": document.getElementById('msg').value
  }) 
console.log(data)
      var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data  
    }  
console.log(config)
axios(config)
    .then(resp=>{
        ViewRMARequest(IDRequest,Protocolo)
        document.getElementById('msg').value=''
    })
.catch(e=>{
    console.log(e)
    alert('Falha ao tentar enviar mensagem, tente novamente mais tarde.')
})

}

const Pre_send_My_xml_Request = async(IDRequest, protocol)=>{
    $('#ModalUPloadXML').modal('show')
    document.getElementById('btn_send_my_xml').setAttribute('onclick',`SendMyXmlRequest(${IDRequest})`)



}

const SendMyXmlRequest = async(IDRequest)=>{
    let fileInput = document.getElementById('xml_nfe');
    let file = fileInput.files[0];
     var url =  getUlrAPI()
     var urlapp = `${url}api/SendMyXmlRequest`
    if (file) {
        let reader = new FileReader();
        
        reader.onload = function(event) {
            let xmlContent = event.target.result; // Conteúdo do arquivo XML
            xmlContent.replace(/"/g, "'");
            xmlContent.replace('"', "'");
            xmlContent = xmlContent.replace(/&quot;/g, "'").replace(/"/g, "'");


            // Parse do XML
                    var idValue = document.getElementById('chaveACcDEV').value
                    if(idValue.length !=44){
                    
                        alert('chave de acesso Inválida! \n(diferente de 44 caracteres)')
                        process.exit()
                    }
            let data =JSON.stringify({
                "user": sessionStorage.getItem('usr300'),
                "pass": sessionStorage.getItem('psw300'),
                "IDRequest": IDRequest,
                "XML":xmlContent,
                "chave":idValue
            })
        //    console.log(data)
      var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data  
    } 

        axios(config)
        .then(resp=>{
            var dt = resp.data

        switch (dt.MSG) {
            case 'Permitido':
                
            alert('XML Importado com sucesso')
             $('#ModalUPloadXML').modal('hide')
             MyRequests('MyRequests')
            break;
            default:
              alert(dt.MSG)
             $('#ModalUPloadXML').modal('hide')
            break;        
        }



        })
        .catch(e=>{
            console.log(e)
            alert('Falha ao enviar XML')
    $('#ModalUPloadXML').modal('hide')

        })




        };
        
        reader.readAsText(file); // Lê o conteúdo do arquivo como texto
    } else {
        console.error('Nenhum arquivo selecionado.');
        alert('Nenhum arquivo selecionado.');
    }
}



const getRMARequests =async ()=>{
  var url =  getUlrAPI()
    var urlapp = `${url}api/getRMARequests`
    
    var payload = JSON.stringify({
        user: sessionStorage.getItem('usr300'),
        pass: sessionStorage.getItem('psw300'),
        acesso:sessionStorage.getItem('acc300')
    })
    var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload  
    }  
    console.log(urlapp)  
axios(config)
 .then(resp=>{
    let result  =  resp.data
    let sts = result.MSG
    let dados = result.token
    const corpoTabela= document.getElementById('body_table_cliente')
    switch (sts) {
        case "Positivo":
            if (dados.length ===0) {
                let html=`<tr><td colspan="10"><center>Não Há Solicitações abertas...</center></td></tr>`
                corpoTabela.innerHTML= html
            }else{
            corpoTabela.innerHTML=''

                for (let i = 0; i < dados.length; i++) {

                    // cria os elementos
                    let tr = document.createElement('tr')
                    let tdStatus = document.createElement('td')
                    let tdProtocolo = document.createElement('td')
                    let tdabertura = document.createElement('td')
                    let tddataCompra = document.createElement('td')
                    let tdproduto = document.createElement('td')
                    let tdValUn = document.createElement('td')
                    let tdQtde = document.createElement('td')
                    let tdOpc = document.createElement('td')
                    let DrwCircleSts = document.createElement('div')
                    let btnView = document.createElement('button')
                    let btnLiveSTS = document.createElement('button')
                    let btnCancel = document.createElement('button')
                    
                    tdOpc.setAttribute('id','tdOpc')

                    btnCancel.setAttribute('class','btn btn-sm btn-danger btn-round')
                    btnView.setAttribute('class','btn btn-sm btn-info btn-round')
                    

                    btnCancel.setAttribute('title','Reprovar Solicitação')
                    btnView.setAttribute('title','Ver Detalhes')
                    

                    btnCancel.setAttribute('onclick',`RecuseRMARequest('${dados[i].ID}','${dados[i].PROTOCOLO}')`)
                    btnView.setAttribute('onclick',`ViewRMARequest('${dados[i].ID}','${dados[i].PROTOCOLO}')`)
                    btnView.setAttribute('data-target',`modalDetRMA`)
                    btnView.setAttribute('data-toggle',`modal`)

                    btnCancel.innerHTML='<i class="fa-solid fa-hand"></i>'
                    btnView.innerHTML = '<i class="fa-solid fa-eye"></i>' 
                    btnLiveSTS.innerHTML='<i class="fa-regular fa-thumbs-up"></i>'
                    
                    btnLiveSTS.setAttribute('data-target',`ModalUPloadXML`)
                    btnLiveSTS.setAttribute('data-toggle',`modal`)
                    btnLiveSTS.setAttribute('onclick',`Pre_send_My_xml_Request('${dados[i].ID}','${dados[i].PROTOCOLO}')`)

                    let valsts = dados[i].STATUS
                    switch (valsts) {
                        case '0':
                            let spn = document.createElement('i')
                            spn.setAttribute('class','fa-solid fa-ban')
                            DrwCircleSts.appendChild(spn)
                            // tdOpc.appendChild(btnCancel)

                            tdOpc.appendChild(btnView)
                        break;
                        case '1':
                    btnLiveSTS.setAttribute('title','Aprovar Pedido')
                    
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-aporove btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMASTS('${dados[i].ID}','${dados[i].PROTOCOLO}','2')`)

                            DrwCircleSts.setAttribute('class','Circle cricle-gray')
                            tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)
                            tdOpc.appendChild(btnLiveSTS)                           

                        break;
                        case '2':
                            DrwCircleSts.setAttribute('class','Circle cricle-green')

                    btnLiveSTS.setAttribute('title','NF Devolução em Análise')
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-fature btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMASTS('${dados[i].ID}','${dados[i].PROTOCOLO}','4')`)
                    tdOpc.appendChild(btnCancel)
                        tdOpc.appendChild(btnView)
                            tdOpc.appendChild(btnLiveSTS)                           


                         
                        break;                        
                        case '3':
                            DrwCircleSts.setAttribute('class','Circle cricle-red')
                            tdOpc.appendChild(btnView)                            
                        break;                        
                        case '4':
                            DrwCircleSts.setAttribute('class','Circle cricle-blue')
                    btnLiveSTS.setAttribute('title','NF Válida')
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-valid btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMASTS('${dados[i].ID}','${dados[i].PROTOCOLO}','5')`)                        
                            tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)
                            tdOpc.appendChild(btnLiveSTS)                           

                        break;                        
                        case '5':
                            DrwCircleSts.setAttribute('class','Circle cricle-brown')
                    btnLiveSTS.setAttribute('title','Item Coletato Pelo SAC')
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-coleted btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMASTS('${dados[i].ID}','${dados[i].PROTOCOLO}','6')`)                        
                    
                            tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)  
                            tdOpc.appendChild(btnLiveSTS)                           

                        break;                        
                        case '6':

                            DrwCircleSts.setAttribute('class','Circle cricle-outline-gray')
                        btnLiveSTS.setAttribute('title','Marcar Como Processo concluido')
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-Finished btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMASTS('${dados[i].ID}','${dados[i].PROTOCOLO}','7')`)                        
                            tdOpc.appendChild(btnView)                           
                            tdOpc.appendChild(btnLiveSTS)                           
                        
                        
                        
                        break;
                        default:
                            DrwCircleSts.setAttribute('class','Circle cricle-black')
                            tdOpc.appendChild(btnView)                            
                        break;
                    }

                    // formata a data 
                    // Formato brasileiro
                        const options = { 
                     day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric', 
                        timeZone: 'America/Sao_Paulo' 
                        };

                var datacompra = new Date(dados[i].DATA_COMPRA);
                datacompra = datacompra.toLocaleString('pt-BR', options); 
                  
                var dataregistro = new Date(dados[i].CREATED_AT);
                dataregistro = datacompra.toLocaleString('pt-BR', options); 

                    // preenche as celulas
                    DrwCircleSts.setAttribute('title',`${dados[i].LEGENDA}`)
                    tdabertura.innerText= dataregistro
                    tddataCompra.innerText= datacompra
                    tdProtocolo.innerText= dados[i].PROTOCOLO
                    tdproduto.innerText= dados[i].PRODUTO
                    tdValUn.innerText= parseFloat(dados[i].VALOR).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                    tdQtde.innerText= dados[i].QUANTIDADE

                //  exibe a linha na tabela 
                    tdStatus.appendChild(DrwCircleSts)
                    tr.appendChild(tdStatus)
                    tr.appendChild(tdProtocolo)
                    tr.appendChild(tdabertura)
                    tr.appendChild(tddataCompra)
                    tr.appendChild(tdproduto)
                    tr.appendChild(tdValUn)
                    tr.appendChild(tdQtde)
                    tr.appendChild(tdOpc)  
                    corpoTabela.appendChild(tr)

                    if (i === dados.length-1) {
                        new DataTable('#table_cliente')
                    }

                }


            }
        break;
    
        default:
          alert('Falha ao validar o usuário, Faça login novamente')
          logout()
        break;
    }


 })
 .catch(e=>{
    console.log(e)
    var msg = e.response.data.error
    alert(msg)
    logout()
    
 })   
}

const  SetRMASTS = async(IDRequest, protocol, nextSts)=>{
  var url =  getUlrAPI()
    var urlapp = `${url}api/SetRMASTS`
    var next=nextSts
    var protocolo = protocol
    var payload = JSON.stringify({
        user: sessionStorage.getItem('usr300'),
        pass: sessionStorage.getItem('psw300'),
        acesso:sessionStorage.getItem('acc300'),
        Next:next,
        Request:IDRequest,
        protocol:protocolo
    })
    let proximoStatus= stsData[next].Display
    let confirmation = confirm(`Deseja Atualizar a Requisição \n${protocolo} \npara o status ${proximoStatus}`)
    if (confirmation) {
       var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload  
    }  
    console.log(urlapp)  
axios(config)
 .then(resp=>{
    alert(`Status atualizado com sucesso para ${proximoStatus}`)
    RMARequests('RMARequests')
 })
 .catch(e=>{
var msg = e.response.data.error
    alert(msg)
    logout()
 })  
    }


}

const getRMAFullRequests =async ()=>{
  var url =  getUlrAPI()
    var urlapp = `${url}api/getRMAFullRequests`
    
    var payload = JSON.stringify({
        user: sessionStorage.getItem('usr300'),
        pass: sessionStorage.getItem('psw300'),
        acesso:sessionStorage.getItem('acc300')
    })
    var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload  
    }  
    console.log(urlapp)  
axios(config)
 .then(resp=>{
    let result  =  resp.data
    let sts = result.MSG
    let dados = result.token
    const corpoTabela= document.getElementById('body_table_cliente')
    switch (sts) {
        case "Positivo":
            if (dados.length ===0) {
                let html=`<tr><td colspan="10"><center>Não Há Solicitações abertas...</center></td></tr>`
                corpoTabela.innerHTML= html
            }else{
            corpoTabela.innerHTML=''

                for (let i = 0; i < dados.length; i++) {

                    // cria os elementos
                    let tr = document.createElement('tr')
                    let tdStatus = document.createElement('td')
                    let tdProtocolo = document.createElement('td')
                    let tdabertura = document.createElement('td')
                    let tddataCompra = document.createElement('td')
                    let tdproduto = document.createElement('td')
                    let tdValUn = document.createElement('td')
                    let tdQtde = document.createElement('td')
                    let tdOpc = document.createElement('td')
                    let DrwCircleSts = document.createElement('div')
                    let btnView = document.createElement('button')
                    let btnLiveSTS = document.createElement('button')
                    let btnCancel = document.createElement('button')
                    
                    tdOpc.setAttribute('id','tdOpc')

                    btnCancel.setAttribute('class','btn btn-sm btn-danger btn-round')
                    btnView.setAttribute('class','btn btn-sm btn-info btn-round')
                    

                    btnCancel.setAttribute('title','Reprovar Solicitação')
                    btnView.setAttribute('title','Ver Detalhes')
                    

                    btnCancel.setAttribute('onclick',`RecuseRMARequest('${dados[i].ID}','${dados[i].PROTOCOLO}')`)
                    btnView.setAttribute('onclick',`ViewRMARequest('${dados[i].ID}','${dados[i].PROTOCOLO}')`)
                    btnView.setAttribute('data-target',`modalDetRMA`)
                    btnView.setAttribute('data-toggle',`modal`)

                    btnCancel.innerHTML='<i class="fa-solid fa-hand"></i>'
                    btnView.innerHTML = '<i class="fa-solid fa-eye"></i>' 
                    btnLiveSTS.innerHTML='<i class="fa-regular fa-thumbs-up"></i>'
                    
                    btnLiveSTS.setAttribute('data-target',`ModalUPloadXML`)
                    btnLiveSTS.setAttribute('data-toggle',`modal`)
                    btnLiveSTS.setAttribute('onclick',`Pre_send_My_xml_Request('${dados[i].ID}','${dados[i].PROTOCOLO}')`)

                    let valsts = dados[i].STATUS
                    switch (valsts) {
                        case '0':
                            let spn = document.createElement('i')
                            spn.setAttribute('class','fa-solid fa-ban')
                            DrwCircleSts.appendChild(spn)
                            // tdOpc.appendChild(btnCancel)

                            tdOpc.appendChild(btnView)
                        break;
                        case '1':
                    btnLiveSTS.setAttribute('title','Aprovar Pedido')
                    
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-aporove btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMAFullSTS('${dados[i].ID}','${dados[i].PROTOCOLO}','2')`)

                            DrwCircleSts.setAttribute('class','Circle cricle-gray')
                            tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)
                            tdOpc.appendChild(btnLiveSTS)                           

                        break;
                        case '2':
                            DrwCircleSts.setAttribute('class','Circle cricle-green')

                    btnLiveSTS.setAttribute('title','NF Devolução em Análise')
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-fature btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMAFullSTS('${dados[i].ID}','${dados[i].PROTOCOLO}','4')`)
                    tdOpc.appendChild(btnCancel)
                        tdOpc.appendChild(btnView)
                            tdOpc.appendChild(btnLiveSTS)                           


                         
                        break;                        
                        case '3':
                            DrwCircleSts.setAttribute('class','Circle cricle-red')
                            tdOpc.appendChild(btnView)                            
                        break;                        
                        case '4':
                            DrwCircleSts.setAttribute('class','Circle cricle-blue')
                    btnLiveSTS.setAttribute('title','NF Válida')
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-valid btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMAFullSTS('${dados[i].ID}','${dados[i].PROTOCOLO}','5')`)                        
                            tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)
                            tdOpc.appendChild(btnLiveSTS)                           

                        break;                        
                        case '5':
                            DrwCircleSts.setAttribute('class','Circle cricle-brown')
                    btnLiveSTS.setAttribute('title','Item Coletato Pelo SAC')
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-coleted btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMAFullSTS('${dados[i].ID}','${dados[i].PROTOCOLO}','6')`)                        
                    
                            tdOpc.appendChild(btnCancel)
                            tdOpc.appendChild(btnView)  
                            tdOpc.appendChild(btnLiveSTS)                           

                        break;                        
                        case '6':

                            DrwCircleSts.setAttribute('class','Circle cricle-outline-gray')
                        btnLiveSTS.setAttribute('title','Marcar Como Processo concluido')
                    btnLiveSTS.setAttribute('class','btn btn-sm btn-Finished btn-round')
                    btnLiveSTS.setAttribute('onclick',`SetRMAFullSTS('${dados[i].ID}','${dados[i].PROTOCOLO}','7')`)                        
                            tdOpc.appendChild(btnView)                           
                            tdOpc.appendChild(btnLiveSTS)                           
                        
                        
                        
                        break;
                        default:
                            DrwCircleSts.setAttribute('class','Circle cricle-black')
                            tdOpc.appendChild(btnView)                            
                        break;
                    }

                    // formata a data 
                    // Formato brasileiro
                        const options = { 
                     day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric', 
                        timeZone: 'America/Sao_Paulo' 
                        };

                var datacompra = new Date(dados[i].DATA_COMPRA);
                datacompra = datacompra.toLocaleString('pt-BR', options); 
                  
                var dataregistro = new Date(dados[i].CREATED_AT);
                dataregistro = datacompra.toLocaleString('pt-BR', options); 

                    // preenche as celulas
                    DrwCircleSts.setAttribute('title',`${dados[i].LEGENDA}`)
                    tdabertura.innerText= dataregistro
                    tddataCompra.innerText= datacompra
                    tdProtocolo.innerText= dados[i].PROTOCOLO
                    tdproduto.innerText= dados[i].PRODUTO
                    tdValUn.innerText= parseFloat(dados[i].VALOR).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                    tdQtde.innerText= dados[i].QUANTIDADE

                //  exibe a linha na tabela 
                    tdStatus.appendChild(DrwCircleSts)
                    tr.appendChild(tdStatus)
                    tr.appendChild(tdProtocolo)
                    tr.appendChild(tdabertura)
                    tr.appendChild(tddataCompra)
                    tr.appendChild(tdproduto)
                    tr.appendChild(tdValUn)
                    tr.appendChild(tdQtde)
                    tr.appendChild(tdOpc)  
                    corpoTabela.appendChild(tr)

                    if (i === dados.length-1) {
                        new DataTable('#table_cliente')
                    }

                }


            }
        break;
    
        default:
          alert('Falha ao validar o usuário, Faça login novamente')
          logout()
        break;
    }


 })
 .catch(e=>{
    console.log(e)
    var msg = e.response.data.error
    alert(msg)
    logout()
    
 })   
}

// aqui 
const  SetRMAFullSTS = async(IDRequest, protocol, nextSts)=>{
  var url =  getUlrAPI()
    var urlapp = `${url}api/SetRMASTS`
    var next=nextSts
    var protocolo = protocol
    var payload = JSON.stringify({
        user: sessionStorage.getItem('usr300'),
        pass: sessionStorage.getItem('psw300'),
        acesso:sessionStorage.getItem('acc300'),
        Next:next,
        Request:IDRequest,
        protocol:protocolo
    })
    let proximoStatus= stsData[next].Display
    let confirmation = confirm(`Deseja Atualizar a Requisição \n${protocolo} \npara o status ${proximoStatus}`)
    if (confirmation) {
       var config ={
      method: 'post',
        maxBodyLength: Infinity,
        url: urlapp,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload  
    }  
    console.log(urlapp)  
axios(config)
 .then(resp=>{
    alert(`Status atualizado com sucesso para ${proximoStatus}`)
    RMAFullRequests('RMAFullRequests')
 })
 .catch(e=>{
var msg = e.response.data.error
    alert(msg)
    logout()
 })  
    }


}

const mascaraCPFCNPJView = (inputValue) => {
    let value = inputValue.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length <= 11) {
        // Formatando CPF
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
        // Formatando CNPJ
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return value;
};




const mascaraCPF=(cpfInput)=>{
    cpfInput.addEventListener('input', function() {
        let value = cpfInput.value;
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (value.length > 3) {
            value = value.replace(/^(\d{3})/, '$1.');
        }
        if (value.length > 7) {
            value = value.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
        }
        if (value.length > 11) {
            value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
        }
        cpfInput.value = value;
    });
}

function mascaraTelefone(telefoneInput) {
    telefoneInput.addEventListener('input', function() {
        let value = telefoneInput.value;
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (value.length === 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {
            value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        telefoneInput.value = value;
    });
}

const getFiliais=()=>{
        var url =  getUlrAPI()
    var urlapp = `${url}api/getUnity`
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: urlapp,
  headers: { 
    'Content-Type': 'application/json'
  }
};
 document.getElementById('inputFilSacDisplay').innerHTML=''
 document.getElementById('inputFilSacDisplay').innerHTML='<option value="xxx">Selecione</option><option value="null">Não Aplica</option>'
axios.request(config)
.then((response) => {
  let fil = response.data
  console.log(fil.length)
  for (let cidade in fil) {
    let option = document.createElement('option')
    option.setAttribute('value',`${cidade}_${fil[cidade].CNPJ}`)
    option.innerText=`${cidade}`
    document.getElementById('inputFilSacDisplay').appendChild(option)
  }
})
.catch((error) => {
    console.log(error)
  alert('Falha ao Obter Filiais!')
});
}


// abre modal de novo usuário e limpa os inputs
const newUser=async()=>{
const cpfInput = document.getElementById('CPf');
mascaraCPF(cpfInput);

// Aplicando a máscara de Telefone/Celular
const telefoneInput = document.getElementById('inputTelefone');
mascaraTelefone(telefoneInput);


const CelularInput = document.getElementById('inputCelular');
mascaraTelefone(CelularInput);

document.getElementById('modaltitle').innerHTML='Novo Usuário'
await getFiliais()

document.getElementById('saveEditDataUser').setAttribute('onclick',`saveDataUser(0)`)
var status = document.getElementById('inputStatus')
var nome = document.getElementById('inputNome')
var email = document.getElementById('inputEmail')
var cpf = document.getElementById('CPf')
var grupo = document.getElementById('inputGrupo')
var senha = document.getElementById('inputSenha')
var celular = document.getElementById('inputCelular')
var telefone = document.getElementById('inputTelefone')
var Contato = document.getElementById('inputContato')
var Filial = document.getElementById('inputFilSacDisplay')
 status.value='' 
        nome.value='' 
        email.value=''
        cpf.value='' 
        grupo.value=''
        senha.value=''
        celular.value='' 
        telefone.value=''
        Contato.value='' 
        Filial.value=''

}


// envia os dados do novo usuário para o servidor
const sendNewUser=()=>{
console.log('Opaaa')
}


// busca os dado usuário no servidor para edição 
const getdataUser = async(IDUserx) =>{
await getFiliais()
var IDUser = IDUserx
sessionStorage.setItem('TmpiU',IDUser)

let verifyType = sessionStorage.getItem('userConfsetType')






var status = document.getElementById('inputStatus')
var nome = document.getElementById('inputNome')
var email = document.getElementById('inputEmail')
var cpf = document.getElementById('CPf')
var grupo = document.getElementById('inputGrupo')
var senha = document.getElementById('inputSenha')
var celular = document.getElementById('inputCelular')
var telefone = document.getElementById('inputTelefone')
var Contato = document.getElementById('inputContato')
var Filial = document.getElementById('inputFilSacDisplay')

const cpfInput = document.getElementById('CPf');
mascaraCPF(cpfInput);
// Aplicando a máscara de Telefone/Celular
const telefoneInput = document.getElementById('inputTelefone');
mascaraTelefone(telefoneInput);


const CelularInput = document.getElementById('inputCelular');
mascaraTelefone(CelularInput);

document.getElementById('saveEditDataUser').setAttribute('onclick',`saveDataUser(1)`)
 status.value='' 
 nome.value='' 
 email.value=''
 cpf.value='' 
 grupo.value=''
 senha.value=''
 celular.value='' 
 telefone.value=''
 Contato.value='' 
 Filial.value=''

  var url =  getUlrAPI()
  var urlapp = `${url}api/getUserData`
    var payload = JSON.stringify({
        user: sessionStorage.getItem('usr300'),
        pass: sessionStorage.getItem('psw300'),
        acesso:sessionStorage.getItem('acc300'),
        UserID:IDUser
    })


let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: urlapp,
  headers: { 
    'Content-Type': 'application/json'
  },data:payload
};

axios(config)
    .then(resp=>{

        var dados = resp.data.data[0]
    
        status.value=dados.STATUS 
        nome.value=dados.NOME
        email.value=dados.EMAIL
        cpf.value=dados.CPFCNPJ 
        grupo.value=dados.GRUPO
        senha.value=dados.SENHA
        celular.value=dados.CELULAR 
        telefone.value=dados.TELEFONE
        Contato.value=dados.CONTATO 
        Filial.value=`${dados.FIL_SAC_DISPLAY}_${dados.FIL_SAC_CNPJ}`
        document.getElementById('modaltitle').innerHTML=`Detalhes do Usuário: ${dados.NOME}`
    })
    .catch(e=>{
        console.log(e)
        alert('Falha ao obter dados do Usuário')
    })



}

const openPassX=(opc)=>{
    let opcao = opc
    switch (opcao) {
        case '1':
            document.getElementById('openPass').innerHTML='<i class="fa-solid fa-eye-slash"></i>'
             document.getElementById('openPass').setAttribute('onclick',"openPassX('0')")
             document.getElementById('openPass').setAttribute('title',"ocultar senha")
             document.getElementById('openPass').setAttribute('type','text')
             document.getElementById('inputSenha').setAttribute('type','text')

        break;
    
        default:
             document.getElementById('openPass').innerHTML='<i class="fa-solid fa-eye"></i>'
             document.getElementById('openPass').setAttribute('onclick',"openPassX('1')")
             document.getElementById('openPass').setAttribute('title',"Exibir senha")

             document.getElementById('openPass').setAttribute('type','text')
             document.getElementById('inputSenha').setAttribute('type','password')
        break;
    }
}

const loadContUser =(opc) =>{
var url =  getUlrAPI()

switch (opc) {
    case 'cli':
        
var urlapp = `${url}api/getUsersCostumers`
    break;

    default:
var urlapp = `${url}api/getUsers`

        break;
}



    let payload = JSON.stringify({
        "user":sessionStorage.getItem('usr300'),
        "pass":sessionStorage.getItem('psw300'),
        "acesso":sessionStorage.getItem('acc300')
    })

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: urlapp,
  headers: { 
    'Content-Type': 'application/json'
  },
  data:payload
};
axios(config)
    .then(resp=>{
        var dados = resp.data.data
document.getElementById('body_table_cliente').innerHTML=''
var display= document.getElementById('body_table_cliente')

for (let i = 0; i < dados.length; i++) {
        var tr =  document.createElement('tr')
        var tdSts = document.createElement('td')
        var tdemail = document.createElement('td')
        var tdnome = document.createElement('td')
        var tdcpf = document.createElement('td')
        var tdgrupo = document.createElement('td')
        var tdopc = document.createElement('td')
        let buttonActiveInative = document.createElement('button')
        let buttonEdit = document.createElement('button')

        var status = dados[i].STATUS
        switch (status) {
            case 1: 
            status = 'Ativo'
        buttonActiveInative.innerHTML='<i class="fa-regular fa-hand"></i>'
        buttonActiveInative.setAttribute('onclick',`PlayStopUser('${dados[i].idUSUARIOS}','0')`)

            break;
        
            default:
            status = 'Inativo'
        buttonActiveInative.innerHTML='<i class="fa-solid fa-play"></i>'
        buttonActiveInative.setAttribute('onclick',`PlayStopUser('${dados[i].idUSUARIOS}','1')`)

            break;
        }
        tdSts.innerText = status
        tdnome.innerText = dados[i].NOME
        tdemail.innerText = dados[i].EMAIL
        let cpf=mascaraCPFCNPJView(dados[i].CPFCNPJ)
        tdcpf.innerText = cpf
        tdgrupo.innerText = dados[i].GRUPO


        buttonEdit.setAttribute('onclick',`getdataUser('${dados[i].idUSUARIOS}')`)
        buttonEdit.setAttribute('class','btn btn-sm btn-info btn-round')
        buttonEdit.innerHTML='<i class="fa-solid fa-pen-to-square"></i>'

        buttonEdit.setAttribute('data-target',`#modaoCli`)
        buttonEdit.setAttribute('data-toggle',`modal`)
        buttonActiveInative.setAttribute('class','btn btn-sm  btn-warning btn-round')
        tdopc.setAttribute('class','opcbtnsuer')
        tdopc.appendChild(buttonEdit)
        tdopc.appendChild(buttonActiveInative)

        tr.appendChild(tdSts)
        tr.appendChild(tdnome)
        tr.appendChild(tdemail)
        tr.appendChild(tdcpf)
        tr.appendChild(tdgrupo)
        tr.appendChild(tdopc)
        display.appendChild(tr)



        if ( i== dados.length-1) {
             new DataTable('#table_cliente')
        }

}
    })
    .catch(e=>{
        console.log(e)
        alert('falha ao obter usuários do sistema')
    })
}


const PlayStopUser = async(idUser,opcx)=>{
    var opc = opcx
    var url =  getUlrAPI()
    var urlapp = `${url}api/PlayStopUser`
    var msg
    var action
switch (opc) {
    case '0':
        msg='Cliente inativado com Sucesso!' 
        action='Inativar'   
    break;

    default:
        msg='Cliente Ativado com Sucesso!'  
        action='Ativar'   

    break;
}
    var confirmation = confirm(`Deseja ${action} o Usuário selecionado?`)

    if (confirmation) {
        

    let payload = JSON.stringify({
        "user":sessionStorage.getItem('usr300'),
        "pass":sessionStorage.getItem('psw300'),
        "acesso":sessionStorage.getItem('acc300'),
        "opc":opc,
        "IdUser":idUser
    })

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: urlapp,
  headers: { 
    'Content-Type': 'application/json'
  },
  data:payload
}; 
axios(config)
    .then(()=>{
        alert(msg)
        
        ContUser('ContUser')
    })
    .catch((e)=>{
        console.log(e)
        alert('Falha ao Relizar a operação! \nTente novamente mais tarde.')
        ContUser('ContUser')
        
        
    })
    }else{
        console.log(`Opreação de ${action} usuário abortada com sucesso!`)
    }
}

const getConfigs = async()=>{
   var url =  getUlrAPI()
    var urlapp = `${url}api/getConfigs`

    let payload = JSON.stringify({
        "user":sessionStorage.getItem('usr300'),
        "pass":sessionStorage.getItem('psw300'),
        "acesso":sessionStorage.getItem('acc300'),
    })

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: urlapp,
  headers: { 
    'Content-Type': 'application/json'
  },
  data:payload
}; 
axios(config)
    .then(resp=>{
        var dados = resp.data.configs
         createFormFieldsCof(dados)
    })
    .catch(e=>{
        console.log(e)
      alert('Falha ao carregar as configurações, \nTente novamente mais tarde.')
    })

}


const createFormFieldsConfSub = (json, parentKey = '') => {
    const formFields = document.getElementById('formFields');
    const keysArray = Object.keys(json); // Obtém as chaves do objeto como um array

    keysArray.forEach(key => {
        const divField = document.createElement('div');

        const label = document.createElement('label');
        label.textContent ='  '+ key + ': ';
        label.style.fontWeight = 'bold';
        label.setAttribute('class','SubConfigClass')
        divField.appendChild(label);

        if (Array.isArray(json[key])) {
            const textareaField = document.createElement('textarea');
            // textareaField.setAttribute('id', key);
            textareaField.setAttribute('id', parentKey ? `C${parentKey}_${key}` : key);

            textareaField.setAttribute('name', parentKey ? `C${parentKey}_${key}` : key);
            textareaField.setAttribute('class', 'form-control col-8 SubConfigClassInput');
            textareaField.value = json[key].join(', '); // Exibe os arrays em um textarea separados por vírgula
            divField.appendChild(textareaField);
        } else {
            const inputField = document.createElement('input');
            inputField.setAttribute('type', key.toLowerCase().includes('pass') ? 'password' : 'text');
            // inputField.setAttribute('id', key);

            inputField.setAttribute('id', parentKey ? `C${parentKey}_${key}` : key);

            inputField.setAttribute('name', parentKey ? `C${parentKey}_${key}` : key);
            inputField.setAttribute('value', json[key]);
            inputField.setAttribute('class', 'form-control col-8 subForm SubConfigClassInput');
            divField.appendChild(inputField);

        }

        let xpace = document.createElement('p')            

        formFields.appendChild(divField);
        formFields.appendChild(xpace)
    });
}


// Função para criar os campos do formulário baseado no JSON
const createFormFieldsCof = (json, parentKey = '') => {
    const formFields = document.getElementById('formFields');
    const keysArray = Object.keys(json); // Obtém as chaves do objeto como um array

    keysArray.forEach(key => {
        const divField = document.createElement('div');
            let hr = document.createElement('hr');
            divField.appendChild(hr);
        const label = document.createElement('label');
        label.textContent = ':: '+key + ': ';
        label.style.fontWeight = 'bold'; // Deixa as chaves principais em negrito
        divField.appendChild(label);
        
        if (Array.isArray(json[key])) {
            const textareaField = document.createElement('textarea');
            // textareaField.setAttribute('id', key);
            textareaField.setAttribute('id', parentKey ? `C${parentKey}_${key}` : key);
            textareaField.setAttribute('name', parentKey ? `C${parentKey}_${key}` : key);
            textareaField.setAttribute('class', 'form-control col-8');
            textareaField.value = json[key].join(', '); // Exibe os arrays em um textarea separados por vírgula
            divField.appendChild(textareaField);
        } else if (typeof json[key] === 'object') {
            // let hr = document.createElement('hr');
            // divField.appendChild(hr);
            createFormFieldsConfSub(json[key], parentKey ? `C${parentKey}_${key}` : key);
        } else {
            const inputField = document.createElement('input');
            inputField.setAttribute('type', key.toLowerCase().includes('password') ? 'password' : 'text');
            // inputField.setAttribute('id', key);
            inputField.setAttribute('id', parentKey ? `C${parentKey}_${key}` : key);
            inputField.setAttribute('name', parentKey ? `C${parentKey}_${key}` : key);
            inputField.setAttribute('value', json[key]);
            inputField.setAttribute('class', 'form-control col-8');
            divField.appendChild(inputField);
            // let hr = document.createElement('hr');
            // divField.appendChild(hr);
        }

        formFields.appendChild(divField);
    });
}

const  salvarAlteracoesCof=()=> {
    const form = document.getElementById('configForm');
    const formData = new FormData(form);
    const jsonObject = {};

    formData.forEach((value, key) => {
        if (jsonObject.hasOwnProperty(key)) {
            if (!Array.isArray(jsonObject[key])) {
                jsonObject[key] = [jsonObject[key]];
            }
            jsonObject[key].push(value);
        } else {
            jsonObject[key] = value;
        }
    });
    console.log(JSON.stringify(jsonObject))
    var url =  getUlrAPI()
    var urlapp = `${url}api/setConfigs`
    var payload = JSON.stringify({
        "user":sessionStorage.getItem('usr300'),
        "pass":sessionStorage.getItem('psw300'),
        "acesso":sessionStorage.getItem('acc300'),
       "Dados":jsonObject 
    })

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: urlapp,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : payload
};
axios(config)
   .then(resp => {
        alert('Configurações Salvas! \nAguarde, estamos aplicando  as novas configurações.')
        setTimeout(()=>{
        alert('Configurações aplicadas!')
        conf('conf')},5000)
        // Se quiser fazer mais alguma coisa com a resposta do servidor, pode fazer aqui
    })
    .catch(error => {
        alert('Falha ao Salvar Confugurações')
        console.error('Houve um problema ao enviar os dados:', error);
    });
}


// Rotas para os menus dos aplicativos =================================================================================================

const MyRequests=async(routeX)=>{
await route(routeX)
await getMyRequests()

}
const RMARequests=async(routeX)=>{
await route(routeX)
await getRMARequests()

}
const RMAFullRequests=async(routeX)=>{
await route(routeX)
await getRMAFullRequests()

}
const newPass = async(routeX)=>{
await route(routeX)
}

const  ContUser = async (routeX)=>{
await route(routeX)
sessionStorage.setItem('userConfsetType','Opc')
await loadContUser('Opc')
}

const  ContUserCostumerUser = async (routeX)=>{
await route(routeX)
sessionStorage.setItem('userConfsetType','cli')
await loadContUser('cli')
}

const  conf = async (routeX)=>{
await route(routeX)
await getConfigs()
}