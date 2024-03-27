const { db } = require("../../../../utils/utils.helpers");
require("dotenv").config();

const vistaController = {
  readVista: async (req, res) => {
    try {
      const [vistaData] = await db.promise().query('CALL Read_v_infogenerator()');
      res.status(200).json({
        status: 200,
        data: vistaData[0], // Devuelve los resultados del SP (en el primer índice del array)
      });
    } catch (error) {
      console.error('Error al llamar al SP Read_v_infogenerator:', error);
      res.status(500).json({
        status: 500,
        error: 'Error al obtener datos de la vista',
      });
    }
  },
};

module.exports = vistaController;
