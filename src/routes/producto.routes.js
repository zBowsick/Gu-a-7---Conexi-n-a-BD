const { Router } = require('express');
const controller = require('../controllers/producto.controller');
const { validarId, validarProducto } = require('../middlewares/validate');

const router = Router();

// La ruta de categoría va antes que '/:id' para evitar ambigüedades
router.get('/categoria/:cat', controller.filtrarPorCategoria);   // 6

router.post('/', validarProducto, controller.crearProducto);                      // 1
router.get('/', controller.obtenerProductos);                                     // 2
router.get('/:id', validarId, controller.obtenerProductoPorId);                   // 3
router.put('/:id', validarId, validarProducto, controller.actualizarProducto);    // 4
router.delete('/:id', validarId, controller.eliminarProducto);                    // 5

module.exports = router;
