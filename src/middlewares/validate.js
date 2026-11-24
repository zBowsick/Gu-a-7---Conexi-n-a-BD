// Validaciones de entrada (antes de llegar al controlador)

const respuestaError = (res, errores) =>
  res.status(400).json({ status: 'Error', message: 'Datos inválidos', errores });

// Valida el id numérico de :id
exports.validarId = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return respuestaError(res, ['El id debe ser un número entero positivo']);
  }
  next();
};

// Valida el cuerpo de un producto (POST y PUT)
exports.validarProducto = (req, res, next) => {
  const { nombre, precio, categoria, stock } = req.body || {};
  const errores = [];

  if (typeof nombre !== 'string' || nombre.trim() === '') {
    errores.push('El nombre es obligatorio');
  } else if (nombre.trim().length > 100) {
    errores.push('El nombre no puede superar 100 caracteres');
  }

  if (precio === undefined || precio === null || isNaN(Number(precio)) || Number(precio) < 0) {
    errores.push('El precio es obligatorio y debe ser un número positivo');
  }

  if (typeof categoria !== 'string' || categoria.trim() === '') {
    errores.push('La categoría es obligatoria');
  }

  if (stock !== undefined && (!Number.isInteger(Number(stock)) || Number(stock) < 0)) {
    errores.push('El stock debe ser un entero mayor o igual a 0');
  }

  if (errores.length) return respuestaError(res, errores);

  // Normaliza los datos
  req.body = {
    nombre: nombre.trim(),
    precio: Number(precio),
    categoria: categoria.trim(),
    stock: stock === undefined ? 0 : Number(stock)
  };
  next();
};

// Valida el registro de usuario
exports.validarRegistro = (req, res, next) => {
  const { nombre, email, password } = req.body || {};
  const errores = [];

  if (typeof nombre !== 'string' || nombre.trim() === '') {
    errores.push('El nombre es obligatorio');
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.push('El correo electrónico no es válido');
  }
  if (typeof password !== 'string' || password.length < 6) {
    errores.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (errores.length) return respuestaError(res, errores);

  req.body = { nombre: nombre.trim(), email: email.trim().toLowerCase(), password };
  next();
};

// Valida el login
exports.validarLogin = (req, res, next) => {
  const { email, password } = req.body || {};

  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return respuestaError(res, ['Email y contraseña son obligatorios']);
  }

  req.body = { email: email.trim().toLowerCase(), password };
  next();
};
