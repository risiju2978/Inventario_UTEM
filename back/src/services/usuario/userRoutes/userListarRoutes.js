const express = require('express');
const usuarioListarController = require('../services/usuarioListarController');

const router = express.Router();

// Endpoint para listar usuarios
router.get('/listar', usuarioListarController.listarUsuarios);

module.exports = router;
