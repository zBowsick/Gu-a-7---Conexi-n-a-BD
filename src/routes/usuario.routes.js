const { Router } = require('express');
const controller = require('../controllers/usuario.controller');
const { validarRegistro, validarLogin } = require('../middlewares/validate');

const router = Router();

router.post('/registro', validarRegistro, controller.registrarUsuario); // 7
router.post('/login', validarLogin, controller.loginUsuario);           // 8
router.get('/', controller.listarUsuarios);                             // 9

module.exports = router;
