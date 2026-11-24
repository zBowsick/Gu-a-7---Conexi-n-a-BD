require('dotenv').config();
const app = require('./app');
const { conectarBD } = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  // 1. Conectar a la base de datos
  await conectarBD();

  // 2. Levantar el servidor
  app.listen(PORT, () => {
    console.log(`✓ Servidor escuchando en http://localhost:${PORT}`);
  });
})();
