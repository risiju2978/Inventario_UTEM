import { Router } from 'express';

import usuarioLoginController from '../userControllers/userLoginController';

const router = Router();

// Endpoint para login de usuario
router.post("/login", usuarioLoginController.loginUsuario);

export default router;



