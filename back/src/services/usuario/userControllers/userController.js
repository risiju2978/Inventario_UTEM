
require("dotenv").config();
const {db} =require("../../../../utils/utils.helpers");



const userController = {
//##################################################################################
    listarUsuarios: (req, res) => {
        try {
          // Consulta SQL para obtener la lista de usuarios
          const sql = 'SELECT * FROM usuario';
    
          //  consulta  tal 
          db.query(sql, (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                status: 500,
                error: 'Error al obtener la lista de usuarios desde la base de datos',
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
    
           
            res.status(200)
              .json({
                status: 200,
                data: userList,
                mensaje: 'Lista de usuarios obtenida correctamente',
            });
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            status: 500,
            error: 'Error interno del servidor al obtener la lista de usuarios',
          });
        }
      },
//##################################################################################



loginUsuario : async (req, res) => {
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
      // campos que se requieren en vez de asterisco ya que es mala practica 
      const [conseguir_user] = await db.query('SELECT * FROM usuario WHERE usuario = ?', [username]);
      // si no está en arreglo da error 
      if (conseguir_user.length === 0) {
        return res.status(404).json({
          status: 404,
          error: "Usuario no encontrado",
        });
      }
      // asignar contenido del usuario
      const user = conseguir_user[0];

 
const data = {
          user_id: user.user_id,
          username: user.username,
          password: user.password,
          email: user.email,
          rol_id: user.rol_id,
          campus_id: user.campus_id,
          user_state: user.user_state,
          token: "genera_un_token_aqui", // token JWT (cuando se aprenda)
          message: "Ha accedido con éxito",
};



      // Enviar respuesta exitosa
      res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor",
      });
    }
  },
//##################################################################################

crearUsuario: (req, res) => {
    try {
      // Datos del cuerpo de la solicitud
      const { username, email, rol, user_state, password } = req.body;

      // Verificar si todos los campos necesarios están presentes
      if (!username || !email || !rol || !user_state || !password) {
        return res.status(400).json({
          status: 400,
          error: "Faltan campos obligatorios",
        });
      }

      // Consulta SQL para insertar un nuevo usuario
      const sql = `INSERT INTO usuario (
        username, 
        email, 
        rol, 
        user_state, 
        password
        )  VALUES (?, ?, ?, ?, ?)`;

      //data para crear usuario
      const userCreateData = {username, email, rol, user_state, password};

      // Ejecutar la consulta con los valores proporcionados
      db.query(sql, userCreateData, (errDB, resultDB) => {
        if (errDB) {
          console.error(errDB);
          return res.status(500).json({
            status: 500,
            error: "Error al agregar usuario a la base de datos",
          });
        }

        res.status(200)
        
          .json({
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
  },

//##################################################################################

editarRolUsuario: async (req, res) => {
    try {
      // Extraer los campos relacionados con roles, nombre usuario y correo electrónico
      const { user_id,rol_id, user_state } = req.body;
      //console donde observo el cuerpo de la solicitud enviada
      console.log( user_id," |",rol_id,"| ", user_state);
      // Validaciones
      if (user_id === undefined || user_id === 0)
        return res
          .status(405)
          .json({ status: 405, error: "Usuario no encontrado" });


      const sql = "SELECT user_id FROM usuario WHERE user_id = ? ";

      const user_ID = {user_id};

      db.query(sql,user_ID, (err, result) => {
        if (err) {
          console.log(err);
          return res
          
            .status(404)
            .json({ status: 404, error: "Error en la consulta de usuario" });
           
        }

        if (result.length > 0) {
          // Actualizar datos de usuario
          let sqlUpdate = "UPDATE usuario SET ";
          let sep = "";
          let data = []; // arreglo de variables para remplazo de ?
          
          if (rol_id !== undefined || !NaN(rol_id) > 0) {
            sqlUpdate += " rol_id= ?";
            data.push(rol_id);
          }

          sep = data.length > 0 ? "," : "";
          //buscar funcion NaN para verificar si es numericoen mozzilla 
          if (user_state !== undefined || !NaN(user_state)  ) {
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
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor",
      });
    }
  },


//##################################################################################


editarUsuario: async (req, res) => {
    try {
      // Extraer los campos relacionados, nombre de usuario, correo electrónico y contraseña
      const { user_id, username, email, password } = req.body;

      // Validar si user_id está definido
      if (user_id == undefined || user_id == 0) {
        return res.status(405).json({ status: 404, error: "Usuario no encontrado" });
      }

      // Verificar si el usuario existe
      const sqlUserCheck = "SELECT user_id FROM usuario WHERE user_id = ?";

      const userID = {user_id};

      db.query(sqlUserCheck, userID, (errCheck, resultCheck) => {
        if (errCheck) {
          return res.status(500).json({ status: 500, error: "Error en la consulta de usuario" });
        }

        if (resultCheck.length === 0) {
          return res.status(404).json({ status: 404, error: "No existe usuario" });
        }

        // Actualizar datos de usuario
        const sqlUpdate = "UPDATE usuario SET username = ?, email = ?, password = ? WHERE user_id = ?";
        const data = {username, email, password, user_id};

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
  },


//##################################################################################

getInfoUser: async (req, res) => {
    try {
      const { user_id } = req.query;

      if (!user_id) {
        return res.status(400).json({
          status: 400,
          error: "Falta el parámetro id_usuario en la solicitud",
        });
      }

      const sql = "SELECT * FROM usuario WHERE user_id = ?";
      const [user] = await db.query(sql, [user_id]);

      if (user.length === 0) {
        return res.status(400).json({
          status: 400,
          error: "No se encontró el usuario con el ID proporcionado",
        });
      }

      const responseData = {
        status: 200,
        data: [
          {
            username: user[0].username,
            password: user[0].password,
            correo: user[0].email,
            rol: user[0].rol,
          },
        ],
        estado: user[0].user_state,
        message: "Información personal mostrada con éxito",
      };

     

      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor al extraer datos",
      });
    }
  },
//##################################################################################




}



module.exports = userController;







