CREATE DATABASE almoxarifado;

USE almoxarifado;

CREATE TABLE estoque(
	id INT PRIMARY KEY AUTO_INCREMENT, 
	nome VARCHAR(255), 
	qtde INT, 
	descricao VARCHAR(255), 
	preco DECIMAL(10,2), 
	estoque_min INT,
	foto VARCHAR(255),
	categoria VARCHAR(255)
); 

SELECT * FROM estoque;

INSERT INTO estoque (nome, qtde, descricao, preco, estoque_min, foto, categoria)
VALUES ('Parafuso', 100, 'serve pra fixar', 0.50, 100, 'https://images.cws.digital/produtos/gg/22/20/parafuso-sextavado-zincado-316-x-50-10072022-1670520383817.jpg', 'miscelaneas');


INSERT INTO estoque (nome, qtde, descricao, preco, estoque_min, foto, categoria)
VALUES ('Alicate', 10, 'serve pra alicatear', 40.50, 10, 'https://santil.jetassets.com.br/produto/1624594Alicate-Universal-1050-109266474551.jpg', 'ferramenta');