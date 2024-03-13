require("dotenv").config();
const { db } = require("../../../../utils/utils.helpers");
const PDFDocument = require("pdfkit");
const mysql = require("mysql2/promise");
const Excel = require("excel4node");
const fs = require("fs");
const path = require("path");
const  buildPDF  = require("../../../../utils/utils.pdfBuild");
const obtenerDatosInforme = require("../../../helpers/obtenerDatosInforme");

const infGeneratorController = {
  generarInforme: async (req, res) => {
    try {
      const {
        tipo_formato,
        fecha_inicio,
        fecha_fin,
        categoria_id,
        office_id,
        campus_id,
        departament_id,
        id_articulo_baja,
      } = req.body;
      console.log(req.body);

      // VALIDACIONES


      if (!fecha_inicio || !fecha_fin || fecha_inicio > fecha_fin) {
        return res.status(400).json({
          status: 400,
          error: "Rango de fechas de art_ingreso no válido",
        });
      }

      if (categoria_id === undefined || isNaN(categoria_id)) {
        return res.status(400).json({
          status: 400,
          error: "categoria_id no puede ser nulo y debe ser un número",
        });
      }

      if (office_id === undefined || isNaN(office_id)) {
        return res.status(400).json({
          status: 400,
          error: "office_id no puede ser nulo y debe ser un número",
        });
      }

      if (campus_id === undefined || isNaN(campus_id)) {
        return res.status(400).json({
          status: 400,
          error: "campus_id no puede ser nulo y debe ser un número",
        });
      }

      if (departament_id === undefined || isNaN(departament_id)) {
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

      if (id_articulo_baja === undefined || isNaN(id_articulo_baja)) {
        return res.status(400).json({
          status: 400,
          error: "id_articulo_baja debe ser un número ",
        });
      }

      const wb = tipo_formato === "XLS" ? new Excel.Workbook() : null;
      const ws = wb ? wb.addWorksheet("Informe") : null;

      const fileName = `documento-${new Date().toISOString()}.${tipo_formato.toLowerCase()}`;

      const datos = await obtenerDatosInforme(fecha_inicio,
        fecha_fin,
        categoria_id,
        office_id,
        campus_id,
        departament_id,
        id_articulo_baja,)

    try {
      if (tipo_formato === "PDF") {
        const stream = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=invoice.pdf",
        });
      
        buildPDF(
          (data) => stream.write(data),
          () => stream.end(),
          datos
        );
        return;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al generar el informe");
    }
      
      // rows.forEach((row) => {
      //   if (doc) {
      //     doc.text(`ID: ${row.id_articulo_detalle}`);
      //     doc.text(`Nombre: ${row.art_nombre}`);
      //     doc.text(`Código: ${row.art_codigo}`);
      //     doc.moveDown();
      //   }
      //   //codigo en caso sea xls
      //   if (ws) {
      //     ws.cell(row.id_articulo_detalle + 1, 1).string(
      //       `ID: ${row.id_articulo_detalle}`
      //     );
      //     ws.cell(row.id_articulo_detalle + 1, 2).string(
      //       `Nombre: ${row.art_nombre}`
      //     );
      //     ws.cell(row.id_articulo_detalle + 1, 3).string(
      //       `Código: ${row.art_codigo}`
      //     );
      //   }
      // });

      // Finalizar el documento y guardar en disco
      if (doc) {
        const dirPath = path.join(process.cwd(), "/uploads/pdf/");
        console.log("dirPath:", dirPath);

        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        const pdfFilePath = `${dirPath}/${fileName}`;
        const pdfStream = fs.createWriteStream(pdfFilePath);

        pdfStream.on("error", (err) => {
          console.error("Error al escribir en el archivo:", err);
        })
        
      } else {
        return res.status(400).json({
          status: 400,
          error: 'Tipo de formato no compatible. Se espera "PDF" o "XLS".',
        });
      }

      // // Guardar el archivo XLS en disco
      // if (wb) {
      //   const xlsFilePath = `./${fileName}`;
      //   await wb.write(xlsFilePath);
      //   res.status(200).json({
      //     status: 200,
      //     data: {
      //       file_path: xlsFilePath,
      //       file_name: fileName,
      //       "content-type": "application/vnd.ms-excel",
      //     },
      //     message: "Documento XLS generado con éxito",
      //   });
      // }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        error: "Error al generar el informe",
      });
    }
  },
};

module.exports = infGeneratorController;
