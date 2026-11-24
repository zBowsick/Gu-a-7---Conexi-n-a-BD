-- ============================================================
-- SENA ADSO - Guía 7: esquema MySQL
-- Ejecutar con:  mysql -u root -p < database/schema.sql
-- (o con: npm run db:init)
-- ============================================================

CREATE DATABASE IF NOT EXISTS adso_guia7_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE adso_guia7_db;

CREATE TABLE IF NOT EXISTS productos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(100)   NOT NULL,
  precio        DECIMAL(12,2)  NOT NULL CHECK (precio >= 0),
  categoria     VARCHAR(50)    NOT NULL,
  stock         INT            NOT NULL DEFAULT 0 CHECK (stock >= 0),
  fechaCreacion TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_productos_categoria (categoria)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS usuarios (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(100)  NOT NULL,
  email         VARCHAR(120)  NOT NULL UNIQUE,
  password      VARCHAR(255)  NOT NULL,
  fechaCreacion TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Datos de prueba (solo si la tabla está vacía)
INSERT INTO productos (nombre, precio, categoria, stock)
SELECT * FROM (
  SELECT 'Teclado Mecánico RGB' AS nombre, 250000.00 AS precio, 'Periféricos' AS categoria, 15 AS stock
  UNION ALL SELECT 'Mouse Gamer', 120000.00, 'Periféricos', 30
  UNION ALL SELECT 'Laptop Dell XPS', 4500000.00, 'Tecnología', 12
  UNION ALL SELECT 'Monitor 24 pulgadas', 680000.00, 'Tecnología', 8
) AS semilla
WHERE NOT EXISTS (SELECT 1 FROM productos);
