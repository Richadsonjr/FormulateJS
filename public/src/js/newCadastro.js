const aceitTerm =(opc)=>{
  let opcao = opc
  var btn
 btn = document.getElementById('Cadastrar')
  switch (opcao) {
    case '0':
    btn.removeAttribute('onclick')
    btn.setAttribute('disabled','true')
    document.getElementById('termUse').setAttribute('onclick',`aceitTerm('1')`)    
  break;
  
    default:
      btn.setAttribute('onclick','SaveCad()')
      btn.removeAttribute('disabled')
      document.getElementById('termUse').setAttribute('onclick',`aceitTerm('0')`)
    
    break;
  }
  
  




}




const SaveCad = async()=>{
    const url = window.location.href
    var urlx = url.split('/')
    var urlA = `http://${urlx[2]}/api/CreateUser`

   
  var entrada = document.getElementById('cnpjInput').value
  var apenasNumeros = entrada.replace(/\D/g, '');
  var CNPJCl= apenasNumeros;


  let data = JSON.stringify({
  "nomeRazao": document.getElementById('nome').value,
  "cpfCnpj": CNPJCl,
  "email": document.getElementById('email').value,
  "telefone": document.getElementById('telefone').value,
  "celular": document.getElementById('telefone').value,
  "responsavel": document.getElementById('contato').value,
  "senha": document.getElementById('pass').value
});
console.log(data)
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: urlA,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  
  alert('Cadastro Realizado com suscesso!');
  window.location.href=`/`
})
.catch((error) => {
  alert('Usuário Já Cadastrado, Clique em Recuperar senha.')
  
  window.location.href=`/`
});

}





const RenewPass = async()=>{
    const url = window.location.href
    var urlx = url.split('/')
    var urlA = `http://${urlx[2]}/api/RecuperarSenha`

  let data = JSON.stringify({
  "CNPJ": document.getElementById('cnpjInput').value
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: urlA,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  alert(JSON.stringify(response.data.Msg));
  var gotoX =`http://${urlx[2]}`
  console.log(gotoX)
  window.location.href= gotoX
})
.catch((error) => {
  alert('Usuário não encontrado!')
  window.location.href=`/`
});

}