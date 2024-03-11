const express = require('express');
const router = express.Router();
const vistaUsersController = require('../V_UsersController/V_UsersController');

// Rutas
router.get('/readVistaUsers', vistaUsersController.readVistaUsers);

module.exports = router;
