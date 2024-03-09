
const multer = require('multer');

const artController = require ('../artControllers/artController');
const express = require("express");
const router = express.Router();


 // utilizar multer para implementar la subida de imagenes
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/articulos/')
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  
  const upload = multer({ storage: storage});
  

// Endpoint para editar articulo
router.put('/edit_art', artController.editArticulo);
// Endpoint para dar de baja el articulo
router.post('/baja_art', artController.bajaArticulo);
// Endpoint para crear articulo
router.post("/income_art", upload.single('img'), artController.incomeArticulo);



module.exports = router;











