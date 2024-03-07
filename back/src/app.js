require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser"); 
const port = process.env.PORT;
const app = express();
const cors = require('cors');
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method'
  );
  res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
//app.use(cors);



// Configura body-parser con un límite de tamaño de carga de 50MB
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// Rutas del servidor
const usuarioRoutes = require('./services/usuario/userRoutes/userRoutes');
const articuloRoutes = require('./services/articulo/artRoutes/artRoutes');
const categoriaRoutes = require('./services/categoria/categoriaRoutes/categoriaRutasGeneral');
const departamentoRoutes = require('./services/departamento/departamentoRoutes/departamentoRoutes');
const sedeRoutes = require('./services/sede/sedeRoutes/sedeRoutes');
const articuloEstadoRoutes = require('./services/articulo_estado/articuloEstadoRoutes/articuloEstadoRoutes');
const oficinaRoutes = require('./services/oficina/oficinaRoutes/oficinaRoutes');
const infGenerator = require('./services/articulo/artRoutes/artGeneratorInfoRoutes');
const vistaRoutes = require('./services/V_InfoGenerator/V_Routes/V_Routes');
const { db } = require("../utils/utils.helpers");

// Rutas
app.use('/api/vista', vistaRoutes);
app.use('/api/informe', infGenerator);
app.use('/api/articulo', articuloRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/departamento', departamentoRoutes);
app.use('/api/sede', sedeRoutes);
app.use('/api/articuloEstado', articuloEstadoRoutes);
app.use('/api/oficina', oficinaRoutes);

// Ruta para errores no especificados
app.get("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.post("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.put("/*", (req, res) => {
  res.status(400).json({ status: 400, message: "ruta no especificada" });
});

app.listen(port, () => {
  console.log("inventario application up on port", port);
});


db.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }
  console.log('Conectado a la base de datos!');
});