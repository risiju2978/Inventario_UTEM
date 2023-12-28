
import { db } from "../utils/utils.helpers";

const userEditUserController = {
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
};

export default userEditUserController;













