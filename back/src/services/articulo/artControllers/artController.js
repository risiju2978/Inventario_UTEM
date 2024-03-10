require("dotenv").config();
const { db } = require("../../../../utils/utils.helpers");

const fs = require("fs");
const path = require("path");
const { request } = require("express");

const artController = {
  //##################################################################################
  editArticulo: async (req, res) => {
    try {
      const {
        id_articulo,
        anio,
        dimension,
        art_num,
        art_nombre,
        art_codigo,
        art_glosa,
      } = req.body;

      const imgArticulo = req.file;

      db.beginTransaction((error) => {
        if (error) {
          throw error;
        }

        // Validar campos obligatorios para editar en la tabla articulo
        if (
          !id_articulo ||
          !anio ||
          !dimension ||
          !art_num ||
          !art_nombre ||
          !art_codigo ||
          !art_glosa ||
          !imgArticulo
        ) {
          return res.status(400).json({
            status: 400,
            error:
              "Faltan campos obligatorios para editar en la tabla articulo",
          });
        }
            // Actualizar en articulo_detalle
            const sqlArticuloDetalle = `
                UPDATE articulo_detalle
                SET
                  anio = ?,
                  dimension = ?,
                  art_num = ?,
                  art_nombre = ?,
                  art_codigo = ?,
                  art_glosa = ?,
                  art_image_path = ?
                WHERE id_articulo = ?
              `;

            const dataUpdateArticuloDetalle = [
              anio,
              dimension,
              art_num,
              art_nombre,
              art_codigo,
              art_glosa,
              imgArticulo.path,
              id_articulo,
            ];

            // Actualizar el detalle del artículo
            db.query(
              sqlArticuloDetalle,
              dataUpdateArticuloDetalle,
              (error, result, field) => {
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
                    message: "Artículo editado correctamente",
                  });
                });
              }
            );
          
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor al extraer datos",
      });
    }
  },

  //##################################################################################
  //REVISADO Y FUNCIONANDO
  bajaArticulo: async (req, res) => {
    try {
      const { id_articulo, motivo_baja, autorizacion, fecha_baja } = req.body;

      // Validar campos obligatorios
      if (!id_articulo || !motivo_baja || !autorizacion || !fecha_baja) {
        return res.status(400).json({
          status: 400,
          error: "Faltan campos obligatorios para dar de baja el artículo",
        });
      }
      // hacer query con id_articulo donde muestre el estado del articulo si ests activo no hace nada si no lo hace
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

          const dataInsertArticuloBaja = [
            id_articulo,
            fecha_baja,
            motivo_baja,
            autorizacion,
          ];
          await db.promise().query(sqlArticuloBaja, dataInsertArticuloBaja);

          // Actualizar el estado del artículo en la tabla articulo a "dado de baja"
          const sqlActualizarArticulo = `
          UPDATE articulo
          SET articulo_estado_id = 1
          WHERE id_articulo = ?
        `;

          const [result] = await db
            .promise()
            .query(sqlActualizarArticulo, [id_articulo]);

          // Verificar si se actualizó algún registro
          if (result.affectedRows === 0) {
            return res.status(404).json({
              status: 404,
              error: "No se encontró el artículo para dar de baja",
            });
          }

          // Si la actualización tiene éxito, hago un commit
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
        } catch (error) {
          // Rollback en caso de error
          await db.promise().rollback();
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

  //##################################################################################
  //agregar articulo
  //REVISADO Y FUNCIONANDO

  incomeArticulo: async (req = request, res) => {
    try {
      const {
        usuario_id,
        anio,
        dimension,
        art_num,
        art_nombre,
        art_codigo,
        art_glosa,
        articulo_estado_id,
        categoria_id,
        office_id,
      } = req.body;

      const imgArticulo = req.file;
      console.log(req.file)


      // Validación de campos obligatorios para insertar en la tabla articulo
      if (!articulo_estado_id || !categoria_id || !usuario_id || !office_id || !imgArticulo) {
        return res.status(400).json({
          status: 400,
          error:
            "Faltan campos obligatorios para insertar en la tabla articulo",
        });
      }

      // Iniciar transacción
      db.beginTransaction(async (error) => {
        if (error) {
          throw error;
        }

        try {
          // 1. Insertar en la tabla articulo
          const sqlArticulo = `
          INSERT INTO articulo (
            articulo_estado_id,
            categoria_id,
            usuario_id,
            office_id
          ) VALUES (?, ?, ?, ?)`;

          const dataInsertArticulo = [
            articulo_estado_id,
            categoria_id,
            usuario_id,
            office_id,
          ];

          const [resultArticulo] = await db
            .promise()
            .query(sqlArticulo, dataInsertArticulo);

          const id_articulo = resultArticulo.insertId;

          // 3. Insertar en la tabla articulo_detalle
          const sqlArticuloDetalle = `
            INSERT INTO articulo_detalle (
              id_articulo,
              anio,
              dimension,
              art_num,
              art_nombre,
              art_codigo,
              art_ingreso,
              art_glosa,
              art_image_path
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          const dataInsertArticuloDetalle = [
            id_articulo,
            anio,
            dimension,
            art_num,
            art_nombre,
            art_codigo,
            (art_ingreso = new Date()),
            art_glosa,
            (art_image_path = imgArticulo.path), // Guardamos la ruta del archivo en la base de datos
          ];

          await db
            .promise()
            .query(sqlArticuloDetalle, dataInsertArticuloDetalle);

          // Hacer commit si todo fue exitoso
          db.commit((error) => {
            if (error) {
              return db.rollback(() => {
                console.log("error en el commit");
                throw new Error();
              });
            }

            res.status(200).json({
              status: 200,
              message: "Artículo creado correctamente",
            });
          });
        } catch (error) {
          // Si hay un error, hacer rollback
          console.log("error en la transacción", error);
          db.rollback(() => {
            throw new Error();
          });
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
//########################################################################################

module.exports = artController;
