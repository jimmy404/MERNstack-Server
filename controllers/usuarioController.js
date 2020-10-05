const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.crearUsuario = async (req, res) => {

  //revisar si hay errores
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()})
  }

  //extraer email y pass
  const { email, password } = req.body;


  try {
    //revisar que el usuario sea unico
    let usuario = await Usuario.findOne({email});
    if(usuario) {
      return res.status(400).json({msg: 'El usuario ya existe'});
    }
    //crea nuevo usuario
    usuario = new Usuario(req.body);
    //hashear password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);
    //guardar usuario
    await usuario.save();
    //mensaje de confirmacion
    res.json({msg: 'Usuario creado OK'})
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
};