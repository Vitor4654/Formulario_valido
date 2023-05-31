function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split('=');
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
}
  
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}
  
function validateForm(event) {
    event.preventDefault();
  
    try {
      const nomeInput = document.getElementById('nome');
      const idInput = document.getElementById('id');
      const tipoClienteInput = document.getElementById('tipoCliente');
      const enderecoInput = document.getElementById('endereco');
      const cepInput = document.getElementById('cep');
      const dataNascimentoInput = document.getElementById('dataNascimento');
      const vendedorInput = document.getElementById('vendedor');
      const limiteCreditoInput = document.getElementById('limiteCredito');
  
      const nome = nomeInput.value;
      const id = idInput.value;
      const tipoCliente = tipoClienteInput.value;
      const endereco = enderecoInput.value;
      const cep = cepInput.value;
      const dataNascimento = dataNascimentoInput.value;
      const vendedor = vendedorInput.value;
      const limiteCredito = limiteCreditoInput.value;
  
      if (/\d/.test(nome) || /\d/.test(vendedor)) {
        throw 'O campo Nome e Vendedor não podem conter números.';
      }
  
      if (/\D/.test(id) || /\D/.test(cep) || /\D/.test(limiteCredito)) {
        throw 'Os campos Id, CEP devem conter apenas números.';
      }
  
      if (
        !nome ||
        !id ||
        !tipoCliente ||
        !endereco ||
        !cep ||
        !dataNascimento ||
        !vendedor ||
        !limiteCredito
      ) {
        throw 'Todos os campos são obrigatórios';
      }
  
      setCookie('nome', nome, 365);
      setCookie('id', id, 365);
  
      document.getElementById('successMessage').textContent = 'Cadastro realizado com sucesso!';
      document.getElementById('errorMessage').textContent = '';
      document.getElementById('cadastroForm').reset(); // Reseta o formulário
    } catch (error) {
      document.getElementById('errorMessage').textContent = error;
      document.getElementById('successMessage').textContent = '';
    }
}
  
const nomeCookie = getCookie('nome');
const idCookie = getCookie('id');
  
if (nomeCookie !== null) {
    document.getElementById('nome').value = nomeCookie;
}
  
if (idCookie !== null) {
    document.getElementById('id').value = idCookie;
}
  
document.getElementById('cadastroForm').addEventListener('submit', validateForm);
  