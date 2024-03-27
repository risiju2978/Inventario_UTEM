
import React, { useEffect, useState } from "react";
import { Api } from "../../api/api";

const ActualizarRol = ({ id }) => {
  const [nuevoRol, setNuevoRol] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    setIdUsuario(id);
    }, [id]);

  const handleInputChange = (event) => {
    setNuevoRol(event.target.value);
  };

  const changeRolUser = () => {
    console.log(idUsuario.user_id, nuevoRol);
    Api.changeRolUser(idUsuario.user_id, nuevoRol)
      .then((response) => {
        console.log("Rol del usuario actualizado con éxito.", response);
        alert("Rol del usuario actualizado con éxito.");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error al actualizar rol de usuario", error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Actualizar rol de usuario</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
            <p>Estas editando el rol del usuario: {idUsuario && idUsuario.username}</p>
          <form>
            <div className="mb-3">
              <label htmlFor="rol_id" className="form-label">
                Rol
              </label>
              <select
                className="form-select"
                id="rol_id"
                name="rol_id"
                onChange={handleInputChange}
              >
                <option defaultValue>Selecciona un rol</option>
                <option value="1">Super Administrador</option>
                <option value="2">Administrador</option>
                <option value="3">Usuario</option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={changeRolUser}
            >
              Actualizar rol
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarRol;
