var CarrinhoStore = {

    listar: function() {
        var salvo = localStorage.getItem('carrinho');
        if (salvo == null) {
            return [];
        }
        return JSON.parse(salvo);
    },


    salvar: function(lista) {
        localStorage.setItem('carrinho', JSON.stringify(lista));
    },

    
    adicionar: function(item) {
        var lista = this.listar();
        var achou = false;

        for (var i = 0; i < lista.length; i++) {
            if (lista[i].id === item.id) {
                lista[i].qtd = lista[i].qtd + item.qtd;
                achou = true;
            }
        }

        if (achou === false) {
            lista.push(item);
        }

        this.salvar(lista);
    },

    
    remover: function(id) {
        var lista = this.listar();
        var listaNova = [];

        for (var i = 0; i < lista.length; i++) {
            if (lista[i].id !== id) {
                listaNova.push(lista[i]);
            }
        }

        this.salvar(listaNova);
    },


    alterarQtd: function(id, delta) {
        var lista = this.listar();

        for (var i = 0; i < lista.length; i++) {
            if (lista[i].id === id) {
                lista[i].qtd = lista[i].qtd + delta;
                if (lista[i].qtd < 1) {
                    lista[i].qtd = 1;
                }
            }
        }

        this.salvar(lista);
    },


    totalItens: function() {
        var lista = this.listar();
        var total = 0;

        for (var i = 0; i < lista.length; i++) {
            total = total + lista[i].qtd;
        }

        return total;
    },


    limpar: function() {
        localStorage.removeItem('carrinho');
    }
};