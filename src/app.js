const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); // Parsea cuerpos JSON en req.body

// Ruta de salud
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    proyecto: 'SENA ADSO - Guía 7: API REST Express + MySQL',
    endpoints: '/api/productos, /api/usuarios, /api/reportes/estadisticas'
  });
});

// Rutas de la API
app.use('/api', routes);

// 404 y errores (deben ir al final)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
