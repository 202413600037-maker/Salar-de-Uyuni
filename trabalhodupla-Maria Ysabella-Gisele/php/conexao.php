<?php
// Conexão com o banco de dados MySQL
// Modelo Conceitual: endereco, cliente, login, produto, pedido

function conectar() {
    $server   = "127.0.0.1";
    $user     = "root";
    $password = "MySQL8.0"; // A nova senha redefinida
    $db       = "salar_uyuni"; // Nome do banco com espaço

    $conexao = new mysqli($server, $user, $password, $db);

    if ($conexao->connect_error) {
        die("Falha na conexão: (" . $conexao->connect_errno . ") " . $conexao->connect_error);
    }

    $conexao->set_charset("utf8mb4");
    return $conexao;
}


function banco($consulta) {
    $conexao = conectar();

    if (!$resultado = $conexao->query($consulta)) {
        echo "Erro na consulta: (" . $conexao->errno . ") " . $conexao->error;
        $conexao->close();
        exit;
    }

    $conexao->close();
    return $resultado;
}
?>