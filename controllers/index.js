const Auth = require("./auth");
const Buscar = require("./buscar");
const Categorias = require("./categorias");
const Productos = require("./productos");
const Uploads = require("./uploads");
const Usuarios = require("./usuarios");

module.exports = {
  ...Auth,
  ...Buscar,
  ...Categorias,
  ...Productos,
  ...Uploads,
  ...Usuarios,
};
