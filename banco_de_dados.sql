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

UPDATE estoque
SET qtde = 400
WHERE nome = 'Parafuso';

INSERT INTO estoque (nome, qtde, descricao, foto, categoria)
VALUES ('Parafuso', 500, 'Utilizado para fixação e montagem de peças.', 'https://images.cws.digital/produtos/gg/22/20/parafuso-sextavado-zincado-316-x-50-10072022-1670520383817.jpg', 'Miscelaneas');


INSERT INTO estoque (nome, qtde, descricao, foto, categoria)
VALUES ('Alicate', 20, 'Ferramenta usada para segurar, cortar ou dobrar materiais.', 'https://santil.jetassets.com.br/produto/1624594Alicate-Universal-1050-109266474551.jpg', 'ferramenta');


INSERT INTO estoque (nome, qtde, descricao, foto, categoria)
VALUES ('Chave de fenda', 15, 'Ferramenta usada para apertar e soltar parafusos.', 'https://images.cws.digital/produtos/gg/60/58/chave-de-fenda-65x100mm-redstripe-10855860-1759337541133.png', 'ferramenta');


INSERT INTO estoque (nome, qtde, descricao, foto, categoria)
VALUES ('Fita crepe', 5, 'Fita adesiva utilizada para proteção e marcação.', 'https://images.tcdn.com.br/img/img_prod/289123/fita_crepe_larga_uso_geral_e_pintura_48mm_x_50m_adere_213773_1_4e4f672dca694e9f35fb8a53bf279b32.jpg', 'Pintura');


INSERT INTO estoque (nome, qtde, descricao, foto, categoria)
VALUES ('Teclado', 6, 'Dispositivo de entrada para digitação em computadores.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwu8YTBxX81tsErPtz5f9peP7kfqwYC3z-AHe0EBQA-oCILVecLyftCfM&s=10', 'Informática');

DELETE FROM estoque
WHERE id = 5;