const { pool } = require('../config/db');

const ReporteModel = {
  // Agregaciones por categoría (COUNT, AVG, SUM)
  async estadisticasPorCategoria() {
    const [filas] = await pool.query(`
      SELECT
        categoria,
        COUNT(*)                     AS totalProductos,
        ROUND(AVG(precio), 2)        AS precioPromedio,
        SUM(stock)                   AS stockTotal,
        ROUND(SUM(precio * stock), 2) AS valorInventario
      FROM productos
      GROUP BY categoria
      ORDER BY totalProductos DESC
    `);
    return filas;
  },

  // Conteos generales
  async resumenGeneral() {
    const [[productos]] = await pool.query('SELECT COUNT(*) AS total FROM productos');
    const [[usuarios]] = await pool.query('SELECT COUNT(*) AS total FROM usuarios');
    return {
      totalProductos: productos.total,
      totalUsuarios: usuarios.total
    };
  }
};

module.exports = ReporteModel;
