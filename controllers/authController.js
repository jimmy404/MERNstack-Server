const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
    }

    //extraer mail y pass
    const { email, password } = req.body;

    try {
      //revisar que sea un usuario registrado
      let usuario = await Usuario.findOne({ email });
      if(!usuario) {
        return res.status(400).json({msg: 'El usuario no existe'});
      }
      //reisar pass
      const passCorrecto = await bcryptjs.compare(password, usuario.password);
      if(!passCorrecto) {
        return res.status(400).json({msg: 'Password Incorrecto'})
      }
    //crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    };
    //firmar el JWT
    jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600
    }, (error, token) => {
      if(error) throw error;
      //mensaje de confirmacion
      res.json({ token });
    });
    } catch (error) {
      console.log(error)
    }
}