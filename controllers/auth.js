const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });
    console.log("ees", usuario);
    //si no existe , entonces crearlo
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: " ",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    //si el usuario en BD esta inactivo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // generar jwt
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });

    res.json({
      correo,
      nombre,
      imagen,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de google no es valido",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
