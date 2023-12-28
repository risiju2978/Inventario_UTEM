import { db } from "../utils/utils.helpers";

const userCreateUserController = {
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
};

export default userCreateUserController;





















