require("dotenv").config();
const {db} =require("../../../../utils/utils.helpers");

const articuloEstadoCRUD = {

   //REVISADO Y FUNCIONANDO
  getArticuloEstadoById: async (req, res) => {
    try {
      const {articulo_estado_id} = req.body;
      const [rows] = await db.promise().query("SELECT * FROM articulo_estado WHERE articulo_estado_id = ?", [articulo_estado_id]);

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
   //REVISADO Y FUNCIONANDO
  createArticuloEstado: async (req, res) => {
    try {
      const { articulo_estado } = req.body;
      const [result] = await db.promise().query("INSERT INTO articulo_estado (articulo_estado) VALUES (?)", [articulo_estado]);

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
   //REVISADO Y FUNCIONANDO
  updateArticuloEstado: async (req, res) => {
    try {
      
      const { articulo_estado, articulo_estado_id } = req.body;

      const [result] = await db.promise().query("UPDATE articulo_estado SET articulo_estado = ? WHERE articulo_estado_id = ?", [articulo_estado, articulo_estado_id]);

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
   //REVISADO Y FUNCIONANDO
  deleteArticuloEstado: async (req, res) => {
    try {
      const {articulo_estado_id } = req.body;
      const [result] = await db.promise().query("DELETE FROM articulo_estado WHERE articulo_estado_id = ?", [articulo_estado_id]);

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

module.exports = articuloEstadoCRUD;