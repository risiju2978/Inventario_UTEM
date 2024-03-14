
import React, { useEffect, useState } from "react";
import { Api } from "../../api/api";

const DatosDashComponent = () => {
  const [articulos, setArticulos] = useState([]);
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    Api.getReadVista().then((data) => setArticulos(data));
  }, []);

  

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total de artículos</h5>
              {articulos.length === 0 ? "Cargando.." : <h1 className="card-text">{articulos.length}</h1>}
            </div>
          </div>
        </div>
        {/* <div className="col">
          <div className="card">.
            <div className="card-body">
              <h5 className="card-title">Total de artículos activos</h5>
              {usuarios ? "Cargando.." :<p className="card-text"> {usuarios.length}</p>}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DatosDashComponent;
