const express = require('express');

//crear el servidor
const app = express();

//puerto de la app
const PORT = process.env.PORT || 4000;

//definir la pagina principal
app.get('/', (req, res) => {
  res.send('Hola Mundo')
});

//arranca app
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})