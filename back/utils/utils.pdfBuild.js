const PDFDocument = require("pdfkit");

function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.fontSize(25).text("Titulo del Informe");
  doc.end();
}

module.exports = buildPDF;