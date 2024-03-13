const PDFDocument = require("pdfkit");

function buildPDF(dataCallback, endCallback, data) {
    
    console.log(data[0]);
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.fontSize(25).text("Titulo del Informe");
  doc.moveDown();
    doc.fontSize(18).text("Subtitulo del informe");
    doc.moveDown();
    doc.fontSize(12).text("Contenido del informe");
    doc.moveDown();
    // recordar que data es un array de objetos e imprimir en el pdf los datos que se necesiten
    data[0].forEach((row) => {
        doc.text(`Id: ${row.ID}`);
        doc.text(`Nombre: ${row.art_nombre}`);
        doc.text(`Código: ${row.art_codigo}`);
        doc.moveDown();
    });
    doc.fontSize(10).text("Informe generado el:" + new Date());
  doc.end();
}

module.exports = buildPDF;