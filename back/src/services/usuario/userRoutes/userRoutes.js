
const userController = require ('../userControllers/userController');
const express = require("express");
const router = express.Router();

// Endpoint para listar usuarios
router.get('/listar', userController.listarUsuarios);
// Endpoint para login de usuario
router.post("/login", userController.loginUsuario);
// Endpoint para crear usuario
router.post('/crear_usuario', userController.crearUsuario);

// Ruta para editar roles de usuario
router.put("/editar_rol", userController.editarRolUsuario);
// Endpoint para editar usuario
router.put('/editar_usuario',userController.editarUsuario);
// Endpoint para obtener información personal del usuario
router.get("/info_User", userController.getInfoUser);
//endpoint para editar contraseña de un usuario
router.put("/edit_Password",userController.editarPasswordUsuario);

module.exports = router;
