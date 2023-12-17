
const express = require("express");
const userEditRolController = require("../userControllers/userEditRolController");

const router = express.Router();

// Ruta para editar roles de usuario
router.put("/editar_rol", userEditRolController.editarRolUsuario);

module.exports = router;












