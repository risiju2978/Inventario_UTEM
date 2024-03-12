import React, { useState, useEffect } from "react";
import axios from "axios";
import RegistrarUserComponent from "../RegistrarUserComponent/RegistrarUserComponent";

function UserComponent() {
  const [usuarios, setUsuarios] = useState([]);
  const [userPerfil, setUserPerfil] = useState(null);

  const user = JSON.parse(window.localStorage.getItem("USER_APP"));

  useEffect(() => {
    if (user !== null) {
      setUserPerfil(user);
    }
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/vistaUsers/readVistaUsers"
        );
        setUsuarios(response.data.data);
      } catch (error) {
        console.error("Error al obtener datos de usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleClickVerListado = () => {
    window.location.href = "/articulo";
  }

  return (
    <div className="container">
      <div className="row mt-4">
      {/* TABLA INFO USUARIO*/}
      <div className="col-6">
        <div class="card">
          <div class="card-header">Perfil de usuario</div>
          <div className="card-body">Nombre de usuario
            <h5 className="card-title">{userPerfil && userPerfil.username}</h5>
            <p className="card-text">Email: {userPerfil && userPerfil.email}</p>
          </div>
        </div>
      </div>
      <div className="col-6">
        <h5>Acciones</h5>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar usuario</button>
        <button type="button" class="btn btn-primary mx-4" onClick={handleClickVerListado}>Ver inventario</button>
      </div>
      </div>
      <hr />
      <div className="row">
      <div className="col-12">
        <h3>Tabla de Usuarios</h3>
        <table className="table table-striped rounded">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Usuario</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Estado del Rol</th>
              <th>Campus</th>
              <th>ID Campus</th>
              <th>Departamento</th>
              <th>Oficina</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios &&
              usuarios.map((usuario) => (
                <tr key={usuario.user_id}>
                  <td>{usuario.user_id}</td>
                  <td>{usuario.username}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.user_state === 0 ? "Baneado" : "Activo"}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.rol_state}</td>
                  <td>{usuario.campus}</td>
                  <td>{usuario.campus_id}</td>
                  <td>{usuario.departament}</td>
                  <td>{usuario.office}</td>
                  <td>
                    <div className="d-flex">
                    <button type="button" className="btn btn-primary">
                    <i className="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" className="btn btn-danger mx-2">
                    <i className="bi bi-file-earmark-x"></i>
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
      <div className="row">
      {/* TABLA AGREGAR USUARIOS*/}
      <div className="col-6 mx-0">
        
      </div>
      {/* TABLA EDITAR ROLES*/}
      <div className="col-6">
        <h2>Editar roles</h2>
        <table className="table table-bordered">
          {/* Sin contenido por ahora */}
        </table>
      </div>
      </div>
      {/* <!-- Modal registrar usuario --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Registro de usuario</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <RegistrarUserComponent />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default UserComponent;
