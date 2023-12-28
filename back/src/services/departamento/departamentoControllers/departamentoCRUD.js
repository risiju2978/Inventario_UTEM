import { db } from '../utils/utils.helpers';

const departamentoCRUD = {
  getAllDepartamentos: async (req, res) => {
    try {
      const [departamentos] = await db.query('SELECT * FROM departamento');
      res.status(200).json({ 
        status: 200,
         data: departamentos
         });
    } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 500, 
         error: 'Error al obtener los departamentos'
         });
    }
  },

  getDepartamentoById: async (req, res) => {
    try {
      const { departamento_id } = req.params;
      const [departamento] = await db.query('SELECT * FROM departamento WHERE departamento_id = ?', [departamento_id]);

      if (departamento.length === 0) {
        return res.status(404).json({ status: 404,
             error: 'Departamento no encontrado' 
            });
      }

      res.status(200).json({
         status: 200,
          data: departamento[0] 
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 500,
          error: 'Error al obtener el departamento'
         });
    }
  },

  createDepartamento: async (req, res) => {
    try {
      const { departamento, campus_id } = req.body;
      const [result] = await db.query('INSERT INTO departamento (departamento, campus_id) VALUES (?, ?)', [departamento, campus_id]);

      res.status(201).json({
         status: 201,
          message: 'Departamento creado correctamente',
           departamento_id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: 500, 
        error: 'Error al crear el departamento' 
    });
    }
  },

  updateDepartamento: async (req, res) => {
    try {
      const { departamento_id } = req.params;
      const { departamento, campus_id } = req.body;

      const [result] = await db.query('UPDATE departamento SET departamento = ?, campus_id = ? WHERE departamento_id = ?', [departamento, campus_id, departamento_id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
             status: 404, 
             error: 'Departamento no encontrado' 
            });
      }

      res.status(200).json({
         status: 200,
          message: 'Departamento actualizado correctamente'
         });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: 500, 
        error: 'Error al actualizar el departamento' 
    });
    }
  },

  deleteDepartamento: async (req, res) => {
    try {
      const { departamento_id } = req.params;
      const [result] = await db.query('DELETE FROM departamento WHERE departamento_id = ?', [departamento_id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
             status: 404, 
             error: 'Departamento no encontrado'
             });
      }

      res.status(200).json({ 
        status: 200, 
        message: 'Departamento eliminado correctamente' 
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 500,
          error: 'Error al eliminar el departamento'
         });
    }
  },
};

export default departamentoCRUD;