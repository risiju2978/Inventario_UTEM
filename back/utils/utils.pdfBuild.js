const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");

function buildPDF(dataCallback, endCallback, data, activo) {
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.fontSize(25).text("Reporte de inventario", { align: "center" });
  doc.moveDown();
  doc.fontSize(18).text("Inventario total de artículos", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text("Solicitado por: Usuario", { align: "center" });
  doc.moveDown();

  if (!data) {
    doc.fontSize(12).text("No hay datos para mostrar");
    doc.end();
    return;
  }

  let table;

  if (activo == 2) {
    table = {
      headers: [
        "ID",
        "Nombre",
        "Código",
        "Departamento",
        "Categoria",
        "Año",
        "Estado",
        "Fecha de abaja",
        "Autorización",
      ],
      rows: data.map((row) => [
        row.ID,
        row.art_nombre,
        row.art_codigo,
        row.departament,
        row.categoria,
        row.anio,
        row.articulo_estado_id === 1 ? "Activo" : "Dado de baja",
        row.fecha_baja === null ? "Sin registro" : new Date(row.fecha_baja).toISOString().split("T")[0],
        row.autorizacion === null ? "Sin registro" : row.autorizacion,
      ]),
    };
    console.log("table:", table);
  } else if (activo == 1) {
    table = {
      headers: [
        "ID",
        "Nombre",
        "Código",
        "Departamento",
        "Categoria",
        "Año",
        "Estado",
      ],
      rows: data.map((row) => [
        row.ID,
        row.art_nombre,
        row.art_codigo,
        row.departament,
        row.categoria,
        row.anio,
        row.articulo_estado_id === 1 ? "Activo" : "Dado de baja",
      ]),
    };
  } else if (activo === undefined || activo === null) {
    table = {
      headers: [
        "ID",
        "Nombre",
        "Código",
        "Departamento",
        "Categoria",
        "Año",
        "Estado",
      ],
      rows: data.map((row) => [
        row.ID,
        row.art_nombre,
        row.art_codigo,
        row.departament,
        row.categoria,
        row.anio,
        row.articulo_estado_id === 1 ? "Activo" : "Dado de baja",
      ]),
    };
  }
  doc.table(table, {
    prepareHeader: () => doc.font("Helvetica-Bold"),
    prepareRow: (row, i) => doc.font("Helvetica").fontSize(12),
  });
  doc.fontSize(10).text("Informe generado el:" + new Date());

  //   const fileName = `documento-${new Date().toISOString()}.pdf`;
  //   const dirPath = path.join(process.cwd(), "/uploads/pdf/");
  //   console.log("dirPath:", dirPath);

  //   if (!fs.existsSync(dirPath)) {
  //     fs.mkdirSync(dirPath, { recursive: true });
  //   }

  //   const pdfFilePath = `${dirPath}/${fileName}`;
  //   const pdfStream = fs.createWriteStream(pdfFilePath);
  //   doc.pipe(pdfStream);

  //   pdfStream.on("error", (err) => {
  //     console.error("Error al escribir en el archivo:", err);
  //   })
  doc.end();
}

module.exports = buildPDF;