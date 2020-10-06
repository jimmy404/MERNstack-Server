//rutas para auth usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
//crea un usuario
// api/usuarios
router.post('/',
  [
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'Password minimo de 6 caracteres').isLength({min: 6})
  ],
  authController.autenticarUsuario
);

module.exports = router;