const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/");

router.post(
  "/login",
  check("correo", "el correo es obligaotrio").isEmail(),
  check("password", "la contraseña es obligatoria").not().isEmpty(),
  validarCampos,
  login
);

module.exports = router;
