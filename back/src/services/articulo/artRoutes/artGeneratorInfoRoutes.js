
const GeneratorInfoController = require ('../artControllers/artGeneratorInfoController');
const express = require("express")
const router = express.Router();

router.get('/generator_inf', GeneratorInfoController.generarInforme);

module.exports =router;













