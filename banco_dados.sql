CREATE DATABASE IF NOT EXISTS clinicaesteticahappylife;


-- Criação da tabela 'pesquisadores' com as colunas necessárias
CREATE TABLE clientes (

   codcliente INT AUTO_INCREMENT PRIMARY KEY,
   nome VARCHAR(50) NOT NULL,              
   sobrenome VARCHAR(100) NOT NULL,        
   email VARCHAR(50) NOT NULL UNIQUE,
   whatsapp VARCHAR(15) NOT NULL,
   cep INT(8) NOT NULL,
   logradouro VARCHAR(50) NOT NULL,
   numero VARCHAR(20) NOT NULL,
   complemento CHAR(20),
   bairro VARCHAR(20) NOT NULL,
   cidade VARCHAR(50) NOT NULL,
   uf CHAR(2) NOT NULL
);