const produtos = {
    conjuntos: [
        {
            id: 'n1',
            nome: 'Sport',
            preco: 100.00,
            img: 'imgs/conj/n1.jpg',

        },
        {
            id: 'n2',
            nome: 'Festinha',
            preco: 90.00,
            img: 'imgs/conj/n2.jpg',
        
        },
        {
            id: 'n3',
            nome: 'Casual',
            preco: 87.00,
            img: 'imgs/conj/n3.jpg',
        
        }
    ]
};

function criarCard(produto) {
    const params = new URLSearchParams({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        img: produto.img,
    });

    const card = document.createElement('a');
    card.className = 'card';
    card.href = 'produto.html?' + params.toString();

    card.innerHTML = `
        <img src="${produto.img}" alt="${produto.nome}">
        <div class="card-info">
            <h3>${produto.nome}</h3>
            <div class="preco">
                R$ ${produto.preco.toFixed(2).replace('.', ',')}
            </div>
        </div>
    `;

    return card;
}

function renderizarCategoria(containerId, itens) {
    const container = document.getElementById(containerId);
    if (!container) return;

    itens.forEach(item => {
        container.appendChild(criarCard(item));
    });
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById('cart-count');
    if (contador && typeof CarrinhoStore !== 'undefined') {
        contador.textContent = CarrinhoStore.totalItens();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCategoria('lista-conjuntos', produtos.conjuntos);
    atualizarContadorCarrinho();
});