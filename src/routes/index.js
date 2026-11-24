const { Router } = require('express');

const router = Router();

router.use('/productos', require('./producto.routes'));
router.use('/usuarios', require('./usuario.routes'));
router.use('/reportes', require('./reporte.routes'));

module.exports = router;
