import { db } from "../utils/utils.helpers";

const artBajaController = {
  bajaArticulo: async (req, res) => {
    try {
      const { id_articulo,articulo_estado_id, fecha_baja, motivo_baja, autorizacion } = req.body;

      // Validar campos obligatorios
      if (!id_articulo || !fecha_baja || !motivo_baja || !autorizacion) {
        return res.status(400).json({
          status: 400,
          error: "Faltan campos obligatorios para dar de baja el artículo",
        });
      }

      db.beginTransaction(async (error) => {
        if (error) {
          throw error;
        }

        try {
          // Actualizar la tabla articulo_baja
          const sqlArticuloBaja = `
            INSERT INTO articulo_baja (id_articulo, fecha_baja, motivo_baja, autorizacion)
            VALUES (?, ?, ?, ?)
          `;

          const dataInsertArticuloBaja = {id_articulo, fecha_baja, motivo_baja, autorizacion};
          await db.query(sqlArticuloBaja, dataInsertArticuloBaja);

          // Actualizar el estado del artículo en la tabla articulo a "dado de baja"
          const sqlActualizarArticulo = `
            UPDATE articulo_estado
            SET articulo_estado_id = ?, articulo_estado = 0
            WHERE id_articulo = ?
          `;

          await db.query(sqlActualizarArticulo, [articulo_estado_id, id_articulo], (error, result, field) => {
            // si falla la actualización
            if (error) {
              return db.rollback(() => {
                throw error;
              });
            }

            // si la actualización tiene éxito, hago un commit
            db.commit((error) => {
              if (error) {
                return db.rollback(() => {
                  throw error;
                });
              }

              res.status(200).json({
                status: 200,
                message: "Artículo dado de baja con éxito",
              });
            });
          });
        } catch (error) {
          // Rollback en caso de error
          await db.rollback();
          throw error;
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor al extraer datos",
      });
    }
  },
};

export default artBajaController;