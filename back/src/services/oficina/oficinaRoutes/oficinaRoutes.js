
const express = require('express');
const router = express.Router();
const oficinaCRUD = require('../oficinaControllers/oficinaCRUD');

// Rutas
router.get('/getAllOficinas', oficinaCRUD.getAllOficinas);
router.get('/getOficinasByID', oficinaCRUD.getOficinaById);
router.post('/createOficinas', oficinaCRUD.createOficina);
router.put('/updateOficinas', oficinaCRUD.updateOficina);
router.delete('/deleteOficinas', oficinaCRUD.deleteOficina);

module.exports = router;