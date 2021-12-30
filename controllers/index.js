const Auth = require("./auth");
const Buscar = require("./buscar");
const Categorias = require("./categorias");
const Productos = require("./productos");
const Usuarios = require("./usuarios");

module.exports = {
  ...Auth,
  ...Buscar,
  ...Categorias,
  ...Productos,
  ...Usuarios,
};
