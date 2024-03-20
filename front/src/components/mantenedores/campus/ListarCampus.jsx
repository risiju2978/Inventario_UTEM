import React, { useEffect, useState } from "react";
import { Api } from "../../../api/api";
import UpdateCampus from "./UpdateCampus";

const Listarcampus = () => {
  const [campus, setCampus] = useState([]);

  const [campusUpdate, setCampusUpdate] = useState(null)

  useEffect(() => {
    Api.getAllCampus()
      .then((res) => {
        setCampus(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeletecampus = (id) => {
    Api.deletecampus(id)
      .then((response) => {
        console.log(
          "campus eliminado correctamente de la base de datos",
          response
        );
        alert("campus eliminado correctamente de la base de datos");
        window.location.reload();
      })
      .catch((error) => {
        console.log(
          "Error al eliminar el campus de la base de datos",
          error
        );
      });
  };

  const updateHandle = (campus)=> {
    setCampusUpdate(campus)
  }

  const handleCLoseUpdate = () => {
    setCampusUpdate(null)
  }



  return (
    <div className="container">
      {campus.length === 0 && (
        <tr>
          <td colSpan={2}>No hay campus</td>
        </tr>
      )}
      {campus.length > 0 && (
        <tr>
          <td colSpan={2}>Total de campus: {campus.length}</td>
        </tr>
      )}
      
      {campusUpdate === null ? <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {campus.map((campus) => (
            <tr key={campus.campus_id}>
              <td>{campus.campus_id}</td>
              <td>{campus.campus}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() =>
                    handleDeletecampus(campus.campus_id)
                  }
                >
                  <i className="bi bi-file-earmark-x"></i>
                </button>
                <button type="button" className="btn btn-primary" onClick={() => updateHandle(campus)}>
                  <i className="bi bi-pencil-square"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>:
      <div className="d-flex flex">
      <UpdateCampus campusUpdate={campusUpdate} />
      <button type="button" className="btn btn-danger h-auto" onClick={handleCLoseUpdate}><i class="bi bi-x-circle"></i></button>
      </div>
      }
      <div class="modal-footer " >
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={() => setCampusUpdate(null)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Listarcampus;
