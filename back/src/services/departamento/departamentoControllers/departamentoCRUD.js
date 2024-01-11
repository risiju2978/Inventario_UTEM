require("dotenv").config();
const {db} =require("../../../../utils/utils.helpers");

const departamentoCRUD = {
   //REVISADO Y FUNCIONANDO
  getAllDepartamentos: async (req, res) => {
    try {
      const [departamentos] = await db.promise().query('SELECT * FROM departamento');
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
   //REVISADO Y FUNCIONANDO
  getDepartamentoById: async (req, res) => {
    try {
      const { departament_id} = req.body;
      const [departamento] = await db.promise().query('SELECT * FROM departamento WHERE departament_id = ?', [departament_id]);

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
 //REVISADO Y FUNCIONANDO
  createDepartamento: async (req, res) => {
    try {
      const { departament, campus_id } = req.body;
      const [result] = await db.promise().query('INSERT INTO departamento (departament, campus_id) VALUES (?,?)', [ departament, campus_id]);

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
 //REVISADO Y FUNCIONANDO
  updateDepartamento: async (req, res) => {
    try {
      
      const {  departament, campus_id } = req.body;

      const [result] = await db.promise().query('UPDATE departamento SET  departament = ?  WHERE campus_id = ?', [ departament, campus_id]);

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
 //REVISADO Y FUNCIONANDO
  deleteDepartamento: async (req, res) => {
    try {
      const { departament_id } = req.body;
      const [result] = await db.promise().query('DELETE FROM departamento WHERE departament_id = ?', [departament_id]);

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

module.exports = departamentoCRUD;