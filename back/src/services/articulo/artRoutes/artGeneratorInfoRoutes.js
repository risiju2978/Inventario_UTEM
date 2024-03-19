
const GeneratorInfoController = require ('../artControllers/artGeneratorInfoController');
const express = require("express")
const router = express.Router();

router.post('/generator_inf', GeneratorInfoController.generarInforme);
router.get('/generar-reporte-general-pdf', GeneratorInfoController.generarReporteGeneralPDF);
router.get('/generar-reporte-general-xls', GeneratorInfoController.generarReporteGeneralXLS);

module.exports =router;













