import { useState } from "react";

import React from "react";
import { Api } from "../../../api/api";

const CrearCampus = () => {

  const [nombre, setNombre] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre) {
      alert("Por favor, ingresa todos los campos");
      return;
    }
    Api.createSede(nombre)
      .then((data) => {

        console.log(data);
        alert("Campus creado exitosamente");
        limpiarForm();

        window.location.reload();
      })
      .catch((error) => {

        console.log(error);
        alert("Error al crear el departamento");
      })  
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const limpiarForm = () => {
    document.getElementById("nombre").value = "";
    setNombre(null);
  }


  return (
    <div className="container">
      <h5>Indicar el nombre del campus</h5>
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input type="text" className="form-control" id="nombre" onChange={handleNombreChange}/>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Crear
        </button>
      </form>
      <div class="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={limpiarForm}>
          Cerrar
        </button>

      </div>
    </div>
  );
};

export default CrearCampus;
