require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const port = process.env.PORT;

const { db } = require("../utils/utils.helpers");

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
      {
        usuario_id: 1,
        usuario_username: "malcom",
        password:
          "$2b$10$nCwcoVdwHy8yL0ElvwPkCOsPCkclYU23dasPDqjQlxpWfYboTbfnO",
        correo: "garridopfernando@gmail.com",
        usuario_tipo: 1,
        rol: SuperAdmin,
        estado: 1,
      },

      {
        usuario_id: 2,
        usuario_username: "mendez",
        password:
          "$2b$10$nCwcoVdwHy8yL0ElvwPkCOsPCkclYU23dasPDqjQlxpWfYboTbf23",
        correo: "algo@gmail.com",
        usuario_tipo: 2,
        rol: "Admin",
        estado: 1,
      },
    ],
    mensage: "",
  });
});

//url para login  de usuario
app.post("/api/usuario/login", (req, res) => {
  //try donde deberia cotejarse los valores ingresados con la base de datos
  // para saber si existe el usuario
  try {
    if (username === true && password === true) {
      res.status(200).json({
        status: 200,
        data: {
          id_usuario: 1,
          id_usuario_tipo: 1,
          id_bodega: 1,
          nombres: "Fernando",
          apellidos: "Garrido",
          usuario: "fgarrido",
          clave: "$2b$10$nCwcoVdwHy8yL0ElvwPkCOsPCkclYU23dasPDqjQlxpWfYboTbfnO",
          correo: "garridopfernando@gmail.com",
          create_at: "2023-10-09T16:49:35.000Z",
          update_at: "2023-10-09T16:49:35.000Z",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk5MTk3MTAsImV4cCI6MTY5OTkyMzMxMH0.MS8BcZXqkuHv5XezkGmOi2jKifbICJd44Mgxr4BiQV8",
          message: "ha accedido con éxito",
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "error en consulta",
    });
  }
});

//url para crear usuario
app.post("/api/usuario/crear_usuario", (req, res) => {
  //try donde deberia cotejarse los valores ingresados con la base de datos
  // para saber si existe el usuario
  try {
    if (rol === 1 && estado === 1)
      // Pedir al usuario que ingrese un elemento necesario para agregar
      var username = prompt("Ingrese un nombre:");
    var correo = prompt("Ingrese un correo:");
    var rol = prompt("Ingrese un rol:");
    var estado = prompt("Ingrese un estado:");
    var password = prompt("Ingrese una contraseña:");

    // Verificar si el usuario ingresó algo
    if (
      username !== null &&
      correo !== null &&
      rol !== null &&
      estado !== null &&
      password !== null
    ) {
      res.status(200).json({
        status: 200,

        data: {
          message: "ha agregado con éxito",
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "error al agregar usuario",
    });
  }
});

// Endpoint para editar roles
app.put("/api/usuario/editar_rol", (req, res) => {
  // Extraer los  campos relacionados con roles, nombre usuario y correo electrónico

  const { user_id, rol_id, state } = req;

  // validaciones
  if (user_id == undefined || user_id == 0)
    return res
      .status(404)
      .json({ status: 404, error: "Usuario no encontrado" });

  try {
    const sql = "SELECT user_id FROM usuario WHERE user_id = ?";

    db.query(sql, [user_id], (err, result) => {
      if (err) {
        console.log(err); // err.message
        return res
          .status(404)
          .json({ status: 404, error: "Error en la consulta de usuario" });
      }

      if (result.length > 0) {
        // actualizar datos de usuario
        let sqlUpdate = "UPDATE usuario SET";
        let sep = "";
        let data = []; // arreglo de variables para remplazo de ?

        if (rol_id.length > 0) {
          sqlUpdate += " rol_id = ?";
          data.push(rol_id);
        }

        sep = data.length > 0 ? "," : "";

        if (state.length > 0) {
          sqlUpdate += `${sep}state = ?`;
          data.push(state);
        }

        sqlUpdate += " WHERE user_id = ?";
        data.push(user_id);

        if (data.length == 0) {
          return res.status(404).json({
            status: 404,
            error: "no existen datos para actualizar",
          });
        }

        console.log(sqlUpdate);

        // DB
        db.query(sqlUpdate, data, (err, result) => {
          if (err) {
            console.log(err); // err.message
            return res.status(404).json({
              status: 404,
              error: "Error en accion de actualizar usuario",
            });
          }

          if (!result) {
            return res.status(401).json({
              status: 401,
              error: "Error al actualizar",
            });
          } else {
            return res.status(200).json({
              status: 200,
              error: "Usuario actualizado correctamente",
            });
          }
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, error: "No existe usuario" });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Error en el servidor",
    });
  }
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
