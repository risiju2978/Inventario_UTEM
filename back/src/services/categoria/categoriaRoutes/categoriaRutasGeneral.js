
import express from "express";
import categoriaCRUD from "../categoriaControllers/categoriaCRUD";

const router = express.Router();

router.get("/categoria", categoriaCRUD.getCategorias);
router.get("/categoria/:id", categoriaCRUD.getCategoriaById);
router.post("/categoria", categoriaCRUD.createCategoria);
router.put("/categoria/:id", categoriaCRUD.updateCategoria);
router.delete("/categoria/:id", categoriaCRUD.deleteCategoria);

export default router;