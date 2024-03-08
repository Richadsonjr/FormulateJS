const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

// 15 dias 
const previousDate = new Date(currentDate); // copia a data atual para um novo objeto
previousDate.setDate(currentDate.getDate() - 15); // define a data para 15 dias atrás
const month15 = String(previousDate.getMonth() + 1).padStart(2, '0');
const formattedDate15 = `${previousDate.getFullYear()}-${month15}-${previousDate.getDate()}`;

var inicio= formattedDate15

var fim= formattedDate
const getOrdersOCC=async ()=>{


await axios('http://172.21.163.152:3324/getOrdersOcc/')
.then(resp=>{
    let row = resp.data
    let pathX=[]
    for (let i = 0; i < row.length; i++) {
        let element = row[i].id;
        pathX.push(element)
    }

        
ProcessData(pathX)

})
.catch(e=>{console.log(e)})
.finally(f=>{console.log('End')

loadErrorsAPICAssio()

})



}

const loadPage=(page,title)=>{
    let titleX= document.getElementById('titulo')
    titleX.innerHMTL=''
    titleX.innerHMTL=title
    let spTitle= document.getElementById('spTitulo')
        spTitle.innerText=title
    route(page)

    
}

const ProcessData =async(data)=>{
    let Datax= data
    var holder = document.getElementById('PedidosOCC')
    holder.innerHTML=''
    let vx=0
    for (let i = 0; i < Datax.length; i++) {
        let element = Datax[i];
        let valueCalc= await axios('http://172.21.163.152:3324/verificProd/'+element).then(resp=>{return resp;}).catch(e=>{console.log(e)})
        
        let countX= await valueCalc.data[0].total
        switch (countX) {
            case 0:
            printItemOCC(element) 
            vx++
            break;
        
            default:
                console.log('Order '+element+' Já cadastrada')
            break;
        }
        
    }

    if (vx==0) {
        printItemOCC('Não há pedidos parados no OCC.')
        
    }


}


const loadErrorsAPICAssio= async ()=>{
    var holder = await document.getElementById('requestsapiPort')
    holder.innerHTML=''
    let url = 'http://172.21.163.152:3324/checkFails/'
    axios(url)
    .then(resp=>{
       let dataX= resp.data.results
       let status= resp.status
       let orders=[]
        switch (status) {
            case 200:
              for (let i = 0; i < dataX.length; i++) {
                let element = dataX[i].descricao;
                let meuArray = element.split(" | ");


                orders.push(meuArray[0])
                console.log('uhuuu')

              }
              let novoArr = orders.filter((item, index) => orders.indexOf(item) === index);
              for (let j = 0; j < novoArr.length; j++) {

                printErrorClientes(novoArr[j])
              }





            break;
        
            default:
            
            printErrorClientes('Não Há Erros a serem exibidos.')
            console.log(dataX)
            break;
        }



    })
    .catch(e=>{
console.log(e)
    })
}


const printErrorClientes=(item)=>{
    // cria elementos
        var holder = document.getElementById('requestsapiPort')
        var row = document.createElement('div')
        var order = document.createElement('h6')
    // caracteristicas
        holder.setAttribute('class','holderRow')
        row.setAttribute('class','rowItem')
        order.innerText=item
        row.appendChild(order)
        holder.appendChild(row)
}


const printItemOCC=(item)=>{
// cria elementos
    var holder = document.getElementById('PedidosOCC')
    var row = document.createElement('div')
    var order = document.createElement('h3')
// caracteristicas
    holder.setAttribute('class','holderRow')
    row.setAttribute('class','rowItem')
    order.innerText=item
    row.appendChild(order)
    holder.appendChild(row)
}


getOrdersOCC()


const routeX=(pathY)=>{
    let loadpage =pathY
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







startFunctionGet=async()=>{
    var urlp= document.getElementById('pointer').value
    try{
        let data = JSON.stringify({
            "url": urlp
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://172.21.163.152:3324/startGet',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
    let busca= await axios(config).then(res=>{return res.data}).catch(e=>{document.getElementById('msg').value='Falha ao Executar Comando!'})
    document.getElementById('msg').innerText=busca

    }
    catch{
        document.getElementById('msg').innerText='Falha ao Executar Comando!'
    }




}



startFunctionPost =async()=>{
    var urlp= document.getElementById('pointer').value
    try{
        let data = JSON.stringify({
            "url": urlp,
            "prods":document.getElementById('produtos').value
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://172.21.163.152:3324/startPostStock',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
    let busca= await axios(config).then(res=>{return res.data}).catch(e=>{document.getElementById('msg').value='Falha ao Executar Comando!'})
    console.log(busca)
    document.getElementById('msg').innerText=busca




    }
    catch{
        document.getElementById('msg').innerText='Falha ao Executar Comando!'
    }




}