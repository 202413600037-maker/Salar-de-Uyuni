<?php
require_once "conexao.php";

$email = "giselemiranda762@gmail.com";
$senha = "123456";
$hash = md5($senha);

banco("UPDATE login SET senha = '$hash' WHERE email = '$email'");
echo "Senha atualizada com sucesso para: $email<br>";
echo "Novo hash: $hash";
?>
