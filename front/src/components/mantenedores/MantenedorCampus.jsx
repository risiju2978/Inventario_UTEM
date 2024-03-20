import React from "react";
import CrearCampus from "./campus/CrearCampus";

const MantenedorCampusComponent = () => {
 
    return (
      <div className="mantenedor-container">
        <h3>Gestión campus</h3>  
        <div className="d-flex align-start">
          <button
            type="button"
            className="btn btn-primary w-auto mx-auto mb-3"
            data-bs-toggle="modal"
            data-bs-target="#crearCampusModal"
          >
            Crear campus
          </button>
          <button
            ype="button"
            className="btn btn-primary w-auto mx-auto mb-3"
            data-bs-toggle="modal"
            data-bs-target="#actualizarCampusModal"
          >
            Ver campus
          </button>
          {/* <button
            ype="button"
            className="btn btn-primary w-auto mx-auto mb-3"
            data-bs-toggle="modal"
            data-bs-target="#eliminarCampusModal"
          >
            Eliminar campus
          </button> */}
        </div>
  
        {/* <!-- Modal ingresar nuevo campus --> */}
        <div
          class="modal fade"
          id="crearCampusModal"
          tabindex="-1"
          aria-labelledby="crearcampusLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3>Agregar nuevo campus</h3>
              </div>
              <div class="modal-body">
                <CrearCampus  />
  
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Modal actualizar campus --> */}
        <div
          class="modal fade"
          id="actualizarCampusModal"
          tabindex="-1"
          aria-labelledby="actualizarcampusLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3>campus</h3>
              </div>
              <div class="modal-body">
                {/* <Listarcampuss /> */}
                </div>
            </div>
          </div>
        </div>
        {/* <!-- Modal eliminar campus --> */}
        <div
          class="modal fade"
          id="eliminarCampusModal"
          tabindex="-1"
          aria-labelledby="eliminarcampusLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3>Eliminar campus</h3>
              </div>
              <div class="modal-body">Eliminar campus</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default MantenedorCampusComponent;
