const { db } = require("../utils/utils.helpers");

const usuarioLoginController = {
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
      const [conseguir_user] = await db.promise().query('SELECT * FROM usuario WHERE usuario = ?', [username]);
      // si no está en arreglo da error 
      if (conseguir_user.length === 0) {
        return res.status(404).json({
          status: 404,
          error: "Usuario no encontrado",
        });
      }
      // asignar contenido del usuario
      const user = conseguir_user[0];
  
 //  cabeceras
 res.setHeader('Content-Type', 'application/json');
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Allow', 'POST');
 res.setHeader('Date', new Date().toUTCString());




      // Enviar respuesta exitosa
      res.status(200).json({
        status: 200,
        data: {
          user_id: user.user_id,
          username: user.username,
          password: user.password,
          email: user.email,
          rol_id: user.rol_id,
          campus_id: user.campus_id,
          user_state: user.user_state,
          token: "genera_un_token_aqui", // token JWT (cuando se aprenda)
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
  },

};

module.exports = usuarioLoginController;



