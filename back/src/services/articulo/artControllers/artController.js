
require("dotenv").config();
const {db} =require("../../../../utils/utils.helpers");



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
            art_ingreso,
            art_codigo,
            art_glosa,
            art_image_path,
            articulo_estado,
            categoria,
            sede,
            departamento,
            oficina,
          } = req.body;
    
          db.beginTransaction((error) => {
            if (error) {
              throw error;
            }
    
            // Validar campos obligatorios para editar en la tabla articulo
            if (!id_articulo || !anio || !dimension || !art_num || !art_nombre || !art_ingreso || !art_codigo || !art_glosa || !art_image_path || !articulo_estado || !categoria || !sede || !departamento || !oficina) {
              return res.status(400).json({
                status: 400,
                error: "Faltan campos obligatorios para editar en la tabla articulo",
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
                  art_ingreso = ?,
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
                art_ingreso,
                art_codigo,
                art_glosa,
                art_image_path,
                id_articulo,
              ];
    
              // Actualizar el detalle del artículo
              db.query(sqlArticuloDetalle, dataUpdateArticuloDetalle, (error, result, field) => {
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
              });
            
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
//##################################################################################
//agregar articulo
  incomeArticulo: async (req, res) => {
    try {
      // recupero datos del front
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
        office,
        id_usuario,
      } = req.body;

      db.beginTransaction((error) => {
        if (error) {
          throw error;
        }

      // Validacion de  campos obligatorios para insertar en la tabla articulo
      if (!articulo_estado || !categoria || !id_usuario || !office) {
        return res.status(400).json({
          status: 400,
          error: "Faltan campos obligatorios para insertar en la tabla articulo",
        });
      }

        // 1. insertar en articulo;
        const sqlArticulo = `
          INSERT INTO articulo (
            articulo_estado_id,
            categoria_id,
            usaurio_id,
            oficina_id
          ) VALUES (?, ?, ?, ?) 
        `;

        // 2. obtener articulo_id
      
        const dataInsertArticulo = {
          articulo_estado,
          categoria,
          id_usuario,
          office,
        };

        // inserto el articulo
        db.query(sqlArticulo, dataInsertArticulo, (error, result, field) => {
          // si falla el insert
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          // si esto inserta recupero el id del articulo creado
          const id_articulo = result.insertId;

          // procesar el binary file de la imagen,
          // guardarlo en disco y obtener la ruta fisica del archivo
          // que se pasa en el parametro de art_image_path ( crear una funcion para eso )
 
   // Función para convertir imagen binaria a base64
   function convertirABase64(art_image_path) {
    const imageBuffer = Buffer.from(art_image_path, 'binary');
    return imageBuffer.toString('base64');
  }


 const art_image_path_base64 = convertirABase64(art_image_path); // Convierte la imagen binaria a base64
          // 3. insertar detalle articulo usando articulo_id anterior
          const sqlArticuloDetalle = `
                      INSERT INTO articulo_detalle (
                        id_articulo,
                        anio,
                        dimension,
                        art_num,
                        art_nombre,
                        art_ingreso,
                        art_codigo,
                        art_glosa,
                        art_image_path
                      ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)
                    `;

          // objeto de articulo_detalle
          const dataInsertArticuloDetalle = {
            id_articulo,
            anio,
            dimension,
            art_num,
            art_nombre,
            art_ingreso,
            art_codigo,
            art_glosa,
            art_image_path: art_image_path_base64, // Almacena la imagen en formato base64 en la base de datos
          };

          // insert el detalle del articulo
          db.query(
            sqlArticuloDetalle,
            dataInsertArticuloDetalle,
            (error, result, field) => {
              // si falla el insert
              if (error) {
                return db.rollback(() => {
                  throw error;
                });
              }

            

              // si esta ok hago un commit
              db.commit((error) => {
                if (error) {
                  return db.rollback(() => {
                    throw error;
                  });
                }

                res.status(200).json({
                  status: 200,
                  message: "Artículo creado correctamente",
                });
              });
            }
          );
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error interno del servidor al extraer datos",
      });
    }
  },
//########################################################################################





    };
   
    
   module.exports = artController;
  
  
  
  















