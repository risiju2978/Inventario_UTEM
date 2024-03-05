


const artController = require ('../artControllers/artController');
const express = require("express");
const router = express.Router();

// Endpoint para editar articulo
router.put('/edit_art', artController.editArticulo);
// Endpoint para dar de baja el articulo
router.post('/baja_art', artController.bajaArticulo);
// Endpoint para crear articulo
router.post("/income_art",artController.incomeArticulo);



module.exports = router;











