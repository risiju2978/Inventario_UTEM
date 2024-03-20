import React, { useState } from "react";
import CrearDepartamento from "./departamentos/CrearDepartamento";
import ListarDepartamentos from "./departamentos/ListarDepartamentos";

const MantenedorDepartamentoComponent = () => {
  return (
    <div className="mantenedor-container">
      <h3>Gestión departamentos</h3>  
      <div className="d-flex align-start">
        <button
          type="button"
          className="btn btn-primary w-auto mx-auto mb-3"
          data-bs-toggle="modal"
          data-bs-target="#crearDepartamentoModal"
        >
          Crear Departamento
        </button>
        <button
          ype="button"
          className="btn btn-primary w-auto mx-auto mb-3"
          data-bs-toggle="modal"
          data-bs-target="#actualizarDepartamentoModal"
        >
          Ver departamentos
        </button>
        {/* <button
          ype="button"
          className="btn btn-primary w-auto mx-auto mb-3"
          data-bs-toggle="modal"
          data-bs-target="#eliminarDepartamentoModal"
        >
          Eliminar Departamento
        </button> */}
      </div>

      {/* <!-- Modal ingresar nuevo departamento --> */}
      <div
        class="modal fade"
        id="crearDepartamentoModal"
        tabindex="-1"
        aria-labelledby="crearDepartamentoLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Agregar nuevo departamento</h3>
            </div>
            <div class="modal-body">
              <CrearDepartamento  />

            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal actualizar departamento --> */}
      <div
        class="modal fade"
        id="actualizarDepartamentoModal"
        tabindex="-1"
        aria-labelledby="actualizarDepartamentoLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Departamentos</h3>
            </div>
            <div class="modal-body">
              <ListarDepartamentos />
              </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal eliminar departamento --> */}
      <div
        class="modal fade"
        id="eliminarDepartamentoModal"
        tabindex="-1"
        aria-labelledby="eliminarDepartamentoLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Eliminar departamento</h3>
            </div>
            <div class="modal-body">Eliminar departamento</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MantenedorDepartamentoComponent;
