// Ejecuta database/schema.sql usando las credenciales del .env
// Uso: npm run db:init
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

(async () => {
  let conexion;
  try {
    conexion = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await conexion.query(sql);
    console.log('✓ Base de datos y tablas creadas correctamente');
  } catch (error) {
    console.error('✕ No se pudo inicializar la base de datos:', error.message);
    process.exitCode = 1;
  } finally {
    if (conexion) await conexion.end();
  }
})();
