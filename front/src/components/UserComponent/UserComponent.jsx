import React, { useState, useEffect } from "react";
import axios from "axios";
import RegistrarUserComponent from "../RegistrarUserComponent/RegistrarUserComponent";
import { Api } from "../../api/api";
import ActualizarRol from "../ActualizarRol/ActualizarRol";
import AgregarArticulo from "../ArticuloComponent/AgregarArticulo";
import ButtonDescargar from "../common/buttonDescargar";
import { variables } from "../../config/const";
import FiltroReportsComponent from "../FiltrosReportsComponent/FiltroReportsComponent";
import DatosDashComponent from "../DatosDashBoard/DatosDashComponent";
import MantenedorCategoriaComponent from "../mantenedores/MantenedorCategoria";
import MantenedorOficinaComponent from "../mantenedores/MantenedorOficina";
import MantenedorDepartamentoComponent from "../mantenedores/MantenedorDepartamento";
import MantenedorCampusComponent from "../mantenedores/MantenedorCampus";


function UserComponent() {
  const [usuarios, setUsuarios] = useState([]);
  const [userPerfil, setUserPerfil] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [idUserToCrearteArticulo, setIdUserToCrearteArticulo] = useState(null);
  
//ADICIONAL
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);


  const handleShowUpdatePasswordModal = (userId) => {
    const user = usuarios.find((user) => user.user_id === userId);
    if (user) {
      setSelectedUser(user);
      setShowUpdatePasswordModal(true);
    }
  };
  
  
  const handleCloseUpdatePasswordModal = () => {
    setShowUpdatePasswordModal(false);
    setNewPassword('');
  };
  
  const handleUpdatePassword = async () => {
    if (!newPassword) {
      alert("Por favor, ingresa un nuevo password.");
      return;
    }
  
    if (!selectedUser) {
      alert("No se ha seleccionado ningún usuario.");
      return;
    }
  
    const userData = {
      user_id: selectedUser.user_id,
      username: selectedUser.username,
      email: selectedUser.email,
      password: newPassword,
    };
  
    try {
      const response = await Api.editUser(userData);
      console.log("Usuario actualizado con éxito", response);
      alert("Usuario actualizado con éxito");
      handleCloseUpdatePasswordModal();
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
      alert("Error al actualizar el usuario");
    }
  };
  
  //FIN DE ADICIONAL

  const user = JSON.parse(window.localStorage.getItem("USER_APP"));
  console.log(user.id);

  useEffect(() => {
    if (user !== null) {
      setUserPerfil(user);
    }
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/usuario/listar"
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
  };

  // crear función para banear usuario utilizando la propiedad user_state
  const banearUsuario = async (id, user_state) => {
    Api.banearUser(id, user_state)
      .then((response) => {
        console.log("Estado del usuario actualizado con exito", response);
        alert("Estado actualizado con exito");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error al banear usuario", error);
      });
  };

  const idUpdateRol = (id) => {
    const userToUpdate = usuarios.find((user) => user.user_id === id);
    setIdUser(userToUpdate);
  };



  return (
    <div className="container">
      <div className="row mt-4">
        {/* TABLA INFO USUARIO*/}
        <div className="col-6">
          <div class="card">
            <div class="card-header">Perfil de usuario</div>
            <div className="card-body">
              Nombre de usuario
              <h5 className="card-title">
                {userPerfil && userPerfil.username}
              </h5>
              <p className="card-text">
                Email: {userPerfil && userPerfil.email}
              </p>
            </div>
            <hr />
            <button
              type="button"
              className="btn btn-primary w-50 mx-auto mb-3"
              data-bs-toggle="modal"
              data-bs-target="#registrarModal"
            >
              Agregar nuevo usuario
            </button>
          </div>
          <hr />
          <DatosDashComponent />
          <hr/>
          <MantenedorCategoriaComponent/>
          <hr/>
          <MantenedorOficinaComponent/>
          <hr/>
          <MantenedorDepartamentoComponent />
          <hr/>
          <MantenedorCampusComponent/>
        </div>
        <div className="col-6">
          <h5>Acciones</h5>
          <hr />
          <div className="row">
            <div className="col-6">
              {" "}
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleClickVerListado}
              >
                Ver inventario
              </button>
              <button
                className="btn btn-success mt-3"
                data-bs-toggle="modal"
                data-bs-target="#ingresarModal"
                title="Agregar artículo"
                onClick={() => {
                  setIdUserToCrearteArticulo(user.id);
                }}
              >
                Agregar Artículo{" "}
                <i className="bi bi-file-earmark-plus-fill"></i>
              </button>
            </div>
            <div className="col-6 align-center">
              <ButtonDescargar
                tipo="XLS"
                url={variables.urlReporteExcel}
                margenTop="10px"
              />
              <ButtonDescargar
                tipo="PDF"
                url={variables.urlReportePdf}
                margenTop="20px"
              />
              
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12">
              <h5>Reporte personalizado</h5>
              <FiltroReportsComponent />
          </div>
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
                    <td>{usuario.user_state === 0 ? "Inactivo" : "Activo"}</td>
                    <td>
                      {usuario.rol_id === 1
                        ? "SuperAdmin"
                        : usuario.rol_id === 2
                        ? "Administrador"
                        : "Usuario"}
                    </td>
                    <td>
                      <div className="d-flex">
                        {/* <button type="button" className="btn btn-primary">
                          <i className="bi bi-pencil-square"></i>
                        </button> */}
                        {userPerfil && userPerfil.rol === 2 ? null : usuario.user_state === 1 ? (
                          <button
                            type="button"
                            className="btn btn-danger mx-2"
                            onClick={() => banearUsuario(usuario.user_id, 0)}
                          >
                            <i className="bi bi-file-earmark-x"></i>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success mx-2"
                            onClick={() => banearUsuario(usuario.user_id, 1)}
                          >
                            <i className="bi bi-check"></i>
                          </button>
                        )}
                        {userPerfil && userPerfil.rol === 2 ? null :
                        <button
                          onClick={() => idUpdateRol(usuario.user_id)}
                          type="button"
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#rolModal"
                        >
                          <i className="bi bi-eye"></i>
                        </button>}
                      {/*ADICIONAL BOTON PASSWORD */}
                    <button onClick={() => handleShowUpdatePasswordModal(usuario.user_id)}>Actualizar Password</button>
    
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
        <div className="col-6 mx-0"></div>
        {/* TABLA EDITAR ROLES*/}
        <div className="col-6"></div>
      </div>
      {/* <!-- Modal registrar usuario --> */}
      <div
        class="modal fade"
        id="registrarModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Registro de usuario
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <RegistrarUserComponent />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal actualizar rol de usuario --> */}
      <div
        class="modal fade"
        id="rolModal"
        tabindex="-1"
        aria-labelledby="rolLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <ActualizarRol id={idUser} />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal ingresar nuevo articulo --> */}
      <div
        class="modal fade"
        id="ingresarModal"
        tabindex="-1"
        aria-labelledby="ingresarLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Ingresar nuevo artículo</h3>
            </div>
            <div class="modal-body">
              <AgregarArticulo
                idUser={idUserToCrearteArticulo}
                limpiar={true}
              />
            </div>
          </div>
        </div>
      </div>
{/* MODAL CAMBIAR PASSWORD */}
{showUpdatePasswordModal && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloseUpdatePasswordModal}>&times;</span>
      <h4>Actualizar Password</h4>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Ingresa el nuevo password"
      />
      <button onClick={handleUpdatePassword}>Actualizar</button>
    </div>
  </div>
)}

    </div>
  </div>
  );
}

export default UserComponent;
