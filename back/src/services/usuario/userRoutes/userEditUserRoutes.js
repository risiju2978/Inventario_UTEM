import { Router } from 'express';
import userEditUserController from '../userControllers/userEditUserController';

const router = Router();

// Endpoint para editar usuario
router.put('/editar_usuario', userEditUserController.editarUsuario);

export default router;











