const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para JSON
app.use(express.json());

// Crear un router para todas las rutas que van bajo /usr
const usrRouter = express.Router();

// Ruta principal del prefijo /usr
usrRouter.get('/', (req, res) => {
  res.json({
    service: "users-service",
    message: "Users API base endpoint",
    version: "1.0.0",
    endpoints: [
      "GET /usr/users - Lista todos los usuarios",
      "GET /usr/users/:id - Obtiene un usuario específico",
      "GET /usr/health - Estado del servicio"
    ]
  });
});

// Ruta para listar usuarios
usrRouter.get('/users', (req, res) => {
  res.json({
    service: "users-service", 
    message: "¡Hola desde el servicio de usuarios!", 
    data: [
      { id: 1, name: "Juan Pérez", email: "juan@email.com" },
      { id: 2, name: "Ana García", email: "ana@email.com" },
      { id: 3, name: "Carlos López", email: "carlos@email.com" }
    ],
    timestamp: new Date().toISOString()
  });
});

// Ruta para obtener un usuario específico
usrRouter.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = [
    { id: 1, name: "Juan Pérez", email: "juan@email.com" },
    { id: 2, name: "Ana García", email: "ana@email.com" },
    { id: 3, name: "Carlos López", email: "carlos@email.com" }
  ];
  
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json({
      service: "users-service",
      message: `Usuario encontrado: ${user.name}`,
      data: user,
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(404).json({
      service: "users-service",
      message: "Usuario no encontrado",
      error: `No existe usuario con ID ${userId}`
    });
  }
});

// Ruta de salud del servicio
usrRouter.get('/health', (req, res) => {
  res.json({
    status: "OK", 
    service: "users-service",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Montar el router en el prefijo /usr
app.use('/usr', usrRouter);

// Opcional: Ruta raíz que redirija a /usr
app.get('/', (req, res) => {
  res.redirect('/usr');
});

app.listen(PORT, () => {
  console.log(`🚀 Users Service corriendo en puerto ${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET http://localhost:${PORT}/usr`);
  console.log(`   GET http://localhost:${PORT}/usr/users`);
  console.log(`   GET http://localhost:${PORT}/usr/users/:id`);
  console.log(`   GET http://localhost:${PORT}/usr/health`);
});