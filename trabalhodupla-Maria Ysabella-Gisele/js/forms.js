document.getElementById('cpf').addEventListener('input', function () {
    var valor = this.value;
    valor = valor.replace(/\D/g, '');
    if (valor.length > 3) {
        valor = valor.substring(0, 3) + '.' + valor.substring(3);
    }
    if (valor.length > 7) {
        valor = valor.substring(0, 7) + '.' + valor.substring(7);
    }
    if (valor.length > 11) {
        valor = valor.substring(0, 11) + '-' + valor.substring(11);
    }

    this.value = valor;
});


document.getElementById('cep').addEventListener('input', function () {
    var valor = this.value;


    valor = valor.replace(/\D/g, '');


    if (valor.length > 5) {
        valor = valor.substring(0, 5) + '-' + valor.substring(5);
    }

    this.value = valor;
});



function mostrarOcultarSenha() {
    var campoDeSenha = document.getElementById('senha');
    var botao = event.target; 


    if (campoDeSenha.type == 'password') {
        campoDeSenha.type = 'text';    
        botao.textContent = 'Ocultar senha';
    } else {
        campoDeSenha.type = 'password'; 
        botao.textContent = 'Mostrar senha';
    }
}


function buscarCEP() {
    var campoCEP = document.getElementById('cep');

   
    var cep = campoCEP.value.replace(/\D/g, '');


    if (cep.length != 8) {
        alert('Digite um CEP com 8 números!');
        return;
    }

    fetch('https://viacep.com.br/ws/' + cep + '/json/')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            // se o CEP não existir, a API retorna { erro: true }
            if (dados.erro) {
                alert('CEP não encontrado!');
                return;
            }

            // preenche os campos com os dados que vieram da API
            document.getElementById('endereco').value = dados.logradouro;
            document.getElementById('bairro').value = dados.bairro;
            document.getElementById('cidade').value = dados.localidade;
            document.getElementById('estado').value = dados.uf;
        })
        .catch(function () {
            alert('Erro ao buscar o CEP. Verifique sua conexão e tente de novo.');
        });
}



function enviarFormulario() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var cpf = document.getElementById('cpf').value;
    var senha = document.getElementById('senha').value;
    var cep = document.getElementById('cep').value;
    var endereco = document.getElementById('endereco').value;

    var mensagem = document.getElementById('mensagem');

   
    if (nome == '' || email == '' || cpf == '' || senha == '' || cep == '' || endereco == '') {
        mensagem.textContent = 'Preencha todos os campos!';
        mensagem.className = 'mensagem erro';
        return;
    }

    
    mensagem.textContent = 'Cadastro realizado com sucesso!';
    mensagem.className = 'mensagem';
}
