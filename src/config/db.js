const mysql = require('mysql2/promise');

// Pool de conexiones reutilizables (alta concurrencia)
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'adso_guia7_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verifica la conexión al iniciar; detiene la app si falla
const conectarBD = async () => {
  try {
    const conexion = await pool.getConnection();
    console.log('✓ Conexión exitosa a la base de datos MySQL');
    conexion.release();
  } catch (error) {
    console.error('✕ Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, conectarBD };
