var params = new URLSearchParams(window.location.search);
 
var id    = params.get('id')    || 'l1';
var nome  = params.get('nome')  || 'sport';
var preco = parseFloat(params.get('preco')) || 100.00;
var img   = params.get('img')   || 'imgs/conj/n1.jpg';
var desc  = params.get('desc')  || 'conjuntos';
 
// preenche a página
document.getElementById('prod-img').src         = img;
document.getElementById('prod-img').alt         = nome;
document.getElementById('prod-nome').textContent = nome;
document.getElementById('prod-desc').textContent = desc;
document.getElementById('prod-preco').textContent = 'R$ ' + preco.toFixed(2).replace('.', ',');
 
var parcela = (preco / 5).toFixed(2).replace('.', ',');
document.getElementById('prod-parcelado').textContent = 'ou 5x de R$ ' + parcela + ' sem juros';
 
document.title = nome + ' - Salar de Uyuni';
 

document.getElementById('btn-qtd-menos').addEventListener('click', function() {
    var input = document.getElementById('qtd');
    var qtd = parseInt(input.value);
    if (qtd > 1) {
        input.value = qtd - 1;
    }
});
 

document.getElementById('btn-qtd-mais').addEventListener('click', function() {
    var input = document.getElementById('qtd');
    var qtd = parseInt(input.value);
    if (qtd < 99) {
        input.value = qtd + 1;
    }
});
 

document.getElementById('btn-adicionar').addEventListener('click', function() {
    var qtd = parseInt(document.getElementById('qtd').value);
 
    CarrinhoStore.adicionar({ id: id, nome: nome, preco: preco, img: img, desc: desc, qtd: qtd });
 
    document.getElementById('cart-count').textContent = CarrinhoStore.totalItens();
 
    var toast = document.getElementById('toast');
    toast.textContent = nome + ' adicionado ao carrinho!';
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 2500);
});
 

document.getElementById('btn-comprar').addEventListener('click', function() {
    document.getElementById('btn-adicionar').click();
    window.location.href = 'carrinho.html';
});