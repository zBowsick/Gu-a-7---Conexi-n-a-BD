// Ruta no encontrada (404)
exports.notFound = (req, res) => {
  res.status(404).json({
    status: 'Error',
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
};

// Manejador global de errores (siempre el último middleware)
// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
  // JSON mal formado en el body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'Error', message: 'JSON mal formado en el cuerpo de la petición' });
  }

  // Valor duplicado (ej. email repetido)
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ status: 'Error', message: 'El registro ya existe (valor duplicado)' });
  }

  console.error('✕ Error:', err.message);
  res.status(500).json({ status: 'Error', message: 'Error interno del servidor' });
};
