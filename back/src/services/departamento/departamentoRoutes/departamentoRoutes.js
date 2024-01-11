


const departamentoCRUD = require ('../departamentoControllers/departamentoCRUD');
const express = require("express");



const router = express.Router();

router.get('/getAllDepartaments', departamentoCRUD.getAllDepartamentos);
router.get('/getDepartamentsByID', departamentoCRUD.getDepartamentoById);
router.post('/createDepartament', departamentoCRUD.createDepartamento);
router.put('/updateDepartament', departamentoCRUD.updateDepartamento);
router.delete('/deleteDepartament', departamentoCRUD.deleteDepartamento);

module.exports = router;