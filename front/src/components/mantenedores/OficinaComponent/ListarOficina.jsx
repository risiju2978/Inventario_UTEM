import React, { useEffect, useState } from "react";
import { Api } from "../../../api/api";
import UpdateOficina from "./UpdateOficina";

const ListarOficinas = () => {
  const [oficinas, setOficinas] = useState([]);
  const [oficinaUpdate, setOficinaUpdate] = useState(null);

  useEffect(() => {
    Api.getAllOficinas()
      .then((res) => {
        setOficinas(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteOficina = (office_id) => {
    Api.deleteOficina(office_id)
      .then((response) => {
        console.log("Oficina eliminada correctamente de la base de datos", response);
        alert("Oficina eliminada correctamente");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error al eliminar la oficina de la base de datos", error);
      });
  };

  const updateHandle = (oficina) => {
    setOficinaUpdate(oficina);
  };

  const handleCLoseUpdate = () => {
    setOficinaUpdate(null);
  };

  return (
    <div className="container">
      {oficinas.length === 0 && (
        <div>No hay oficinas</div>
      )}
      {oficinas.length > 0 && (
        <div>Total de oficinas: {oficinas.length}</div>
      )}
      
      {oficinaUpdate === null ? <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {oficinas.map((oficina) => (
            <tr key={oficina.office_id}>
              <td>{oficina.office_id}</td>
              <td>{oficina.office}</td>
              <td>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleDeleteOficina(oficina.office_id)}
                >
                  Eliminar
                </button>
                <button className="btn btn-primary" onClick={() => updateHandle(oficina)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> :
      <div className="d-flex flex">
        <UpdateOficina oficinaUpdate={oficinaUpdate} />
        <button className="btn btn-danger h-auto" onClick={handleCLoseUpdate}>Cerrar</button>
      </div>
      }
    </div>
  );
};

export default ListarOficinas;
