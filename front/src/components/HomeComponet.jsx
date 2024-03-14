import React from "react";
import { useNavigate } from "react-router-dom";

export function HomeComponent() {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickListado = () => {
    navigate("/articulo");
  };

<<<<<<< HEAD
  return ;

=======
  return (
    <div className="container">
      <div className="row my-5">  
        <div className="col-12">
          <h1>Sistema de gestión de inventarios</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary mx-4"
            onClick={handleClickLogin}
          >
            Ingresar al sistema
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClickListado}
          >
            Listado de articulos
          </button>
        </div>
        <div className="col-12">
          <i class="fa fa-xingx" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
>>>>>>> origin2/develop
}
