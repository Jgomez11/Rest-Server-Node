const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT, esAdminRol } = require("../middlewares");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers");

const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

//obtener todas las categorias - publico
router.get("/", obtenerCategorias);

//obtener una categoria por id - publico
router.get(
  "/:id",
  check("id", "No es un id de Mongo valido").isMongoId(),
  validarCampos,
  check("id").custom(existeCategoriaPorId),
  validarCampos,
  obtenerCategoria
);

//crear categoria - privado - culaq. persona con token valido
router.post(
  "/",
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos,
  crearCategoria
);

//actualizar categoria - privado - cualq persona con token valido
router.put(
  "/:id",
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("id", "No es un id de Mongo valido").isMongoId(),
  validarCampos,
  check("id").custom(existeCategoriaPorId),
  validarCampos,
  actualizarCategoria
);

//borrar una categoria por id - privado - admin
router.delete(
  "/:id",
  validarJWT,
  esAdminRol,
  check("id", "No es un id de Mongo valido").isMongoId(),
  validarCampos,
  check("id").custom(existeCategoriaPorId),
  validarCampos,
  borrarCategoria
);

module.exports = router;
