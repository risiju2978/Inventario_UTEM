import express from 'express';
import sedeCRUD from '../sedeControllers/sedeCRUD';

const router = express.Router();

// Rutas para CRUD de sede
router.get('/', sedeCRUD.getAllSedes);
router.get('/:id', sedeCRUD.getSedeById);
router.post('/', sedeCRUD.createSede);
router.put('/:id', ssedeCRUD.updateSede);
router.delete('/:id', sedeCRUD.deleteSede);

export default router;