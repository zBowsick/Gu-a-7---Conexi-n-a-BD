const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuario.model');

// 7. POST /api/usuarios/registro
exports.registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const id = await UsuarioModel.crear({ nombre, email, passwordHash });

    res.status(201).json({
      status: 'OK',
      message: 'Usuario registrado exitosamente',
      data: { id, nombre, email }
    });
  } catch (error) {
    next(error); // El correo duplicado (ER_DUP_ENTRY) lo maneja errorHandler
  }
};

// 8. POST /api/usuarios/login
exports.loginUsuario = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usuario = await UsuarioModel.obtenerPorEmail(email);
    const coincide = usuario && (await bcrypt.compare(password, usuario.password));

    if (!coincide) {
      return res.status(401).json({ status: 'Error', message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET || 'clave_de_desarrollo',
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    res.json({
      status: 'OK',
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    next(error);
  }
};

// 9. GET /api/usuarios
exports.listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await UsuarioModel.obtenerTodos();
    res.json({ status: 'OK', total: usuarios.length, data: usuarios });
  } catch (error) {
    next(error);
  }
};
