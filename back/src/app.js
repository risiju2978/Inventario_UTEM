require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const port = process.env.PORT;
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


//rutas 
const usuarioRoutes = require('./services/usuario/userRoutes/userRoutes');

const articuloRoutes = require('./services/articulo/artRoutes/artRoutes');




//Endpoint para articulos 
app.use('/api/articulo',articuloRoutes);


//################### RUTA LISTAR #########################



// Endpoint para listar usuarios
app.use('/api/usuario', usuarioRoutes);





app.get("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.post("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.listen(port, () => {
  console.log("inventario application up on port", port);
});






