
import express from 'express';
import artBajaController from '../controllers/artBajaController';

const router = express.Router();

router.post('/baja_art', artBajaController.bajaArticulo);

export default router;








