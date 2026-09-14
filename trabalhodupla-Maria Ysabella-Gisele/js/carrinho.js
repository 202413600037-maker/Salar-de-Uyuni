function renderCarrinho() {
    const itens = CarrinhoStore.listar();
    const el = document.getElementById('carrinho-content');
    const contador = document.getElementById('cart-count');

    if (contador) {
        contador.textContent = CarrinhoStore.totalItens();
    }

    if (!el) {
        return;
    }

    if (itens.length === 0) {
        el.innerHTML = `
            <div class="vazio">
                <i class="ri-shopping-cart-2-line"></i>
                <p>Seu carrinho está vazio.</p>
                <a href="index.html">Continuar comprando</a>
            </div>`;
        return;
    }

    const subtotal = itens.reduce((s, i) => s + i.preco * i.qtd, 0);
    const frete = subtotal >= 150 ? 0 : 15;
    const totalGeral = subtotal + frete;

    el.innerHTML = `
        <div class="itens">
            ${itens.map(item => `
            <div class="item-card">
                <img src="${item.img}" alt="${item.nome}">
                <div class="item-info">
                    <h3>${item.nome}</h3>
                    <div class="item-preco">R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="item-qtd">
                    <button onclick="mudarQtd('${item.id}', -1)">−</button>
                    <span>${item.qtd}</span>
                    <button onclick="mudarQtd('${item.id}', 1)">+</button>
                </div>
                <button class="item-remover" onclick="remover('${item.id}')" title="Remover">
                    <i class="ri-delete-bin-2-line"></i>
                </button>
            </div>`).join('')}
        </div>

        <div class="resumo">
            <h2>Resumo do Pedido</h2>
            <div class="resumo-linha"><span>Subtotal</span><span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span></div>
            <div class="resumo-linha"><span>Frete</span><span>${frete === 0 ? 'Grátis' : 'R$ ' + frete.toFixed(2).replace('.', ',')}</span></div>
            ${frete > 0 ? `<div class="resumo-linha aviso-frete"><span>Falta R$ ${(150 - subtotal).toFixed(2).replace('.', ',')} para frete grátis</span></div>` : ''}
            <div class="resumo-total"><span>Total</span><span>R$ ${totalGeral.toFixed(2).replace('.', ',')}</span></div>
            <button class="btn-finalizar" onclick="finalizar()">
                <i class="ri-secure-payment-line"></i> Finalizar Compra
            </button>
            <button class="btn-limpar" onclick="limpar()">Limpar carrinho</button>
        </div>`;
}

function mudarQtd(id, delta) {
    CarrinhoStore.alterarQtd(id, delta);
    renderCarrinho();
}

function remover(id) {
    CarrinhoStore.remover(id);
    renderCarrinho();
}

function limpar() {
    if (confirm('Limpar todos os itens do carrinho?')) {
        CarrinhoStore.limpar();
        renderCarrinho();
    }
}

function finalizar() {
    window.location.href = 'confirmar.html';
}

renderCarrinho();
