import express from 'express';
import departamentoCRUD from '../departamentoControllers/departamentoCRUD';

const router = express.Router();

router.get('/', departamentoCRUD.getAllDepartamentos);
router.get('/:departamento_id', departamentoCRUD.getDepartamentoById);
router.post('/', departamentoCRUD.createDepartamento);
router.put('/:departamento_id', departamentoCRUD.updateDepartamento);
router.delete('/:departamento_id', departamentoCRUD.deleteDepartamento);

export default router;