require("dotenv").config();
const {db} =require("../../../../utils/utils.helpers");

const sedeController = {
   //REVISADO Y FUNCIONANDO
  getAllSedes: async (req, res) => {
    try {
      const [sedes] = await db.promise().query('SELECT * FROM sede');
      res.status(200).json({
         status: 200,
          data: sedes 
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 500, 
         error: 'Error al obtener las sedes'
         });
    }
  },
   //REVISADO Y FUNCIONANDO
  getSedeById: async (req, res) => {
    try {
      const { campus_id } = req.body;
      const [sede] = await db.promise().query('SELECT * FROM sede WHERE campus_id = ?', [campus_id]);

      if (!sede.length) {
        return res.status(404).json({ 
            status: 404,
             error: 'Sede no encontrada' 
            });
      }

      res.status(200).json({ 
        status: 200,
         data: sede[0] 
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 500, 
         error: 'Error al obtener la sede' 
        });
    }
  },
   //REVISADO Y FUNCIONANDO
  createSede: async (req, res) => {
    try {
      const {  campus } = req.body;
      const [result] = await db.promise().query('INSERT INTO sede ( campus) VALUES ( ?)', [ campus]);

      res.status(201).json({ 
        status: 201,
         message: 'Sede creada correctamente',
          data: { sede_id: result.insertId }
         });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: 500, 
        error: 'Error al crear la sede' 
    });
    }
  },
   //REVISADO Y FUNCIONANDO
  updateSede: async (req, res) => {
    try {
      
      const {  campus, campus_id } = req.body;
      const [result] = await db.promise().query('UPDATE sede SET  campus = ? WHERE campus_id = ?', [ campus, campus_id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ 
            status: 404,
             error: 'Sede no encontrada'
             });
      }

      res.status(200).json({ 
        status: 200, 
        message: 'Sede actualizada correctamente'
     });
    } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 500,
          error: 'Error al actualizar la sede'
        });
    }
  },
   //REVISADO Y FUNCIONANDO
  deleteSede: async (req, res) => {
    try {
      const { campus_id } = req.body;
      const [result] = await db.promise().query('DELETE FROM sede WHERE campus_id = ?', [campus_id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ 
            status: 404,
             error: 'Sede no encontrada'
             });
      }

      res.status(200).json({
         status: 200,
         message: 'Sede eliminada correctamente'
         });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: 500,
         error: 'Error al eliminar la sede'
         });
    }
  },
};

module.exports = sedeController;