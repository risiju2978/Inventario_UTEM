
const { db } = require("../utils/utils.helpers");

const userEditRolController = {
  editarRolUsuario: async (req, res) => {
    try {
      // Extraer los campos relacionados con roles, nombre usuario y correo electrónico
      const { user_id, rol_id, state } = req.body;

      // Validaciones
      if (user_id === undefined || user_id === 0)
        return res
          .status(404)
          .json({ status: 404, error: "Usuario no encontrado" });

      const sql = "SELECT user_id FROM usuario WHERE user_id = ?";

      db.query(sql, [user_id], (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(404)
            .json({ status: 404, error: "Error en la consulta de usuario" });
        }

        if (result.length > 0) {
          // Actualizar datos de usuario
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
                //cabeceras
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Allow", "POST");
                res.setHeader("Date", new Date().toUTCString());
             
             
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
};

module.exports = userEditRolController;













