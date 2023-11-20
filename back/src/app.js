require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const port = process.env.PORT;

const app = express();

// 1. crear las rutas ( routes & controllers )
// 2. configurar cabeceras y CORS (estudiar)
// 3. interceptores

app.post("/api/usuario/listar", (req, res) => {
  // consulta por parametos enviados mi DB
  // la respuesta de la BD puede ser TRUE o FALSE
  res.status(200).json({
    status: 200,
    data: [
      // esta data debe venir de mi base datos
      { usuario_id: 1, usuario_nombre: "juanito", usuario_activo: "S" },
      { usuario_id: 2, usuario_nombre: "pepito", usuario_activo: "S" },
    ],
    mensage: "",
  });
});

app.get("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.post("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.listen(port, () => {
  console.log("inventario application up on port", port);
});
