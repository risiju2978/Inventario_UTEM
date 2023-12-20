//funcion para crear el articulo y una vez creado se obtinee id articulo 
//id articulo sirve para inyectar detalle articulo 


import { db } from "../utils/utils.helpers";

const artIncomeController = {
    incomeArticulo: async (req, res) => {
    try {
      const {
        anio,
        dimension,
        art_num,
        art_nombre,
        art_codigo,
        art_glosa,
        art_image_path,
        articulo_estado,
        categoria,
        campus,
        departament,
        office,
        id_usuario,
        
      } = req.body;

      const sql = `
        INSERT INTO articulo (
          anio,
          dimension,
          art_num,
          art_nombre,
          art_codigo,
          art_glosa,
          art_image_path,
          articulo_estado,
          categoria,
          campus,
          departament,
          office,
          id_usuario
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const result = await db.promise().query(sql, [
        anio,
        dimension,
        art_num,
        art_nombre,
        art_codigo,
        art_glosa,
        art_image_path,
        articulo_estado,
        categoria,
        campus,
        departament,
        office,
        id_usuario,
      ]);

      const articuloId = result.insertId;

      const detalleSql = `
        INSERT INTO articulo_detalle (nombres, anio, dimension, articulo_id) VALUES (?, ?, ?, ?)
      `;

      await db.promise().query(detalleSql, [
        detalle_articulo.nombres,
        detalle_articulo.anio,
        detalle_articulo.dimension,
        articuloId,
      ]);

      const responseData = {
        status: 200,
        data: {},
        message: "Artículo ingresado con éxito",
      };

      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Allow", "POST");
      res.setHeader("Date", new Date().toUTCString());

      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor al extraer datos",
      });
    }
  },
};

export default artIncomeController;












