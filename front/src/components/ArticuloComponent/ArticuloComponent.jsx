import React, { useState, useEffect } from "react";
import AgregarArticulo from "./AgregarArticulo";
import EditarArticulo from "./EditarArticulo";
import DarDeBaja from "./DarDeBaja";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArticuloComponent() {
  const [articuloToUpdate, setArticuloToUpdate] = useState(null);
  const [idArticuloToBajar, setIdArticuloToBajar] = useState(null);
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false); // Estado para controlar la visibilidad del modal de agregar artículo
  const [vistaData, setVistaData] = useState([]); // Estado para almacenar los datos de la vista


  const toggleAgregarModal = () => {
    setModalAgregarVisible(!modalAgregarVisible); // Cambia el estado de visibilidad del modal de agregar artículo
  };

  const [user, setUser] = useState(null);
  const usuario = window.localStorage.getItem("USER_APP");
  useEffect(() => {
    if (usuario) {
      setUser(JSON.parse(usuario));
    }
    console.log(usuario);
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
        const response = await axios.get(
          "http://localhost:8080/api/vista/readVista"
        );
        setVistaData(response.data.data); // Aquí asumimos que los datos están en response.data.data
        console.log(response.data.data);
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

  return (
    <div className="container mx-0">
      <h1>Listado de Artículos</h1>
      {user && user.rol === 3 ? null : (
        <AgregarArticulo
          modalVisible={modalAgregarVisible}
          toggleModal={toggleAgregarModal}
        />
      )}
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
            <th
            // className="acciones-header"
            // style={{alignItems: "center" }}
            >
              Acciones
            </th>
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
                      <div>
                         <button
                          className="btn btn-danger mx-2"
                          onClick={() => setIdArticuloToBajar(item.ID)}
                          data-bs-toggle="modal"
                          data-bs-target="#bajarlModal"
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
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                      </div>
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
              <DarDeBaja articulo={idArticuloToBajar} />
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
