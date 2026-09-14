-- =====================================================
-- BANCO DE DADOS - SALAR DE UYUNI
-- Trabalho de Dupla: Gisele + Maria Ysabella
-- Modelo de como deve ficar o banco de dados
-- Pronto para executar no MySQL Workbench
-- =====================================================

CREATE DATABASE IF NOT EXISTS salar_uyuni
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE salar_uyuni;

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Tabela: usuarios
-- -----------------------------------------------------
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id_usuario      INT NOT NULL AUTO_INCREMENT,
    nome_completo   VARCHAR(150) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    senha_hash      VARCHAR(64)  NOT NULL,          -- MD5 (como estava no projeto original)
    cpf             VARCHAR(14),
    cep             VARCHAR(10),
    endereco        VARCHAR(200),
    bairro          VARCHAR(100),
    cidade          VARCHAR(100),
    estado          CHAR(2),
    data_cadastro   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: produtos
-- -----------------------------------------------------
DROP TABLE IF EXISTS produtos;
CREATE TABLE produtos (
    id_produto      VARCHAR(10) NOT NULL,
    nome            VARCHAR(100) NOT NULL,
    preco           DECIMAL(10,2) NOT NULL,
    imagem          VARCHAR(255),
    descricao       TEXT,
    estoque         INT DEFAULT 10,
    ativo           TINYINT(1) DEFAULT 1,
    PRIMARY KEY (id_produto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: carrinho (itens temporarios do usuario)
-- -----------------------------------------------------
DROP TABLE IF EXISTS carrinho;
CREATE TABLE carrinho (
    id_carrinho     INT NOT NULL AUTO_INCREMENT,
    id_usuario      INT NOT NULL,
    id_produto      VARCHAR(10) NOT NULL,
    quantidade      INT NOT NULL DEFAULT 1,
    data_adicionado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_carrinho),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: vendas
-- -----------------------------------------------------
DROP TABLE IF EXISTS vendas;
CREATE TABLE vendas (
    id_venda        INT NOT NULL AUTO_INCREMENT,
    id_usuario      INT NOT NULL,
    total           DECIMAL(10,2) NOT NULL,
    forma_pagamento VARCHAR(50) DEFAULT 'PIX',
    status_venda    VARCHAR(30) DEFAULT 'confirmada',
    data_venda      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_venda),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: itens_venda
-- -----------------------------------------------------
DROP TABLE IF EXISTS itens_venda;
CREATE TABLE itens_venda (
    id_item         INT NOT NULL AUTO_INCREMENT,
    id_venda        INT NOT NULL,
    id_produto      VARCHAR(10) NOT NULL,
    quantidade      INT NOT NULL,
    preco_unitario  DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_item),
    FOREIGN KEY (id_venda) REFERENCES vendas(id_venda),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- INSERÇÃO DOS DADOS EXTRAÍDOS DO PROJETO ORIGINAL
-- =====================================================

-- Usuario que estava nos arquivos .dat
INSERT INTO usuarios (nome_completo, email, senha_hash, cpf, cep, endereco, bairro, cidade, estado) VALUES
('gisele', 'giselemiranda762@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '123.456.789-10', '12345-67', 'fulano', 'centro', 'eunapolis', 'BA');

-- Produtos do site
INSERT INTO produtos (id_produto, nome, preco, imagem, descricao, estoque) VALUES
('n1', 'Sport',    100.00, 'imgs/conj/n1.jpg', 'Conjunto Sport', 15),
('n2', 'Festinha',  90.00, 'imgs/conj/n2.jpg', 'Conjunto Festinha', 12),
('n3', 'Casual',    87.00, 'imgs/conj/n3.jpg', 'Conjunto Casual', 20);

-- =====================================================
-- CONSULTAS DE TESTE (rode depois de importar)
-- =====================================================
-- SELECT * FROM usuarios;
-- SELECT * FROM produtos;
-- SELECT u.nome_completo, u.email, p.nome AS produto, p.preco
-- FROM usuarios u, produtos p;

