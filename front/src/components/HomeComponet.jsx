
import React from "react";
import {useNavigate} from "react-router-dom";

export function HomeComponent() {
  const navigate = useNavigate();

  const handleClickLogin = () => {
   navigate('/login');
  }

  const handleClickListado = () => {
    navigate('/articulo');
  }

  return (
    <div className="container">
      <h1>Sistema de gestión de inventarios</h1>
      <div className="container">
        <div className="row">
          <div className="col-6 self-center">
            <button type="button" className="btn btn-primary mx-4" onClick={handleClickLogin}>Ingresar al sistema</button>
            <button type="button" className="btn btn-primary" onClick={handleClickListado}>Listado de articulos</button>
          </div>
          <div className="col-6">
            
          </div>
        </div>
      </div>
    </div>  
    
  );

}
