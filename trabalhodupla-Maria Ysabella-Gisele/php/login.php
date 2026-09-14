<?php
session_start();
require_once "conexao.php";
extract($_POST);

if (isset($acessar)) {
    if ($email == "" || $senha == "") {
        header('Location: ../login.html?erro=1');
        exit;
    }

    $conn = conectar();
    $email_limpo = $conn->real_escape_string($email);
    $hash = md5($senha);

    // Busca login + dados do cliente
    $sql = "SELECT l.email, c.cpf, c.nome 
            FROM login l
            JOIN cliente_login cl ON l.email = cl.email
            JOIN cliente c ON cl.cpf = c.cpf
            WHERE l.email = '$email_limpo' AND l.senha = '$hash'";

    $resultado = $conn->query($sql);

    if ($resultado->num_rows == 0) {
        $conn->close();
        header('Location: ../login.html?erro=1');
        exit;
    }

    $usuario = $resultado->fetch_assoc();
    $conn->close();

    $_SESSION['usuario_email'] = $usuario['email'];
    $_SESSION['usuario_cpf']   = $usuario['cpf'];
    $_SESSION['usuario_nome']  = $usuario['nome'];

    if (isset($returnUrl) && ($returnUrl == "confirmar.html" || $returnUrl == "main.html")) {
        header("Location: ../" . $returnUrl);
    } else {
        header('Location: ../index.html');
    }
    exit;
}
?>
