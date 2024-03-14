require("dotenv").config();
const { generarJWT } = require("../../../../utils/utils.generar-jwt");
const { db } = require("../../../../utils/utils.helpers");
const bcrypt = require("bcrypt");

const userController = {
  //FUNCIONANDO
  //##################################################################################
  listarUsuarios: (req, res) => {
    try {
      // Consulta SQL para obtener la lista de usuarios
      const sql = "SELECT * FROM usuario";

      //  consulta  tal
      db.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            status: 500,
            error:
              "Error al obtener la lista de usuarios desde la base de datos",
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
  },
  //##################################################################################

  //REVISADO Y FUNCIONANDO  (trae todos los datos de los usuarios que cumplan con un username y password correctos dentro de los registros)
  loginUsuario: async (req, res) => {
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

      // Consultar en la base de datos para obtener el usuario por nombre y contraseña

      const sql = `SELECT * FROM usuario WHERE username = ?`;
      const [user] = await db.promise().query(sql, [username]);

      // Si no está en arreglo, el usuario no existe
      if (user.length === 0) {
        return res.status(404).json({
          status: 404,
          error: "Usuario no encontrado",
        });
      }

      const passWordVerify = bcrypt.compareSync(password, user[0].password); // devuelve true o false

      if (!passWordVerify) {
        return res.status(401).json({
          status: 401,
          message: "Contraseña incorrecta",
        });
      }

      //generar token
      const token = await generarJWT(user[0].user_id, user[0].username);

      // Enviar respuesta exitosa con los datos del usuario
      res.status(200).json({
        status: 200,
        data: user,
        message: "Usuario accedido con exito ",
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor" + error.message,
      });
    }
  },

  //##################################################################################
  //FUNCIONANDO
  crearUsuario: async (req, res) => {
    try {
      // Datos del cuerpo de la solicitud
      const { username, email, campus_id, rol_id, user_state, password } =
        req.body;

      // Verificar si todos los campos necesarios están
      //tuve que cambiar user_state para que valide que tenga un valor porque si solo compruebo si es falso no me acepta el 0 pero con undefinied sirve aunque hay que verificar que no sea null
      if (
        !username ||
        !email ||
        !rol_id ||
        user_state === undefined ||
        user_state === null ||
        !password ||
        !campus_id
      ) {
        return res.status(400).json({
          status: 400,
          error: "Faltan campos obligatorios",
        });
      }

      // Verificar si campus_id existe en la tabla sede
      const checkCampusQuery =
        "SELECT COUNT(*) AS count FROM sede WHERE campus_id = ?";
      const [campusCheckResult] = await db
        .promise()
        .query(checkCampusQuery, [campus_id]);

      if (campusCheckResult[0].count === 0) {
        return res.status(400).json({
          status: 400,
          error: "El campus_id proporcionado no existe en la tabla sede",
        });
      }

      // Iniciar una transacción
      await db.promise().beginTransaction();

      try {
        const salt = bcrypt.genSaltSync();

        const passWordEncripted = bcrypt.hashSync(password, salt);

        // Consulta SQL para insertar un nuevo usuario
        const insertUserQuery =
          "INSERT INTO usuario (username, email, rol_id, user_state, password, campus_id) VALUES (?, ?, ?, ?, ?, ?)";
        const userCreateData = [
          username,
          email,
          rol_id,
          user_state,
          passWordEncripted,
          campus_id,
        ];

        // Ejecutar la consulta con los valores proporcionados
        const [resultDB] = await db
          .promise()
          .query(insertUserQuery, userCreateData);

        // Confirmar la transacción
        await db.promise().commit();

        res.status(200).json({
          status: 200,
          data: {
            message: "Usuario agregado con éxito",
            user_id: resultDB.insertId,
          },
        });
      } catch (error) {
        // Revertir la transacción en caso de error
        await db.promise().rollback();

        console.error(error);
        res.status(500).json({
          status: 500,
          error: "Error interno del servidor",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor",
      });
    }
  },

  //##################################################################################
  //REVISADO Y FUNCIONANDO
  editarRolUsuario: async (req, res) => {
    try {
      // Extraer los campos relacionados con roles, nombre usuario y correo electrónico
      const { user_id, rol_id, user_state } = req.body;
      //console donde observo el cuerpo de la solicitud enviada
      console.log(user_id, " |", rol_id, "| ", user_state);
      // Validaciones
      if (user_id === undefined || user_id === 0)
        return res
          .status(405)
          .json({ status: 405, error: "Falta el user id en la petición" });

      const sql = "SELECT * FROM usuario WHERE user_id = ? ";

      const user_ID = { user_id };
      
      const [user] = await db.promise().query(sql, [user_id]);
      console.log(user);


      // await db.promise().query(sql, user_ID, (err, result) => {
      //   if (err) {
      //     console.log(err);
      //     return res
      //       .status(404)
      //       .json({ status: 404, error: "Error en la consulta de usuario" });
      //   }
      //   console.log(result);

        if (user.length > 0) {
          // Actualizar datos de usuario
          let sqlUpdate = "UPDATE usuario SET ";
          let sep = "";
          let data = []; // arreglo de variables para remplazo de ?

          if (rol_id !== undefined || parseInt(rol_id) > 0) {
            sqlUpdate += " rol_id= ?";
            data.push(rol_id);
          }

          sep = data.length > 0 ? "," : "";
          //buscar funcion NaN para verificar si es numericoen mozzilla
          if (user_state !== undefined || parseInt(user_state)) {
            sqlUpdate += `${sep} user_state = ?`;
            data.push(user_state);
          }

          sqlUpdate += " WHERE user_id = ?";
          data.push(user_id);
          //verificar con console que sentencia se esta mandando al query
          console.log(sqlUpdate);
          if (data.length === 0) {
            return res.status(404).json({
              status: 404,
              error: "No existen datos para actualizar",
            });
          }

          // Realizar la actualización en la base de datos

          db.query(sqlUpdate, data, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(404).json({
                status: 404,
                error: "Error en la acción de actualizar usuario",
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
                mensaje: "Usuario actualizado correctamente",
              });
            }
          });
        } else {
          return res
            .status(404)
            .json({ status: 404, error: "No existe usuario" });
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor",
      });
    }
  },

  //##################################################################################
  //REVISADO Y FUNCIONANDO
  editarUsuario: async (req, res) => {
    try {
      // Extraer los campos relacionados, nombre de usuario, correo electrónico y contraseña
      const { user_id, username, email, password } = req.body;

      // Validar si user_id está definido
      if (user_id == undefined || user_id == 0) {
        return res
          .status(405)
          .json({ status: 404, error: "No se proporciona id de usuario" });
      }

      // Verificar si el usuario existe
      const sqlUserCheck = "SELECT user_id FROM usuario WHERE user_id = ?";
      const [userCheck] = await db.promise().query(sqlUserCheck, [user_id]);

      if (userCheck.length === 0) {
        return res
          .status(404)
          .json({ status: 404, error: "No existe usuario" });
      }

      // Actualizar datos de usuario
      const sqlUpdate =
        "UPDATE usuario SET username=?, email=?, password=? WHERE user_id=?";
      const data = [username, email, password, user_id];

      // Ejecutar la actualización
      const [resultUpdate] = await db.promise().query(sqlUpdate, data);

      if (resultUpdate.affectedRows > 0) {
        return res
          .status(200)
          .json({ status: 200, message: "Usuario actualizado correctamente" });
      } else {
        return res
          .status(401)
          .json({ status: 401, error: "Error al actualizar" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, error: "Error en el servidor" });
    }
  },

  //##################################################################################
  //FUNCIONANDO
  getInfoUser: async (req, res) => {
    try {
      const { user_id } = req.body;

      if (!user_id || user_id === undefined || user_id === null) {
        return res.status(400).json({
          status: 400,
          error: "Falta el parámetro id_usuario en la solicitud",
        });
      }

      const sql = "SELECT * FROM usuario WHERE user_id = ?";
      const [user] = await db.promise().query(sql, [user_id]);

      if (user.length === 0) {
        return res.status(404).json({
          status: 404,
          error: "No se encontró el usuario con el ID proporcionado",
        });
      }

      const responseData = {
        status: 200,
        data: {
          username: user[0].username,
          password: user[0].password,
          correo: user[0].email,
          rol: user[0].rol,
          estado: user[0].user_state,
        },
        message: "Información personal mostrada con éxito",
      };

      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor al extraer datos: " + error.message,
      });
    }
  },
  //##################################################################################
};

module.exports = userController;
