const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },

  correo: {
    type: String,
    require: [true, "El correo es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    require: [true, "La contraseña es obligatorioo"],
  },

  img: {
    type: String,
  },

  rol: {
    type: String,
    require: true,
    default: "USER_ROLE",
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },

  estado: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
