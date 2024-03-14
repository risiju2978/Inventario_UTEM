
const jwt = require("jsonwebtoken");

const generarJWT = (id = "", username = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id, username}; // se incluye dentro del token

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
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