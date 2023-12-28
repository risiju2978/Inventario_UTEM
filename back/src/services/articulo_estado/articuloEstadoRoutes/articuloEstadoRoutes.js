
import express from "express";
import articuloEstadoCRUD from "../articuloEstadoControllers/articuloEstadoCRUD";

const router = express.Router();

// Rutas
router.get("/:id", articuloEstadoCRUD.getArticuloEstadoById);
router.post("/", articuloEstadoCRUD.createArticuloEstado);
router.put("/:id", articuloEstadoCRUD.updateArticuloEstado);
router.delete("/:id", articuloEstadoCRUD.deleteArticuloEstado);

export default router;