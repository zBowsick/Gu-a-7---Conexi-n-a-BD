# SENA ADSO · Guía 7 — API REST con Node.js + Express + MySQL

Backend con **10 endpoints RESTful** conectados a **MySQL** (driver `mysql2` con pool de conexiones), siguiendo una arquitectura en capas: `routes → middlewares → controllers → models → config/db`.

> La guía original usa MongoDB/Mongoose; este proyecto implementa los mismos 10 endpoints y el mismo modelo `Producto`, pero sobre MySQL.

## Estructura de carpetas

```
guia7-backend-mysql/
├── database/
│   ├── schema.sql          # Base de datos, tablas y datos de prueba
│   └── init.js             # Ejecuta schema.sql (npm run db:init)
├── postman/
│   └── Guia7.postman_collection.json
├── src/
│   ├── config/db.js        # Pool MySQL + verificación de conexión
│   ├── models/             # Consultas SQL (producto, usuario, reporte)
│   ├── controllers/        # Lógica de cada endpoint
│   ├── routes/             # Mapeo de rutas REST
│   ├── middlewares/        # Validaciones y manejo de errores
│   ├── app.js              # Configuración de Express
│   └── server.js           # Punto de entrada
├── .env.example
├── .gitignore
└── package.json
```

## Puesta en marcha

1. Requisitos: Node.js 18+ y MySQL 8 en ejecución.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   ```bash
   cp .env.example .env      # en Windows: copy .env.example .env
   ```
   Edita `.env` con tu usuario/contraseña de MySQL.
4. Crear la base de datos y las tablas (elige una):
   ```bash
   npm run db:init
   # o bien
   mysql -u root -p < database/schema.sql
   ```
5. Iniciar el servidor:
   ```bash
   npm start        # producción
   npm run dev      # con recarga automática
   ```
   Verás: `✓ Conexión exitosa a la base de datos MySQL` y el servidor en `http://localhost:5000`.

## Los 10 endpoints

| # | Método | Ruta | Descripción |
|---|--------|------|-------------|
| 1 | POST | `/api/productos` | Crear producto |
| 2 | GET | `/api/productos` | Listar productos |
| 3 | GET | `/api/productos/:id` | Producto por ID |
| 4 | PUT | `/api/productos/:id` | Actualización total |
| 5 | DELETE | `/api/productos/:id` | Eliminar producto |
| 6 | GET | `/api/productos/categoria/:cat` | Filtrar por categoría |
| 7 | POST | `/api/usuarios/registro` | Registrar usuario |
| 8 | POST | `/api/usuarios/login` | Login (devuelve JWT) |
| 9 | GET | `/api/usuarios` | Listar usuarios (sin contraseña) |
| 10 | GET | `/api/reportes/estadisticas` | Conteos y agregaciones |

### Ejemplo rápido

```bash
curl -X POST http://localhost:5000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Teclado Mecánico RGB","precio":250000,"categoria":"Periféricos","stock":15}'
```
