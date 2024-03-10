import React, { useState, useEffect } from "react";
import AgregarArticulo from "./AgregarArticulo";
import EditarArticulo from "./EditarArticulo";
import DarDeBaja from "./DarDeBaja";
import axios from "axios";

function ArticuloComponent() {
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false); // Estado para controlar la visibilidad del modal de agregar artículo
  const [modalEditarVisible, setModalEditarVisible] = useState(false); // Estado para controlar la visibilidad del modal de editar artículo
  const [modalDarDeBajaVisible, setModalDarDeBajaVisible] = useState(false); // Estado para controlar la visibilidad del modal de dar de baja artículo
  const [vistaData, setVistaData] = useState([]); // Estado para almacenar los datos de la vista

  const toggleDarDeBajaModal = () => {
    setModalDarDeBajaVisible(!modalDarDeBajaVisible); // Cambia el estado de visibilidad del modal de dar de baja artículo
  };

  const toggleAgregarModal = () => {
    setModalAgregarVisible(!modalAgregarVisible); // Cambia el estado de visibilidad del modal de agregar artículo
  };

  const toggleEditarModal = () => {
    setModalEditarVisible(!modalEditarVisible); // Cambia el estado de visibilidad del modal de editar artículo
  };
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

  return (
    <div className=" container " >
      <h1>Listado de Artículos</h1>
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
              className="acciones-header"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "10px" }}>Acciones</span>
              <AgregarArticulo
                modalVisible={modalAgregarVisible}
                toggleModal={toggleAgregarModal}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {vistaData.map((item) => (
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
                />
              </td>
              <td>{item.articulo_estado}</td>
              <td>
                <DarDeBaja
                  modalVisible={modalDarDeBajaVisible}
                  toggleModal={toggleDarDeBajaModal}
                  item={item.ID}
                />
                <EditarArticulo
                  modalVisible={modalEditarVisible}
                  toggleModal={toggleEditarModal}
                  item={item}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArticuloComponent;
