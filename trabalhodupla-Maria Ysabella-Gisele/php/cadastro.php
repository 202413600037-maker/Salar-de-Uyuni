<?php
session_start();
require_once "conexao.php";
extract($_POST);

// Etapa 1 - Dados pessoais + endereço
if (isset($salvar1)) {
    $_SESSION['nome']     = $nome_completo;
    $_SESSION['cpf']      = $cpf;
    $_SESSION['cep']      = $cep;
    $_SESSION['rua']      = $endereco;   // no formulário o campo se chama endereco
    $_SESSION['bairro']   = $bairro;
    $_SESSION['cidade']   = $cidade;
    $_SESSION['estado']   = $estado;

    header('Location: ../cadastro2.html');
    exit;
}

// Etapa 2 - Email e senha (cria cliente + login + endereco + relacionamentos)
if (isset($salvar2)) {
    if ($email == "" || $senha == "") {
        header('Location: ../cadastro2.html?erro=1');
        exit;
    }

    $conn = conectar();

    $email_limpo = $conn->real_escape_string($email);
    $cpf         = $conn->real_escape_string($_SESSION['cpf']);
    $nome        = $conn->real_escape_string($_SESSION['nome']);
    $cep         = $conn->real_escape_string($_SESSION['cep']);
    $rua         = $conn->real_escape_string($_SESSION['rua']);
    $bairro      = $conn->real_escape_string($_SESSION['bairro']);
    $cidade      = $conn->real_escape_string($_SESSION['cidade']);
    $estado      = $conn->real_escape_string($_SESSION['estado']);
    $hash        = md5($senha);

    // Verifica se email já existe
    $check = $conn->query("SELECT email FROM login WHERE email = '$email_limpo'");
    if ($check->num_rows > 0) {
        $conn->close();
        header('Location: ../cadastro2.html?erro=2');
        exit;
    }

    // 1. Insere endereço
    $conn->query("INSERT IGNORE INTO endereco (cep, estado, cidade, bairro, rua) 
                  VALUES ('$cep', '$estado', '$cidade', '$bairro', '$rua')");

    // 2. Insere cliente
    $conn->query("INSERT IGNORE INTO cliente (cpf, nome) 
                  VALUES ('$cpf', '$nome')");

    // 3. Insere login
    $conn->query("INSERT INTO login (email, senha) 
                  VALUES ('$email_limpo', '$hash')");

    // 4. Relacionamentos
    $conn->query("INSERT IGNORE INTO cliente_endereco (cpf, cep) VALUES ('$cpf', '$cep')");
    $conn->query("INSERT INTO cliente_login (cpf, email) VALUES ('$cpf', '$email_limpo')");

    $conn->close();
    session_destroy();
    header('Location: ../login.html?cadastro=1');
    exit;
}
?>
