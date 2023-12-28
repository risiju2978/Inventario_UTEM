require("dotenv").config();

import express, { json, urlencoded } from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
const port = process.env.PORT;



//rutas 
import usuarioListarRoutes from './services/usuario/userRoutes/userListarRoutes';
import usuarioLoginRoutes from './services/usuario/userRoutes/userLoginRoutes';
import usuarioCreateUserRoutes from "./services/usuario/userRoutes/userCreateUserRoutes";
import usuarioEditarRolRoutes from "./services/usuario/userRoutes/userEditRolRoutes";
import userEditUserRoutes from "./services/usuario/userRoutes/userEditUserRoutes";
import userInfoUserRoutes from "./services/usuario/userControllers/userInfoUserController";
//RUTAS ARTICULOS
import artEditRoutes from "./services/articulo/artControllers/artEditController";
import artIncomeRoutes from "./services/articulo/artControllers/artIncomeController";
import artBajaRoutes from "./services/articulo/artControllers/artBajaController";
import artGeneratorInfoRoutes from "./services/articulo/artControllers/artGeneratorInfoController";



const app = express();

app.use(morgan("combined"));
app.use(json());
app.use(urlencoded({ extended: false }));

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
app.use('/info_User',userInfoUserRoutes);



//################### RUTA EDITAR ARTICULO #########################

// endpoint para editar articulo 
app.use('/edit_art',artEditRoutes);


//################### RUTA (INGRESAR ARTICULO) #########################


// endpoint para agregar articulo 
app.use('/income_art',artIncomeRoutes);



//################### RUTA DAR DE BAJA ARTICULO #########################


//endpoint para dar de baja articulos
app.use('/api/articulo', artBajaRoutes);




//################### RUTA GENERAR INFORME  #########################


//endpoint para dar generar informes
app.use('/generator_inf', artGeneratorInfoRoutes);




app.get("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.post("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.listen(port, () => {
  console.log("inventario application up on port", port);
});






