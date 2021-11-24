const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, resp = response, next) => {
  const token = req.header("w-token");

  if (!token) {
    return resp.status(401).json({
      msg: "el token no existe en la peticion",
    });
  }

  try {
    const { usuarioID } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

    //leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(usuarioID);

    console.log(usuario);
    if (!usuario) {
      return resp.status(401).json({
        msg: "token no valido - usuario no existe en BD.",
      });
    }
    //validar si usuario tiene estado activo
    if (!usuario.estado) {
      return resp.status(401).json({
        msg: "token no valido - usuario inactivo.",
      });
    }
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    resp.status(401).json({
      msg: "token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
