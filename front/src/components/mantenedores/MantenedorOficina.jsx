import React from "react";
import CrearOficina from "./OficinaComponent/CrearOficina";
import ListarOficinas from "./OficinaComponent/ListarOficina";

const MantenedorOficinaComponent = () => {
  return (
    <div className="mantenedor-container">
      <h3>Gestión de oficinas</h3>  
      <div className="d-flex align-start">
        <button
          type="button"
          className="btn btn-primary w-auto mx-auto mb-3" 
          data-bs-toggle="modal"
          data-bs-target="#crearOficinaModal"
        >
          Crear Oficina
        </button>
        <button
          type="button"
          className="btn btn-primary w-auto mx-auto mb-3"
          data-bs-toggle="modal"
          data-bs-target="#verOficinasModal"
        >
          Ver oficinas
        </button>
      </div>

      {/* <!-- Modal para crear nueva oficina --> */}
      <div
        className="modal fade"
        id="crearOficinaModal"
        tabIndex="-1"
        aria-labelledby="crearOficinaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Agregar nueva oficina</h3>
            </div>
            <div className="modal-body">
              <CrearOficina />
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal para listar oficinas --> */}
      <div
        className="modal fade"
        id="verOficinasModal"
        tabIndex="-1"
        aria-labelledby="verOficinasLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Oficinas</h3>
            </div>
            <div className="modal-body">
              <ListarOficinas />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MantenedorOficinaComponent;
