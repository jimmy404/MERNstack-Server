const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async(req, res) => {

  //revisar si hay errores
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()})
  }
  try {
    //crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);
    //guardar creador via JWT
    proyecto.creador = req.usuario.id;
    //guardar proyecto
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

//obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async(req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({creado: -1});
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

//actualiza un proyecto
exports.actualizarProyecto = async(req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
    }
    //extraer informacion del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};
    if(nombre) {
      nuevoProyecto.nombre = nombre;
    }

    try {
      //revisar el ID

      //revisar si existe proyecto

      //verificar el creador del proyecto

      //actualizar
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el servidor');
    }
}