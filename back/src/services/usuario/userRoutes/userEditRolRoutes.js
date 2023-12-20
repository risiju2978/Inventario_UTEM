
import { Router } from "express";
import userEditRolController from "../userControllers/userEditRolController";

const router = Router();

// Ruta para editar roles de usuario
router.put("/editar_rol", userEditRolController.editarRolUsuario);

export default router;












