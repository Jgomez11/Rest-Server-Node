const { response } = require("express");
const ObjecId = require("mongoose").Types.ObjectId;

const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjecId.isValid(termino); //boolean
  console.log("es MONGOID", esMongoID);
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regexTermino = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regexTermino }, { correo: regexTermino }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjecId.isValid(termino); //boolean

  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regexTermino = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regexTermino,
    estado: true,
  });

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjecId.isValid(termino); //boolean

  if (esMongoID) {
    const producto = await Producto.findById(termino)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre");
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regexTermino = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regexTermino,
    estado: true,
  })
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");

  res.json({
    results: productos,
  });
};

const buscar = async (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "se le olvido hacer esta busqueda",
      });
      break;
  }
};

module.exports = {
  buscar,
};
