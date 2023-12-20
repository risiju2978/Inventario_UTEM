
import { Router } from "express";
import userInfoUserController  from "../userControllers/userInfoUserController";

const router = Router();

// Endpoint para obtener información personal del usuario
router.get("/info_User", userInfoUserController.getInfoUser);

export default router;











