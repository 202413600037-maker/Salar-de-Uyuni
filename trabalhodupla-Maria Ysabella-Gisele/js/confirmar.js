function formatarReal(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function calcularSubtotal(itens) {
    var subtotal = 0;
    for (var i = 0; i < itens.length; i++) {
        subtotal = subtotal + (itens[i].preco * itens[i].qtd);
    }
    return subtotal;
}

function montarItens(itens) {
    var html = '';

    for (var i = 0; i < itens.length; i++) {
        var item = itens[i];
        var totalItem = item.preco * item.qtd;

        html += '<div class="item-resumo">';
        html += '<img src="' + item.img + '" alt="' + item.nome + '">';
        html += '<div>';
        html += '<p><strong>' + item.nome + '</strong></p>';
        html += '<p>Qtd: ' + item.qtd + ' × ' + formatarReal(item.preco) + '</p>';
        html += '</div>';
        html += '<p class="item-subtotal">' + formatarReal(totalItem) + '</p>';
        html += '</div>';
    }

    var subtotal = calcularSubtotal(itens);
    var frete = 15;
    if (subtotal >= 150) {
        frete = 0;
    }

    var freteTexto = formatarReal(frete);
    if (frete == 0) {
        freteTexto = 'Grátis';
    }

    html += '<div class="item-resumo frete">';
    html += '<span>Frete</span>';
    html += '<span>' + freteTexto + '</span>';
    html += '</div>';

    return html;
}

function carregarConfirmacao() {
    var itens = CarrinhoStore.listar();

    if (itens.length == 0) {
        window.location.href = 'index.html';
        return;
    }

    fetch('php/sessao.php')
        .then(function(response) {
            return response.json();
        })
        .then(function(dados) {
            if (!dados.logado) {
                window.location.href = 'login.html?returnUrl=confirmar.html';
                return;
            }

            var dadosUsuario = document.getElementById('dados-usuario');
            if (dadosUsuario != null) {
                dadosUsuario.innerHTML = '<p><strong>Nome:</strong> ' + (dados.nome || 'Não informado') + '</p>' +
                                         '<p><strong>E-mail:</strong> ' + dados.email + '</p>';
            }

            var itensPedido = document.getElementById('itens-pedido');
            if (itensPedido != null) {
                itensPedido.innerHTML = montarItens(itens);
            }

            var subtotal = calcularSubtotal(itens);
            var frete = 15;
            if (subtotal >= 150) {
                frete = 0;
            }

            var totalPedido = document.getElementById('total-pedido');
            if (totalPedido != null) {
                totalPedido.textContent = formatarReal(subtotal + frete);
            }
        })
        .catch(function() {
            window.location.href = 'login.html';
        });
}

function confirmarCompra() {
    var itens = CarrinhoStore.listar();

    if (itens.length == 0) {
        alert('Carrinho vazio.');
        return;
    }

    var subtotal = calcularSubtotal(itens);
    var frete = 15;
    if (subtotal >= 150) {
        frete = 0;
    }

    var listaItens = [];
    for (var i = 0; i < itens.length; i++) {
        listaItens.push({
            nome:       itens[i].nome,
            quantidade: itens[i].qtd,
            preco:      itens[i].preco,
            subtotal:   itens[i].preco * itens[i].qtd
        });
    }

    var dadosVenda = {
        itens:     listaItens,
        total:     subtotal + frete,
        pagamento: 'pix'
    };

    fetch('php/salvar_venda.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosVenda)
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(resultado) {
        if (!resultado.sucesso) {
            alert('Erro ao registrar venda: ' + (resultado.erro || 'Erro desconhecido'));
            return;
        }

        CarrinhoStore.limpar();
        document.getElementById('numero-venda').textContent = resultado.numero_venda;
        document.getElementById('modal-sucesso').classList.remove('hidden');
    })
    .catch(function() {
        alert('Erro de conexão. Tente novamente.');
    });
}

var btnConfirmar = document.getElementById('btn-confirmar');
if (btnConfirmar != null) {
    btnConfirmar.addEventListener('click', confirmarCompra);
}

carregarConfirmacao();