<?php
require_once "conexao.php";
extract($_POST);
if (!isset($_SESSION)) session_start();

if (isset($b1)) {
    // Exemplo de cadastro rápido
    $conn = conectar();
    $email_limpo = $conn->real_escape_string($email);
    $pass = md5($senha);
    $check = $conn->query("SELECT email FROM login WHERE email = '$email_limpo'");
    if ($check->num_rows > 0) {
        echo "O usuario já existe.<br/>";
    } else {
        $conn->query("INSERT INTO login (email, senha) VALUES ('$email_limpo', '$pass')");
        echo "Login criado!";
    }
    $conn->close();
    echo "<a href='../login.html'>voltar</a>";
}

if (isset($b2)) {
    header('Location: login.php');
}

if (isset($b4)) {
    header('Location: logout.php');
}
?>
