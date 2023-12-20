import { Router } from 'express';
import { listarUsuarios } from '../services/usuarioListarController';

const router = Router();

// Endpoint para listar usuarios
router.get('/listar', listarUsuarios);

export default router;
