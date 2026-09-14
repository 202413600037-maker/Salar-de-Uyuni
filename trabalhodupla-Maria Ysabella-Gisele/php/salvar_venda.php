<?php
session_start();
require_once "conexao.php";
extract($_POST);

if (!isset($_SESSION['usuario_cpf'])) {
    echo "Erro: Usuário não autenticado";
    exit;
}

if (empty($itens) || $total == "" || $pagamento == "") {
    echo "Erro: Dados inválidos";
    exit;
}

$conn = conectar();
$cpf = $conn->real_escape_string($_SESSION['usuario_cpf']);

// Limpa o valor total (remove R$, pontos etc.)
$total_limpo = preg_replace('/[^0-9,.]/', '', $total);
$total_limpo = str_replace(',', '.', $total_limpo);
$total_limpo = floatval($total_limpo);

$frete = 0.00; // pode ser calculado depois

// 1. Cria o pedido
$conn->query("INSERT INTO pedido (frete, valor) VALUES ($frete, $total_limpo)");
$idpedido = $conn->insert_id;

// 2. Processa os itens
$lista_itens = json_decode($itens, true);

if (is_array($lista_itens)) {
    foreach ($lista_itens as $item) {
        $id_produto = $conn->real_escape_string($item['id']);
        $qtd        = (int)$item['quantidade'];
        $preco      = floatval($item['preco']);

        // Relaciona produto com pedido
        $conn->query("INSERT INTO produto_pedido (id_produto, idpedido, quantidade, preco_unit) 
                      VALUES ('$id_produto', $idpedido, $qtd, $preco)");

        // Também registra que o cliente escolheu o produto (carrinho/histórico)
        $conn->query("INSERT INTO cliente_produto (cpf, id_produto, quantidade) 
                      VALUES ('$cpf', '$id_produto', $qtd)
                      ON DUPLICATE KEY UPDATE quantidade = quantidade + $qtd");
    }
}

$conn->close();
echo "Sucesso! Pedido finalizado com o número: " . $idpedido;
?>
