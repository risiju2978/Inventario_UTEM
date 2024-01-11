const { db } = require("../../../../utils/utils.helpers");
require("dotenv").config();



const oficinaController = {

       //REVISADO Y FUNCIONANDO
  getAllOficinas: async (req, res) => {
    try {
      const [oficinas] = await db.promise().query('SELECT * FROM oficina');
      res.status(200).json({
        status: 200,
        data: oficinas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: 'Error al obtener las oficinas',
      });
    }
  },
 //REVISADO Y FUNCIONANDO
  getOficinaById: async (req, res) => {
    try {
      const { office_id } = req.body;
      const [oficina] = await db.promise().query('SELECT * FROM oficina WHERE office_id = ?', [office_id]);

      if (!oficina.length) {
        return res.status(404).json({
          status: 404,
          error: 'Oficina no encontrada',
        });
      }

      res.status(200).json({
        status: 200,
        data: oficina[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: 'Error al obtener la oficina',
      });
    }
  },
 //REVISADO Y FUNCIONANDO
  createOficina: async (req, res) => {
    try {
      const { departament_id, office } = req.body;
      const [result] = await db.promise().query('INSERT INTO oficina (departament_id, office) VALUES (?, ?)', [departament_id, office]);

      res.status(201).json({
        status: 201,
        message: 'Oficina creada correctamente',
        data: { office_id: result.insertId },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: 'Error al crear la oficina',
      });
    }
  },
 //REVISADO Y FUNCIONANDO
  updateOficina: async (req, res) => {
    try {
      const { departament_id, office, office_id } = req.body;
      const [result] = await db.promise().query('UPDATE oficina SET departament_id = ?, office = ? WHERE office_id = ?', [departament_id, office, office_id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Oficina no encontrada',
        });
      }

      res.status(200).json({
        status: 200,
        message: 'Oficina actualizada correctamente',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: 'Error al actualizar la oficina',
      });
    }
  },
 //REVISADO Y FUNCIONANDO
  deleteOficina: async (req, res) => {
    try {
      const { office_id } = req.body;
      const [result] = await db.promise().query('DELETE FROM oficina WHERE office_id = ?', [office_id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Oficina no encontrada',
        });
      }

      res.status(200).json({
        status: 200,
        message: 'Oficina eliminada correctamente',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: 'Error al eliminar la oficina',
      });
    }
  },
};

module.exports = oficinaController;