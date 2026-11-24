const { pool } = require('../config/db');

const UsuarioModel = {
  async crear({ nombre, email, passwordHash }) {
    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, passwordHash]
    );
    return resultado.insertId;
  },

  // Incluye el hash de la contraseña: solo para uso interno (login)
  async obtenerPorEmail(email) {
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return filas[0] || null;
  },

  // Nunca devuelve la contraseña
  async obtenerTodos() {
    const [filas] = await pool.query(
      'SELECT id, nombre, email, fechaCreacion FROM usuarios ORDER BY id DESC'
    );
    return filas;
  }
};

module.exports = UsuarioModel;
