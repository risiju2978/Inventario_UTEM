import React, { useEffect, useState } from "react";
import { Api } from "../../../api/api";
import UpdateDepartamento from "./UpdateDepartamento";
//utilizar boostrap 5 para mostrar en una tabla la lista de departamentos
const ListarDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);

  const [departamentoUpdate, setDepartamentoUpdate] = useState(null)

  useEffect(() => {
    Api.getAllDeparments()
      .then((res) => {
        setDepartamentos(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteDepartament = (id) => {
    Api.deleteDepartamento(id)
      .then((response) => {
        console.log(
          "Departamento eliminado correctamente de la base de datos",
          response
        );
        alert("Departamento eliminado correctamente de la base de datos");
        window.location.reload();
      })
      .catch((error) => {
        console.log(
          "Error al eliminar el departamento de la base de datos",
          error
        );
      });
  };

  const updateHandle = (departamento)=> {
    setDepartamentoUpdate(departamento)
  }

  const handleCLoseUpdate = () => {
    setDepartamentoUpdate(null)
  }



  return (
    <div className="container">
      {departamentos.length === 0 && (
        <tr>
          <td colSpan={2}>No hay departamentos</td>
        </tr>
      )}
      {departamentos.length > 0 && (
        <tr>
          <td colSpan={2}>Total de departamentos: {departamentos.length}</td>
        </tr>
      )}
      
      {departamentoUpdate === null ? <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((departamento) => (
            <tr key={departamento.departament_id}>
              <td>{departamento.departament_id}</td>
              <td>{departamento.departament}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() =>
                    handleDeleteDepartament(departamento.departament_id)
                  }
                >
                  <i className="bi bi-file-earmark-x"></i>
                </button>
                <button type="button" className="btn btn-primary" onClick={() => updateHandle(departamento)}>
                  <i className="bi bi-pencil-square"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>:
      <div className="d-flex flex">
      <UpdateDepartamento departamentoUpdate={departamentoUpdate} />
      <button type="button" className="btn btn-danger h-auto" onClick={handleCLoseUpdate}><i class="bi bi-x-circle"></i></button>
      </div>
      }
      <div class="modal-footer " >
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={() => setDepartamentoUpdate(null)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ListarDepartamentos;
