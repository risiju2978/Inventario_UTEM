const obtenerDatosInforme = async (
  fechaInicio,
  fechaFin,
  categoria_id,
  office_id,
  campus_id,
  departament_id,
  id_articulo_baja
) => {
  //reemplazar asterisco por los cmpos en concreto
  // Lógica para construir la consulta SQL
  const sql = `
        SELECT * FROM v_infogenerator
        WHERE
          art_ingreso >= ? AND art_ingreso <= ?
          AND (categoria_id = ?)
          AND (office_id = ? )
          AND (campus_id = ? )
          AND (departament_id = ? )
          AND ( id_articulo_baja = ?)
      `;
  const combo = [
    fechaInicio,
    fechaFin,
    categoria_id,
    office_id,
    campus_id,
    departament_id,
    id_articulo_baja,
  ];

  //hacer validacion del rows y ver qwue tenga contenido  con su largo
  // Ejecutar la consulta
  const [rows] = await db.promise().query(sql, combo);

  if (rows.length === 0) {
    return false;
  } else {
    return rows;
  }
};

module.exports = obtenerDatosInforme;
