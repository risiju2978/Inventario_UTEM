


const articuloEstadoCRUD = require ('../articuloEstadoControllers/articuloEstadoCRUD');
const express = require("express");
const router = express.Router();

// Rutas
router.get("/getAllSedesByID", articuloEstadoCRUD.getArticuloEstadoById);
router.post("/createArticuloEstado", articuloEstadoCRUD.createArticuloEstado);
router.put("/updateArticuloEstado", articuloEstadoCRUD.updateArticuloEstado);
router.delete("/deleteArticuloEstado", articuloEstadoCRUD.deleteArticuloEstado);

module.exports = router;