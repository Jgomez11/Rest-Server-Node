const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT, esAdminRol } = require("../middlewares");

const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  borrarProducto,
} = require("../controllers");

const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers/db-validators");

const router = Router();

//obtener todas los productos - publico
router.get("/", obtenerProductos);

//obtener un producto por id - publico
router.get(
  "/:id",
  check("id", "No es un id de Mongo valido").isMongoId(),
  validarCampos,
  check("id").custom(existeProductoPorId),
  validarCampos,
  obtenerProductoPorId
);

//crear producto - privado - culaq. persona con token valido
router.post(
  "/",
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("categoria", "Categoria ingresada no es un id de mongo").isMongoId(),
  check("categoria").custom(existeCategoriaPorId),
  validarCampos,
  crearProducto
);

//actualizar producto - privado - cualq persona con token valido
router.put(
  "/:id",
  validarJWT,
  check("id", "No es un id de Mongo valido").isMongoId(),
  validarCampos,
  check("id").custom(existeProductoPorId),
  validarCampos,
  actualizarProducto
);

//borrar un producto por id - privado - admin
router.delete(
  "/:id",
  validarJWT,
  esAdminRol,
  check("id", "No es un id de Mongo valido").isMongoId(),
  validarCampos,
  check("id").custom(existeProductoPorId),
  validarCampos,
  borrarProducto
);

module.exports = router;
