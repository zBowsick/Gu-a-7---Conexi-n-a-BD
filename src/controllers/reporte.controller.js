const ReporteModel = require('../models/reporte.model');

// 10. GET /api/reportes/estadisticas
exports.obtenerEstadisticas = async (req, res, next) => {
  try {
    const [porCategoria, resumen] = await Promise.all([
      ReporteModel.estadisticasPorCategoria(),
      ReporteModel.resumenGeneral()
    ]);

    res.json({
      status: 'OK',
      resumen,
      agregaciones: porCategoria
    });
  } catch (error) {
    next(error);
  }
};
