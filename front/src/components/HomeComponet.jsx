import React, { useEffect, useState } from "react";
import axios from "axios";

export function HomeComponent() {
  const [datos, setDatos] = useState([]);
 







  useEffect(() => {
    const getFakeApi = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setDatos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFakeApi();
  }, []);

  return (
   
    <div >


        <div className="modal" tabIndex="-1" role="dialog">
          {/* ... (estructura del modal) */}
          <div className="modal-body">
            {/* Campos de formulario para editar los datos */}
            <div className="form-group">
              <label htmlFor="anio">Año:</label>
              <input type="number" className="form-control" id="anio" name="anio"  />
            </div>
            <div className="form-group">
              <label htmlFor="dimension">Dimensión:</label>
              <input type="text" className="form-control" id="dimension" name="dimension"  />
            </div>
            {/* Agrega campos de formulario similares para las otras propiedades del producto */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" >
              Guardar Cambios
            </button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" >
              Cerrar
            </button>
          </div>
        </div>
    
    </div>
  );

}
