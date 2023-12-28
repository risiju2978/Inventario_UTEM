import { db } from '../utils/utils.helpers';

const sedeController = {
  getAllSedes: async (req, res) => {
    try {
      const [sedes] = await db.query('SELECT * FROM sede');
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

  getSedeById: async (req, res) => {
    try {
      const { sede_id } = req.params;
      const [sede] = await db.query('SELECT * FROM sede WHERE sede_id = ?', [sede_id]);

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

  createSede: async (req, res) => {
    try {
      const { campus_id, campus } = req.body;
      const [result] = await db.query('INSERT INTO sede (campus_id, campus) VALUES (?, ?)', [campus_id, campus]);

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

  updateSede: async (req, res) => {
    try {
      
      const {  campus, campus_id } = req.body;
      const [result] = await db.query('UPDATE sede SET  campus = ? WHERE campus_id = ?', [ campus, campus_id]);

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

  deleteSede: async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await db.query('DELETE FROM sede WHERE sede_id = ?', [id]);

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

export default sedeController;