const express = require('express');
const conectarDB = require('./config/db');

//crear el servidor
const app = express();

//conectar con db
conectarDB();

//puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));

//arranca app
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})