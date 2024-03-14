import React, { useState, useEffect } from "react";
import AgregarArticulo from "./AgregarArticulo";
import EditarArticulo from "./EditarArticulo";
import DarDeBaja from "./DarDeBaja";
import { useNavigate } from "react-router-dom";
import ButtonDescargar from "../common/buttonDescargar";
import { variables } from "../../config/const";
import { Api } from "../../api/api";
import FiltroReportsComponent from "../FiltrosReportsComponent/FiltroReportsComponent";

function ArticuloComponent() {
  const [articuloToUpdate, setArticuloToUpdate] = useState(null);
  const [idArticuloToBajar, setIdArticuloToBajar] = useState(null);
  const [idUserToCrearteArticulo, setIdUserToCrearteArticulo] = useState(null);
  const [vistaData, setVistaData] = useState([]); // Estado para almacenar los datos de la vista
  const [nombreUsuario, setNombreUsuario] = useState("");

  const [user, setUser] = useState(null);
  const usuario = window.localStorage.getItem("USER_APP");
  useEffect(() => {
    if (usuario) {
      setUser(JSON.parse(usuario));
    }
  }, [usuario]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      // hour: 'numeric',
      // minute: 'numeric',
      // second: 'numeric',
      timeZone: "UTC", // Específicamente para fechas en formato UTC
    };
    return date.toLocaleDateString("es-CL", options); // Cambia 'es-CL' al locale que necesites
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.getReadVista();
        setVistaData(response); // Aquí asumimos que los datos están en response.data.data
      } catch (error) {
        console.error("Error al obtener datos de la vista:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("MY_AUTH_APP") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleBaja = async (event) => {
    setIdArticuloToBajar(event.target.value);
    setNombreUsuario(user.username);
  }

  return (
    <div className="container mx-0">
      <h1>Listado de Artículos</h1>
      {user && user.rol === 3 ? null : (
        <button className="btn btn-success mx-3" data-bs-toggle="modal"
        data-bs-target="#ingresarModal"
        title="Agregar artículo"  onClick={() => {
          setIdUserToCrearteArticulo(user.id)
          }}>
        Agregar Artículo <i className="bi bi-file-earmark-plus-fill"></i>
      </button>
      )}
      <ButtonDescargar tipo="XLS" url={variables.urlReporteExcel} />
      <ButtonDescargar tipo="PDF" url={variables.urlReportePdf} marginLeft="10px"  />
      <button className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#filtroModal">
        Reporte personalizado <i className="bi bi-funnel-fill"></i>
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Año</th>
            <th>Dimensión</th>
            <th>Número</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Glosa</th>
            <th>Fecha ingreso</th>
            <th>Campus</th>
            <th>Departamento</th>
            <th>Oficina</th>
            <th>Categoria</th>
            <th>imagen articulo</th>
            <th>Articulo estado</th>
            {user && user.rol === 3 ? <th></th> :
            <th>
              Acciones
            </th>}
          </tr>
        </thead>
        <tbody className="fw-lighter">
          {vistaData.length !== 0
            ? vistaData.map((item, index) => (
                <tr key={item.ID}>
                  <td>{item.anio}</td>
                  <td>{item.dimension}</td>
                  <td>{item.art_num}</td>
                  <td>{item.art_nombre}</td>
                  <td>{item.art_codigo}</td>
                  <td>{item.art_glosa}</td>
                  <td>{formatDate(item.art_ingreso).toString()}</td>
                  <td>{item.campus}</td>
                  <td>{item.departament}</td>
                  <td>{item.office}</td>
                  <td>{item.categoria}</td>
                  <td>
                    <img
                      src={`http://localhost:8080/` + item.art_image_path}
                      alt={item.art_nombre}
                      width={75}
                    />
                  </td>
                  <td>
                    {item.articulo_estado_id === 1 ? "Inactivo" : "Activo"}
                  </td>
                  <td>
                    <div className="d-flex flex">
                      {user && user.rol === 3 ? null :
                      <>
                      <div>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={handleBaja}
                          data-bs-toggle="modal"
                          data-bs-target="#bajarlModal"
                          title="Dar de baja"
                          value={item.ID}
                        >
                          <i className="bi bi-file-earmark-x"></i>
                        </button>
                      </div>
                      <div>
                        <button
                          className="btn btn-warning"
                          onClick={() => setArticuloToUpdate(item)}
                          data-bs-toggle="modal"
                          data-bs-target="#editarlModal"
                          title="Editar"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                      </div>
                      </>
                      }
                    </div>
                  </td>
                </tr>
              ))
            : "Cargando..."}
        </tbody>
      </table>
      {/* <!-- Modal editar articulo --> */}
      <div
        class="modal fade"
        id="editarlModal"
        tabindex="-1"
        aria-labelledby="editarLabel"
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
              <EditarArticulo articulo={articuloToUpdate} />
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
      {/* <!-- Modal bajar articulo --> */}
      <div
        class="modal fade"
        id="bajarlModal"
        tabindex="-1"
        aria-labelledby="bajarLabel"
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
              <DarDeBaja articulo={idArticuloToBajar} usuario={nombreUsuario} />
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
              {/* <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div class="modal-body">
              <AgregarArticulo idUser={idUserToCrearteArticulo} limpiar={true}/>
            </div>
            
          </div>
        </div>
      </div>
      {/* <!-- Modal reporte personalizado --> */}
      <div
        class="modal fade"
        id="filtroModal"
        tabindex="-1"
        aria-labelledby="filtroLabel"
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
              <FiltroReportsComponent />
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
    </div>
  );
}

export default ArticuloComponent;
