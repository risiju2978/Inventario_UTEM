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
  //reemplazar asterisco por los cmpos en concreto
  // Lógica para construir la consulta SQL
  const sql = `
        SELECT * FROM v_infogenerator
        WHERE (categoria_id = ?)
          AND (office_id = ? )
          AND (campus_id = ? )
          AND (departament_id = ? )
          AND ( id_articulo_baja = ?)
      `;
  const combo = [
    // fechaInicio,
    // fechaFin,
    categoria_id,
    office_id,
    campus_id,
    departament_id,
    id_articulo_baja,
  ];

  //hacer validacion del rows y ver qwue tenga contenido  con su largo
  // Ejecutar la consulta
  const [vistaData] = await db.promise().query('CALL Read_v_infogenerator()');
  const [rows] = await db.promise().query(sql, combo);

  if (vistaData.length === 0) {
    return false;
  } else {
    return vistaData;
  }
}

module.exports = obtenerDatosInforme;
