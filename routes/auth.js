const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//login usuario
router.post(
  "/login",
  check("correo", "el correo es obligaotrio").isEmail(),
  check("password", "la contraseña es obligatoria").not().isEmpty(),
  validarCampos,
  login
);

//login with google
router.post(
  "/google",
  check("id_token", "el id_token es necesario").not().isEmpty(),
  validarCampos,
  googleSignIn
);

module.exports = router;
