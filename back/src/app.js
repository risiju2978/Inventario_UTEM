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





// Endpoint para listar usuarios
app.post("/api/usuario/listar", (req, res) => {
  try {
    // Consulta SQL para obtener la lista de usuarios
    const sql = "SELECT * FROM usuario";

    //  consulta  tal 
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          status: 500,
          error: "Error al obtener la lista de usuarios desde la base de datos",
        });
      }

      // Mapear los resultados 
      const userList = result.map((user) => ({
        user_id: user.user_id,
        username: user.username,
        password: user.password,
        email: user.email,
        campus_id: user.campus_id,
        rol_id: user.rol_id,
        user_state: user.user_state,
      }));

      res.status(200).json({
        status: 200,
        data: userList,
        mensaje: "Lista de usuarios obtenida correctamente",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Error interno del servidor al obtener la lista de usuarios",
    });
  }
});





// Endpoint para login de usuario
app.post("/api/usuario/login", async (req, res) => {
  try {
    // Obtener credenciales del cuerpo de la solicitud
    const { username, password } = req.body;

    // Verifica si los campos obligatorios están presentes y coinciden
    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        error: "Faltan campos obligatorios",
      });
    }

    // Consultar en la base de datos para obtener el usuario por nombre
    //campos que se requieren en vez de asterisco ya que es mala practica 
    const [conseguir_user] = await db.promise().query('SELECT * FROM usuario WHERE usuario = ?', [username]);
    //si no esta en arreglo  da error 
    if (conseguir_user.length === 0) {
      return res.status(404).json({
        status: 404,
        error: "Usuario no encontrado",
      });
    }
    //asignar  contenido del user
    const user = conseguir_user[0];

   
    // Enviar respuesta exitosa
    res.status(200).json({
      status: 200,
      data: {
       user_id : user.user_id,   
        username: user.username,
        password: user.password,
        email: user.email,
        rol_id : user.rol_id,
        campus_id: user.campus_id,
        user_state:user.user_state,
        token: "genera_un_token_aqui", //  token JWT (cuando se aprenda)
        message: "Ha accedido con éxito",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Error interno del servidor",
    });
  }
});






//endpoint para crear usuario
app.post("/api/usuario/crear_usuario", (req, res) => {
  try {
    //  datos del cuerpo de la solicitud
    const { username, email, rol, user_state, password } = req.body;

    // Verificar si todos los campos necesarios están presentes
    if (!username || !email || !rol || !user_state || !password) {
      return res.status(400).json({
        status: 400,
        error: "Faltan campos obligatorios",
      });
    }

    // Consulta SQL para insertar un nuevo usuario
    const sql = "INSERT INTO usuario (username, email, rol, user_state, password) VALUES (?, ?, ?, ?, ?)";

    // Ejecutar la consulta con los valores proporcionados
    db.query(sql, [username, email, rol, user_state, password], (errDB, resultDB) => {
      if (errDB) {
        console.error(errDB);
        return res.status(500).json({
          status: 500,
          error: "Error al agregar usuario a la base de datos",
        });
      }

      res.status(200).json({
        status: 200,
        data: {
          message: "Usuario agregado con éxito",
          user_id: resultDB.insertId,  // ID del nuevo usuario 
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: "Error interno del servidor",
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


//endpoit para edital usuario
app.put("/api/usuario/editar_usuario", (req, res) => {
  // Extraer los campos relacionados, nombre de usuario, correo electrónico y contraseña
  const { user_id, username, email, password } = req.body;

  // Validar si user_id está definido
  if (user_id == undefined || user_id == 0) {
    return res.status(404).json({ status: 404, error: "Usuario no encontrado" });
  }

  try {
    // Verificar si el usuario existe
    const sqlUserCheck = "SELECT user_id FROM usuario WHERE user_id = ?";
    db.query(sqlUserCheck, [user_id], (errCheck, resultCheck) => {
      if (errCheck) {
        return res.status(500).json({ status: 500, error: "Error en la consulta de usuario" });
      }

      if (resultCheck.length === 0) {
        return res.status(404).json({ status: 404, error: "No existe usuario" });
      }

      // Actualizar datos de usuario
      const sqlUpdate = "UPDATE usuario SET username = ?, email = ?, password = ? WHERE user_id = ?";
      const data = [username, email, password, user_id];

      // Ejecutar la actualización
      db.query(sqlUpdate, data, (errUpdate, resultUpdate) => {
        if (errUpdate) {
          return res.status(500).json({ status: 500, error: "Error al actualizar usuario" });
        }

        if (resultUpdate.affectedRows > 0) {
          return res.status(200).json({ status: 200, message: "Usuario actualizado correctamente" });
        } else {
          return res.status(401).json({ status: 401, error: "Error al actualizar" });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ status: 500, error: "Error en el servidor" });
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






