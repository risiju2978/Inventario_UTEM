const express = require('express');
const router = express.Router();
const vistaController = require('../V_Controllers/V_Controller');

// Rutas
router.get('/readVista', vistaController.readVista);

module.exports = router;
