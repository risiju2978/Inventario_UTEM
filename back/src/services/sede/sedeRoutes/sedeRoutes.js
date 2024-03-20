

const sedeCRUD = require ('../sedeControllers/sedeCRUD');
const express = require("express");

const router = express.Router();

// Rutas para CRUD de sede
router.get('/getAllSedes', sedeCRUD.getAllSedes);
router.get('/getSedeByID', sedeCRUD.getSedeById);
router.post('/createSede', sedeCRUD.createSede);
router.put('/updateSede', sedeCRUD.updateSede);
router.delete('/deleteSede/:campus_id', sedeCRUD.deleteSede);

module.exports = router;