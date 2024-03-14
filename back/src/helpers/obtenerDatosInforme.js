const { db } = require("../../utils/utils.helpers");

async function obtenerDatosInforme(
  fechaInicio,
  fechaFin,
  categoria_id,
  office_id,
  campus_id,
  departament_id,
  id_articulo_baja
) {


  const sql = 'SELECT * FROM `v_infogenerator` WHERE `categoria_id` = ? AND `office_id` = ? AND `campus_id` = ? AND `departament_id` = ?';

  const combo = [
    categoria_id,
    office_id,
    campus_id,
    departament_id,
  ];

  //hacer validacion del rows y ver qwue tenga contenido  con su largo
  // Ejecutar la consulta
  const [rows, fields] = await db.promise().execute(sql, combo);

  console.log("rows:", rows);
  console.log("fields:", fields);

  // if (vistaData.length !== 0) {
  //   return vistaData;
  // } else if (rows.length !== 0) {
  //   return rows;
  // } else {
  //   return false;
  // }
  if (rows.length !== 0) {
    return rows;
  } else {
    return false;
  }
}

module.exports = obtenerDatosInforme;
