

import { Router } from 'express';
import userCreateUserController from '../userControllers/userCreateUserController';

const router = Router();

// Endpoint para crear usuario
router.post('/crear_usuario', userCreateUserController.crearUsuario);

export default router;


















