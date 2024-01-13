

require("dotenv").config();
const { db } = require("../../../../utils/utils.helpers");
const PDFDocument = require('pdfkit');
const mysql = require("mysql2/promise")
const Excel = require('excel4node');

const infGeneratorController = {
  generarInforme: async (req, res) => {
    try {
      const { art_ingreso, categoria_id, office_id, campus_id, departament_id, tipo_formato, id_articulo_baja } = req.body;

      // VALIDACIONES

        
      // Validación de art_ingreso como rango de fechas válido
      const [fechaInicio, fechaFin] = art_ingreso;
      if (!fechaInicio || !fechaFin || fechaInicio > fechaFin) {
        return res.status(400).json({
          status: 400,
          error: "Rango de fechas de art_ingreso no válido",
        });
      }

     
      if (categoria_id === null || isNaN(categoria_id)) {
        return res.status(400).json({
          status: 400,
          error: "categoria_id no puede ser nulo y debe ser un número",
        });
      }

      if (office_id === null || isNaN(office_id)) {
        return res.status(400).json({
          status: 400,
          error: "office_id no puede ser nulo y debe ser un número",
        });
      }

      if (campus_id === null || isNaN(campus_id)) {
        return res.status(400).json({
          status: 400,
          error: "campus_id no puede ser nulo y debe ser un número",
        });
      }

      if (departament_id === null || isNaN(departament_id)) {
        return res.status(400).json({
          status: 400,
          error: "departament_id no puede ser nulo y debe ser un número",
        });
      }

      if (tipo_formato !== "PDF" && tipo_formato !== "XLS") {
        return res.status(400).json({
          status: 400,
          error: 'El tipo de formato debe ser "PDF" o "XLS"',
        });
      }

      if (id_articulo_baja === null|| id_articulo_baja === undefined|| isNaN(id_articulo_baja) ) {
        return res.status(400).json({
          status: 400,
          error: "id_articulo_baja debe ser un número ",
        });
      }

      // Crear una conexión a la base de datos
      const connection = await mysql.createConnection(db);

      // Lógica para construir la consulta SQL
      const sql = `
        SELECT * FROM infGenerator
        WHERE
          art_ingreso >= ? AND art_ingreso <= ?
          AND (categoria_id = ?)
          AND (office_id = ? )
          AND (campus_id = ? )
          AND (departament_id = ? )
          AND (tipo_formato = ?)
          AND ( id_articulo_baja = ?)
      `;
      const  combo =[
        fechaInicio, 
        fechaFin, 
        categoria_id, 
         office_id,
         campus_id, 
         departament_id, 
         tipo_formato,
         id_articulo_baja, 
         ]


      // Ejecutar la consulta
      const [rows] = await connection.execute(sql,combo );



      //  código para generar el informe
      const doc = tipo_formato === 'PDF' ? new PDFDocument() : null;
      const wb = tipo_formato === 'XLS' ? new Excel.Workbook() : null;
      const ws = wb ? wb.addWorksheet('Informe') : null;
      const fileName = `documento-${new Date().toISOString()}.${tipo_formato.toLowerCase()}`;

      // Agregar contenido al documento según los datos obtenidos
      //todo esto debe estar dentro de la vista en la base de datos
      //codigo en caso pdf
      rows.forEach((row) => {
        if (doc) {
          doc.text(`ID: ${row.id_articulo_detalle}`);
          doc.text(`Nombre: ${row.art_nombre}`);
          doc.text(`Código: ${row.art_codigo}`);
          doc.moveDown();
        }
        //codigo en caso sea xls
        if (ws) {
          ws.cell(row.id_articulo_detalle + 1, 1).string(`ID: ${row.id_articulo_detalle}`);
          ws.cell(row.id_articulo_detalle + 1, 2).string(`Nombre: ${row.art_nombre}`);
          ws.cell(row.id_articulo_detalle + 1, 3).string(`Código: ${row.art_codigo}`);
        }
      });

    // Finalizar el documento y guardar en disco
if (doc) {
  const pdfFilePath = `./${fileName}`;
  const pdfStream = fs.createWriteStream(pdfFilePath);

  doc.pipe(pdfStream);
  doc.end();

  // Esperar a que la escritura del archivo PDF se complete
  pdfStream.on('finish', () => {
    res.status(200).json({
      status: 200,
      data: {
        file_path: pdfFilePath,
        file_name: fileName,
        'content-type': 'application/pdf',
      },
      message: 'Documento PDF generado y guardado con éxito',
    });
  });
} else {
  res.status(400).json({
    status: 400,
    error: 'Tipo de formato no compatible. Se espera "PDF" o "XLS".',
  });
}

      // Guardar el archivo XLS en disco
      if (wb) {
        const xlsFilePath = `./${fileName}`;
        await wb.write(xlsFilePath);
        res.status(200).json({
          status: 200,
          data: {
            file_path: xlsFilePath,
            file_name: fileName,
            'content-type': 'application/vnd.ms-excel',
          },
          message: 'Documento XLS generado con éxito',
        });
      }

      // Cerrar la conexión a la base de datos
      await connection.end();

    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: 'Error al generar el informe',
      });
    }
  },
};

module.exports = infGeneratorController;