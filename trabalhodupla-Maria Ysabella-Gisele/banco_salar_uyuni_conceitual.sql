-- =====================================================
-- BANCO DE DADOS - SALAR DE UYUNI
-- Baseado no Modelo Conceitual enviado
-- Trabalho de Dupla: Gisele + Maria Ysabella
-- Pronto para MySQL Workbench
-- =====================================================

CREATE DATABASE IF NOT EXISTS salar_uyuni
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE salar_uyuni;

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Tabela: endereco
-- -----------------------------------------------------
DROP TABLE IF EXISTS endereco;
CREATE TABLE endereco (
    cep         VARCHAR(10)  NOT NULL,
    estado      CHAR(2)      NOT NULL,
    cidade      VARCHAR(100) NOT NULL,
    bairro      VARCHAR(100) NOT NULL,
    rua         VARCHAR(200) NOT NULL,
    PRIMARY KEY (cep)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: cliente
-- -----------------------------------------------------
DROP TABLE IF EXISTS cliente;
CREATE TABLE cliente (
    cpf         VARCHAR(14)  NOT NULL,
    nome        VARCHAR(150) NOT NULL,
    PRIMARY KEY (cpf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: login
-- -----------------------------------------------------
DROP TABLE IF EXISTS login;
CREATE TABLE login (
    email       VARCHAR(150) NOT NULL,
    senha       VARCHAR(64)  NOT NULL,          -- hash MD5
    PRIMARY KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: produto
-- -----------------------------------------------------
DROP TABLE IF EXISTS produto;
CREATE TABLE produto (
    id_produto  VARCHAR(10)  NOT NULL,
    nome        VARCHAR(100) NOT NULL,
    preco       DECIMAL(10,2) NOT NULL,
    frete       DECIMAL(10,2) DEFAULT 0.00,
    imagem      VARCHAR(255),
    PRIMARY KEY (id_produto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: pedido
-- -----------------------------------------------------
DROP TABLE IF EXISTS pedido;
CREATE TABLE pedido (
    idpedido    INT          NOT NULL AUTO_INCREMENT,
    frete       DECIMAL(10,2) DEFAULT 0.00,
    valor       DECIMAL(10,2) NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idpedido)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabelas de relacionamento (N:N)
-- -----------------------------------------------------

-- cliente possui endereco (0,n) - (0,n)
DROP TABLE IF EXISTS cliente_endereco;
CREATE TABLE cliente_endereco (
    cpf         VARCHAR(14) NOT NULL,
    cep         VARCHAR(10) NOT NULL,
    PRIMARY KEY (cpf, cep),
    FOREIGN KEY (cpf) REFERENCES cliente(cpf),
    FOREIGN KEY (cep) REFERENCES endereco(cep)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- cliente possui login (0,n) - (0,n)
DROP TABLE IF EXISTS cliente_login;
CREATE TABLE cliente_login (
    cpf         VARCHAR(14)  NOT NULL,
    email       VARCHAR(150) NOT NULL,
    PRIMARY KEY (cpf, email),
    FOREIGN KEY (cpf) REFERENCES cliente(cpf),
    FOREIGN KEY (email) REFERENCES login(email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- cliente escolhe produto (0,n) - (0,n)  →  carrinho / interesse
DROP TABLE IF EXISTS cliente_produto;
CREATE TABLE cliente_produto (
    cpf         VARCHAR(14) NOT NULL,
    id_produto  VARCHAR(10) NOT NULL,
    quantidade  INT DEFAULT 1,
    PRIMARY KEY (cpf, id_produto),
    FOREIGN KEY (cpf) REFERENCES cliente(cpf),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- produto recebe pedido (0,n) - (0,n)
DROP TABLE IF EXISTS produto_pedido;
CREATE TABLE produto_pedido (
    id_produto  VARCHAR(10) NOT NULL,
    idpedido    INT         NOT NULL,
    quantidade  INT DEFAULT 1,
    preco_unit  DECIMAL(10,2),
    PRIMARY KEY (id_produto, idpedido),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    FOREIGN KEY (idpedido) REFERENCES pedido(idpedido)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- DADOS INICIAIS (extraídos do projeto original)
-- =====================================================

-- Endereço
INSERT INTO endereco (cep, estado, cidade, bairro, rua) VALUES
('12345-67', 'BA', 'eunapolis', 'centro', 'fulano');

-- Cliente
INSERT INTO cliente (cpf, nome) VALUES
('123.456.789-10', 'gisele');

-- Login (senha original: 123456 → MD5)
INSERT INTO login (email, senha) VALUES
('giselemiranda762@gmail.com', 'e10adc3949ba59abbe56e057f20f883e');

-- Relacionamento cliente ↔ endereco
INSERT INTO cliente_endereco (cpf, cep) VALUES
('123.456.789-10', '12345-67');

-- Relacionamento cliente ↔ login
INSERT INTO cliente_login (cpf, email) VALUES
('123.456.789-10', 'giselemiranda762@gmail.com');

-- Produtos
INSERT INTO produto (id_produto, nome, preco, frete, imagem) VALUES
('n1', 'Sport',    100.00, 15.00, 'imgs/conj/n1.jpg'),
('n2', 'Festinha',  90.00, 12.00, 'imgs/conj/n2.jpg'),
('n3', 'Casual',    87.00, 10.00, 'imgs/conj/n3.jpg');

-- =====================================================
-- CONSULTAS DE TESTE
-- =====================================================
-- SELECT * FROM cliente;
-- SELECT * FROM endereco;
-- SELECT * FROM login;
-- SELECT * FROM produto;
-- 
-- SELECT c.nome, e.cidade, e.bairro, l.email
-- FROM cliente c
-- JOIN cliente_endereco ce ON c.cpf = ce.cpf
-- JOIN endereco e ON ce.cep = e.cep
-- JOIN cliente_login cl ON c.cpf = cl.cpf
-- JOIN login l ON cl.email = l.email;

