const { Router } = require('express');
const controller = require('../controllers/reporte.controller');

const router = Router();

router.get('/estadisticas', controller.obtenerEstadisticas); // 10

module.exports = router;
