
import { db } from "../utils/utils.helpers";

const userInfoUserController = {
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
      const [user] = await db.promise().query(sql, [user_id]);

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

      // Agregar las cabeceras
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Allow", "GET");
      res.setHeader("Date", new Date().toUTCString());

      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor al extraer datos",
      });
    }
  },
};

export default userInfoUserController;




