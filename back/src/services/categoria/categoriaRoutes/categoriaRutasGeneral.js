


const categoriaCRUD = require ('../categoriaControllers/categoriaCRUD');
const express = require("express");

const router = express.Router();

router.get("/getAllCategories", categoriaCRUD.getCategorias);
router.get("/getCategoriesByID", categoriaCRUD.getCategoriaById);
router.post("/CreateCategories", categoriaCRUD.createCategoria);
router.put("/updateCategories", categoriaCRUD.updateCategoria);
router.delete("/deleteCategories", categoriaCRUD.deleteCategoria);

module.exports = router;