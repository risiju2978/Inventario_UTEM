

const express = require('express');
const userCreateUserController = require('../userControllers/userCreateUserController');

const router = express.Router();

// Endpoint para crear usuario
router.post('/crear_usuario', userCreateUserController.crearUsuario);

module.exports = router;


















