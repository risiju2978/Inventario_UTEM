const express = require('express');

const usuarioLoginController = require('../userControllers/userLoginController');

const router = express.Router();

// Endpoint para login de usuario
router.post("/login", usuarioLoginController.loginUsuario);

module.exports = router;



