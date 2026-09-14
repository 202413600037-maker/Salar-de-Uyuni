async function carregarUsuario() {
    try {
        const response = await fetch('php/sessao.php');
        const dados = await response.json();

        if (!dados.logado) {
            window.location.href = 'index.html';
            return;
        }

        const usuarioNome = document.getElementById('usuario-nome');
        if (usuarioNome) {
            usuarioNome.textContent = 'Olá, ' + (dados.nome || dados.email).split(' ')[0] + ' 👋';
        }
    } catch (error) {
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', carregarUsuario);
