
import { db } from "../utils/utils.helpers";

const articuloEstadoCRUD = {


  getArticuloEstadoById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await db.query("SELECT * FROM articulo_estado WHERE articulo_estado_id = ?", [id]);

      if (rows.length === 0) {
        return res.status(404).json({
             status: 404,
              error: "Estado de artículo no encontrado" });
      }

      res.status(200).json({
         status: 200, 
        data: rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: "Error al obtener el estado de artículo por ID" });
    }
  },

  createArticuloEstado: async (req, res) => {
    try {
      const { articulo_estado } = req.body;
      const [result] = await db.query("INSERT INTO articulo_estado (articulo_estado) VALUES (?)", [articulo_estado]);

      res.status(201).json({ 
        status: 201, 
        data: { id: result.insertId },
         message: "Estado de artículo creado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 500,
         error: "Error al crear el estado de artículo" });
    }
  },

  updateArticuloEstado: async (req, res) => {
    try {
      const { id} = req.params;
      const { articulo_estado } = req.body;

      const [result] = await db.query("UPDATE articulo_estado SET articulo_estado = ? WHERE articulo_estado_id = ?", [articulo_estado,  id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ 
            status: 404, 
            error: "Estado de artículo no encontrado" });
      }

      res.status(200).json({ 
        status: 200,
         message: "Estado de artículo actualizado correctamente" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: 500,
         error: "Error al actualizar el estado de artículo" });
    }
  },

  deleteArticuloEstado: async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await db.query("DELETE FROM articulo_estado WHERE articulo_estado_id = ?", [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
             status: 404,
              error: "Estado de artículo no encontrado" });
      }

      res.status(200).json({ 
        status: 200, 
        message: "Estado de artículo eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: 500, 
        error: "Error al eliminar el estado de artículo" });
    }
  },
};

export default articuloEstadoCRUD;