

import PDFDocument from 'pdfkit';
import mysql from 'mysql2/promise';
import { db } from '../utils/utils.helpers';

const articuloController = {
  generarInforme: async (req, res) => {
    try {
      //que deberia desesctructurar?
      const {anio,state, } = req.body;

      // Crear una conexión a la base de datos
      const connection = await mysql.createConnection(db);

      // Lógica para construir la consulta SQL 
      //aplicar filtros una vez sepa?
      //armar una vista **
      /*basado 
      const = 

      */
      const sql = `
        SELECT * FROM articulo_detalle
        WHERE
          
      `;

      // Ejecutar la consulta
      //creo que deberia venir con un objeto pero no se darle forma
      const [rows] = await connection.execute(sql);

      // Crear un nuevo documento PDF
      const doc = new PDFDocument();
      const fileName = 'documento-01.pdf';


      // agregar contenido al documento PDF según los datos obtenidos
      rows.forEach((row) => {
        // Agregar datos al PDF:(averiguar si funciona)
        doc.text(`ID: ${row.id_articulo_detalle}`);
        doc.text(`Nombre: ${row.art_nombre}`);
        doc.text(`Código: ${row.art_codigo}`);
        //continuar si es que esta correcto
        doc.moveDown();
      });

      // Finalizar el documento y convertirlo a base64
      const dataStream = doc.pipe(res);
      doc.end();
      const base64PDF = Buffer.from(dataStream.read()).toString('base64');

      // Cerrar la conexión a la base de datos
      await connection.end();

      res.status(200).json({
        status: 200,
        data: {
          datastream: base64PDF,
          file_name: fileName,
          'content-type': 'application/pdf',
        },
        message: 'Documento generado con éxito',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: 'Error al generar el informe',
      });
    }
  },
};

export default articuloController;











