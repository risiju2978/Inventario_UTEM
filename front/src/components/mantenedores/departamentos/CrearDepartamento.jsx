import { useEffect, useState } from "react";

import React from "react";
import { Api } from "../../../api/api";

const CrearDepartamento = () => {
  const [dataCampusForSelect, setDataCampusForSelect] = useState([]);

  const [campus, setCampus] = useState(null);
  const [nombre, setNombre] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!campus || !nombre) {
      alert("Por favor, ingresa todos los campos");
      return;
    }
    Api.createDepartamento(campus, nombre)
      .then((data) => {

        console.log(data);
        alert("Departamento creado exitosamente");
        limpiarForm();

        window.location.reload();
      })
      .catch((error) => {

        console.log(error);
        alert("Error al crear el departamento");
      })  
  };

  const handleCampusChange = (e) => {
    setCampus(e.target.value);
  };
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const limpiarForm = () => {
    document.getElementById("campus").value = "";
    document.getElementById("nombre").value = "";
    setCampus(null);
    setNombre(null);
  }

  useEffect(() => {
    Api.getAllCampus().then((data) => {
      setDataCampusForSelect(data);
    });
  }, []);

  return (
    <div className="container">
      <h5>Indicar el campus y el nombre del nuevo departamento</h5>
      <form>
        <div className="mb-3">
          <label htmlFor="campus" className="form-label">
            Campus
          </label>
          <select id="campus" className="form-select" onChange={handleCampusChange}>
            <option defaultChecked>Selecciona un campus</option>
            {dataCampusForSelect.map((campus) => (
              <option key={campus.campus_id} value={campus.campus_id}>
                {campus.campus}
              </option>
            ))}
          </select>
        </div>
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

export default CrearDepartamento;
