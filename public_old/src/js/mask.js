// mascara CPF ou cnpj
function formatarDocumento(documento) {
  // Remove caracteres não numéricos
  documento = documento.replace(/\D/g, '');
console.log(documento)
  // Verifica se é um CPF (11 dígitos) ou CNPJ (14 dígitos)
  if (documento.length === 11) {
    // Formata o CPF (999.999.999-99)
    documento = documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (documento.length === 14) {
    // Formata o CNPJ (99.999.999/9999-99)
    documento = documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  return documento;
}

// Exemplo de uso:
const inputDocumento = document.getElementById('cnpjInput'); // Substitua pelo seu elemento input
inputDocumento.addEventListener('input', function() {
  const valorDigitado = inputDocumento.value;
  const valorFormatado = formatarDocumento(valorDigitado);
  inputDocumento.value = valorFormatado;
});

// mascara telefone e Celular
function formatarTelefone(telefone) {
  // Remove caracteres não numéricos
  telefone = telefone.replace(/\D/g, '');

  // Verifica se o número tem 11 ou 10 dígitos (com ou sem DDD)
  if (telefone.length === 11) {
    // Formata o número com DDD (99) 99999-9999
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (telefone.length === 10) {
    // Formata o número com DDD (99) 9999-9999
    telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (telefone.length === 8) {
    // Formata o número sem DDD 9999-9999
    telefone = telefone.replace(/(\d{4})(\d{4})/, '$1-$2');
  }

  return telefone;
}

// Exemplo de uso:
const inputTelefone = document.getElementById('telefone'); // Substitua pelo seu elemento input
inputTelefone.addEventListener('input', function() {
  const valorDigitado = inputTelefone.value;
  const valorFormatado = formatarTelefone(valorDigitado);
  inputTelefone.value = valorFormatado;
});


const viewPass = (view, componente,btnId)=>{
        var element = document.getElementById(componente)
        var btnview = document.getElementById(btnId)
        console.log(view)
        switch (view) {
                case 1:
                   element.setAttribute('type','text')
                   btnview.setAttribute('onclick',`viewPass(0,'${element.id}','${btnview.id}')`)
                   btnview.innerHTML='<i class="fa-solid fa-eye-slash"></i>'
                break;
        
                case 0:
                   element.setAttribute('type','password')
                   btnview.setAttribute('onclick',`viewPass(1,'${element.id}','${btnview.id}')`)
                   btnview.innerHTML='<i class="fa-solid fa-eye"></i>'
                break;
    }

}