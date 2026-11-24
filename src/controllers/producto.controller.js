const ProductoModel = require('../models/producto.model');

// 1. POST /api/productos
exports.crearProducto = async (req, res, next) => {
  try {
    const producto = await ProductoModel.crear(req.body);
    res.status(201).json({ status: 'OK', data: producto });
  } catch (error) {
    next(error);
  }
};

// 2. GET /api/productos
exports.obtenerProductos = async (req, res, next) => {
  try {
    const productos = await ProductoModel.obtenerTodos();
    res.json({ status: 'OK', total: productos.length, data: productos });
  } catch (error) {
    next(error);
  }
};

// 3. GET /api/productos/:id
exports.obtenerProductoPorId = async (req, res, next) => {
  try {
    const producto = await ProductoModel.obtenerPorId(req.params.id);
    if (!producto) {
      return res.status(404).json({ status: 'Error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'OK', data: producto });
  } catch (error) {
    next(error);
  }
};

// 4. PUT /api/productos/:id
exports.actualizarProducto = async (req, res, next) => {
  try {
    const actualizado = await ProductoModel.actualizar(req.params.id, req.body);
    if (!actualizado) {
      return res.status(404).json({ status: 'Error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'OK', data: actualizado });
  } catch (error) {
    next(error);
  }
};

// 5. DELETE /api/productos/:id
exports.eliminarProducto = async (req, res, next) => {
  try {
    const eliminado = await ProductoModel.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ status: 'Error', message: 'No existe el producto' });
    }
    res.json({ status: 'OK', message: 'Producto eliminado con éxito' });
  } catch (error) {
    next(error);
  }
};

// 6. GET /api/productos/categoria/:cat
exports.filtrarPorCategoria = async (req, res, next) => {
  try {
    const productos = await ProductoModel.obtenerPorCategoria(req.params.cat);
    res.json({
      status: 'OK',
      categoria: req.params.cat,
      total: productos.length,
      data: productos
    });
  } catch (error) {
    next(error);
  }
};
