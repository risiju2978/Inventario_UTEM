const express = require('express');
const userEditUserController = require('../userControllers/userEditUserController');

const router = express.Router();

// Endpoint para editar usuario
router.put('/editar_usuario', userEditUserController.editarUsuario);

module.exports = router;











