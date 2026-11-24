const { pool } = require('../config/db');

const ProductoModel = {
  async crear({ nombre, precio, categoria, stock = 0 }) {
    const [resultado] = await pool.query(
      'INSERT INTO productos (nombre, precio, categoria, stock) VALUES (?, ?, ?, ?)',
      [nombre, precio, categoria, stock]
    );
    return this.obtenerPorId(resultado.insertId);
  },

  async obtenerTodos() {
    const [filas] = await pool.query('SELECT * FROM productos ORDER BY id DESC');
    return filas;
  },

  async obtenerPorId(id) {
    const [filas] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    return filas[0] || null;
  },

  async actualizar(id, { nombre, precio, categoria, stock }) {
    const [resultado] = await pool.query(
      'UPDATE productos SET nombre = ?, precio = ?, categoria = ?, stock = ? WHERE id = ?',
      [nombre, precio, categoria, stock, id]
    );
    if (resultado.affectedRows === 0) return null;
    return this.obtenerPorId(id);
  },

  async eliminar(id) {
    const [resultado] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    return resultado.affectedRows > 0;
  },

  async obtenerPorCategoria(categoria) {
    const [filas] = await pool.query(
      'SELECT * FROM productos WHERE categoria = ? ORDER BY id DESC',
      [categoria]
    );
    return filas;
  }
};

module.exports = ProductoModel;
