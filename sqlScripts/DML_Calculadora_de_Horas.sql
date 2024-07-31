-- SCRIPT PARA CRIAÇÃO DA BASE DE DADOS
--
-- Sobre: Este script registra operações sql mais utilizadas nessa base de dados
--
-- Author: Rafael Berto Pereira
-- Data Criação: 31/08/2024
-- Última alteração: 31/08/2024
--
-- Histórico: - Criação do script
-- 			  > Popula base com dados iniciais	

-- Base de dados alvo
USE calculadora_horas;

-- Inserção de dados
INSERT INTO USERS(username, passworld) VALUES(
	'fulano', '!@senha@!'
);

INSERT INTO ALARM_CONFIG(workEntry,intervalBeginning,intervalEnd,workload,user_id) VALUES(
	'09:00:00', '13:00:00', '14:00:00', 8, 1
);

-- Seleção de dados

-- Atualização de dados

-- Deleção de dados

DROP TABLE ALARM_CONFIG;

DROP TABLE USERS;