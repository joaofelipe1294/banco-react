CREATE TABLE IF NOT EXISTS clientes (
    cliente_id INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL ,
    sobrenome VARCHAR(255) NOT NULL,
    rg VARCHAR(30) NOT NULL UNIQUE,
    cpf VARCHAR(30) NOT NULL UNIQUE,
    salario DECIMAL (10,2) NOT NULL,
    PRIMARY KEY (cliente_id)
);