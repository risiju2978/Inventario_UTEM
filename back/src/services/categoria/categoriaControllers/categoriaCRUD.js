require("dotenv").config();
const {db} =require("../../../../utils/utils.helpers");

const categoriaCRUD = {
  // Obtener todas las categorías
  //REVISADO Y FUNCIONANDO
  getCategorias: async (req, res) => {
    try {
      const sql = "SELECT * FROM categoria";
      const [categoria] = await db.promise().query(sql);
      res.status(200).json({ status: 200, data: categoria });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: "Error al obtener las categorías" });
    }
  },

  // Obtener una categoría por ID
  //REVISADO Y FUNCIONANDO
  getCategoriaById: async (req, res) => {
    try {
      const { categoria_id} = req.body;
      const sql = "SELECT * FROM categoria WHERE categoria_id = ?";
      const [categoria] = await db.promise().query(sql, [categoria_id]);

      if (categoria.length === 0) {
        return res.status(404).json({
             status: 404,
              error: "Categoría no encontrada" });
      }

      res.status(200).json({
         status: 200, 
         data: categoria[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 500, 
         error: "Error al obtener la categoría" });
    }
  },

  // Crear una nueva categoría
  //REVISADO Y FUNCIONANDO
  createCategoria: async (req, res) => {
    try {
      const { categoria } = req.body;
      const sql = "INSERT INTO categoria (categoria) VALUES (?)";
      const [result] = await db.promise().query(sql, [categoria]);
      const categoria_id = result.insertId;

      res.status(201).json({
        status: 201,
        data: { categoria_id, categoria },
        message: "Categoría creada correctamente",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: "Error al crear la categoría" });
    }
  },

  // Actualizar una categoría por ID
   //REVISADO Y FUNCIONANDO
  updateCategoria: async (req, res) => {
    try {
      
      const { categoria, categoria_id } = req.body;

      const sql = "UPDATE categoria SET categoria = ? WHERE categoria_id = ?";
      await db.promise().query(sql, [categoria,categoria_id]);

      res.status(200).json({
         status: 200, 
         message: "Categoría actualizada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
         status: 500,
          error: "Error al actualizar la categoría" });
    }
  },

  // Eliminar una categoría por ID
   //REVISADO Y FUNCIONANDO
  deleteCategoria: async (req, res) => {
    try {
      const {categoria_id } = req.body;
      const sql = "DELETE FROM categoria WHERE categoria_id = ?";
      await db.promise().query(sql, [categoria_id]);

      res.status(200).json({ 
        status: 200, 
        message: "Categoría eliminada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: 500,
         error: "Error al eliminar la categoría" });
    }
  },
};
module.exports =categoriaCRUD;
