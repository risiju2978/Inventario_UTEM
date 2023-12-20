require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT;

const { db } = require("../utils/utils.helpers");

//rutas 
const usuarioListarRoutes = require('./services/usuario/userRoutes/userListarRoutes').default;
const usuarioLoginRoutes = require('./services/usuario/userRoutes/userLoginRoutes').default;
const usuarioCreateUserRoutes = require("./services/usuario/userRoutes/userCreateUserRoutes").default;
const usuarioEditarRolRoutes = require("./services/usuario/userRoutes/userEditRolRoutes").default;
const userEditUserRoutes = require("./services/usuario/userRoutes/userEditUserRoutes").default;
const userInfoUserRoutes = require("./services/usuario/userControllers/userInfoUserController").default;



const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cabeceras
//configuracion CORS para las cabeceras por si se reciben solicitudes desde un dominio diferente
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,OPTIONS,PUT,DELETE'
  );
  res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})




// 1. crear las rutas ( routes & controllers )
// 2. configurar cabeceras y CORS (estudiar)
// 3. interceptores
// Configurar middleware de análisis del cuerpo



// Configurar las rutas
//################### RUTA LISTAR #########################


// Endpoint para listar usuarios
app.use('/api/usuario', usuarioListarRoutes);




//################### RUTA LOGIN #########################

// Endpoint para login de usuario
app.use('/api/usuario', usuarioLoginRoutes);



//################### RUTA CREAR USUARIO #########################

//endpoint para crear usuario
app.use('/api/usuario',usuarioCreateUserRoutes);





//################### RUTA EDITAR ROLES #########################

// Endpoint para editar roles
app.use("/api/usuario",usuarioEditarRolRoutes);


//################### RUTA EDITAR USUARIO #########################

//endpoit para edital usuario
app.use('/api/usuario', userEditUserRoutes);



//################### RUTA  INFORMACION PERSONAL #########################


// endpoint para Info personal del usuario
app.use("/info_User",userInfoUserRoutes);



//################### RUTA (NUEVA RUTA) #########################














app.get("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.post("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.listen(port, () => {
  console.log("inventario application up on port", port);
});






