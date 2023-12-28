import express from 'express';
import artGeneratorInfoController from '../artControllers/artGeneratorInfoController';

const router = express.Router();

router.post('/generator_inf', artGeneratorInfoController.generarInforme);

export default router;













