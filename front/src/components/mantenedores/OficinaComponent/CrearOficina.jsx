import React, { useEffect, useState } from "react";
import { Api } from "../../../api/api";

const CrearOficina = () => {
  const [dataCampusForSelect, setDataCampusForSelect] = useState([]);

  const [departament, setdepartament] = useState(null);
  const [nombre, setNombre] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departament || !nombre) {
      alert("Por favor, ingresa todos los campos");
      return;
    }
    Api.createOficina(departament, nombre)
      .then((data) => {
        console.log(data);
        alert("Oficina creada exitosamente");
        limpiarForm();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Error al crear la oficina");
      });
  };

  const handledepartamentChange = (e) => {
    setdepartament(e.target.value);
  };
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const limpiarForm = () => {
    document.getElementById("departament").value = "";
    document.getElementById("nombre").value = "";
    setCampus(null);
    setNombre(null);
  };

  useEffect(() => {
    Api.getAlldepartament().then((data) => {
      setDatadepartamentForSelect(data);
    });
  }, []);

  return (
    <div className="container">
      <h5>Indicar el departament y el nombre de la nueva oficina</h5>
      <form>
        <div className="mb-3">
          <label htmlFor="departament" className="form-label">
          departamento
          </label>
          <select id="departament" className="form-select" onChange={handledepartamentChange}>
            <option defaultChecked>Selecciona un departamento</option>
            {datadepartamentForSelect.map((departament) => (
              <option key={departament.departament_id} value={departament.departament_id}>
                {departament.departament}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input type="text" className="form-control" id="nombre" onChange={handleNombreChange} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Crear
        </button>
      </form>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={limpiarForm}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CrearOficina;
