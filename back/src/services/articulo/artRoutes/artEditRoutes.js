
import express from 'express';
import artEditController from '../controllers/artEditController';

const router = express.Router();

router.post('/edit_art', artEditController.editArticulo);

export default router;













