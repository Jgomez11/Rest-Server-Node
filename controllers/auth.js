const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // validar si existe correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "usuario o password no son correctos",
      });
    }
    // validar usuario activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "usuario y/o password no son correctos",
      });
    }

    // validadr contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "usuario y/o password no son correctos...",
      });
    }

    // generar jwt
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
