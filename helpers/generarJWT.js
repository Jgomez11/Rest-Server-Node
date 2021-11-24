const jwt = require("jsonwebtoken");

const generarJWT = (usuarioID = "") => {
  return new Promise((resolve, reject) => {
    const payload = { usuarioID };

    jwt.sign(
      payload,
      process.env.SECRET_OR_PRIVATE_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log("no se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
