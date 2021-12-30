const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJWT,
  esAdminRol,
  tieneRol,
} = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers");

const router = Router();

//obtener usuarios
router.get("/", usuariosGet);

//actualizar usuario
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

//registrar usuario
router.post(
  "/registrar",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "el password es obligatorio y debe tener almenos 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "el correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

//eliminar usuario
router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRol,
    tieneRol("ADMIN_ROLE", "OTHER_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
