
import express from "express";
import artIncomeController from "../artControllers/artIncomeController";

const router = express.Router();

// Endpoint para ingresar artículo
router.post("/income_art", artIncomeController.incomeArticulo);

export default router;










