const { db } = require("../utils/utils.helpers");

const usuarioListarController = {
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
        //cabecera prueba
          .header('Content-Type', 'application/json')  // Encabezado para indicar que la respuesta es JSON
          .header('Allow', 'POST')  // Encabezado Allow para indicar los métodos HTTP permitidos
          .header('Date', new Date().toUTCString())  // Encabezado Date para indicar la fecha actual
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
};

module.exports = usuarioListarController;