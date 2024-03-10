import React, { useState, useEffect } from "react";
import axios from "axios";
import { Api } from "../../api/api";

const AgregarArticulo = ({ modalVisible, toggleModal }) => {
  const [formData, setFormData] = useState({});
  const [departamentos, setDepartamentos] = useState([]); // Estado para almacenar los datos de la vista
  const [oficinas, setOficinas] = useState([]); // Estado para almacenar los datos de la vista

  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({}); // Estado para manejar los errores de validación

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUploadFile = (event) => {
    if (!event.target.files[0]) {
      alert("Please select a file");
      return;
    }
    setFile(event.target.files[0]);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.usuario_id) {
      errors.usuario_id = "El usuario es requerido";
      isValid = false;
    }

    if (!formData.anio) {
      errors.anio = "El año es requerido";
      isValid = false;
    }

    if (!formData.dimension) {
      errors.dimension = "La dimensión es requerida";
      isValid = false;
    }

    if (!formData.art_num) {
      errors.art_num = "El número es requerido";
      isValid = false;
    }

    if (!formData.art_nombre) {
      errors.art_nombre = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.art_codigo) {
      errors.art_codigo = "El código es requerido";
      isValid = false;
    }

    if (!formData.art_glosa) {
      errors.art_glosa = "La glosa es requerida";
      isValid = false;
    }

    if (!file) {
      errors.img = "El path de la imagen es requerido";
      isValid = false;
    }

    if (!formData.articulo_estado_id) {
      errors.articulo_estado_id = "El estado del artículo es requerido";
      isValid = false;
    }

    if (!formData.categoria_id) {
      errors.categoria_id = "La categoría es requerida";
      isValid = false;
    }

    if (!formData.office_id) {
      // Mantenemos 'office_id'
      errors.office_id = "La oficina es requerida";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const Agregar = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (file) {
        const formDataFormat = new FormData();
        formDataFormat.append("img", file);
        formDataFormat.append("usuario_id", formData.usuario_id);
        formDataFormat.append("anio", formData.anio);
        formDataFormat.append("dimension", formData.dimension);
        formDataFormat.append("art_num", formData.art_num);
        formDataFormat.append("art_nombre", formData.art_nombre);
        formDataFormat.append("art_codigo", formData.art_codigo);
        formDataFormat.append("art_glosa", formData.art_glosa);
        formDataFormat.append(
          "articulo_estado_id",
          formData.articulo_estado_id
        );
        formDataFormat.append("categoria_id", formData.categoria_id);
        formDataFormat.append("office_id", formData.office_id);

        try {
          console.log("Datos a enviar:", formDataFormat); // Verifica los datos que estás enviando
          const response = await axios.post(
            "http://localhost:8080/api/articulo/income_art",
            formDataFormat
          );
          console.log("Artículo agregado correctamente:", response.data);
          setFormData({}); // Limpia el formulario después de agregar el artículo
          toggleModal(); // Cierra el modal después de agregar el artículo
        } catch (error) {
          console.log("Error al agregar el artículo:", error);
        }
      }
    }
  };

  useEffect(() => {
    Api.getAllDeparments()
      .then((response) => {
        setDepartamentos(response);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      Api.getAllOficinas()
        .then((response) => {
          setOficinas(response);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <button className="btn btn-success" onClick={toggleModal}>
        Agregar Artículo <i class="bi bi-file-earmark-plus-fill"></i>
      </button>

      {/* Modal */}
      {modalVisible && (
        <div
          className="modal fade show"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Agregar Nuevo Artículo
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                {/* Formulario para ingresar datos del artículo */}
                <form onSubmit={Agregar}>
                  <div className="mb-3">
                    <label className="form-label">Usuario ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="usuario_id"
                      value={formData.usuario_id}
                      onChange={handleInputChange}
                    />
                    {errors.usuario_id && (
                      <span className="text-danger">{errors.usuario_id}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Año</label>
                    <input
                      type="text"
                      className="form-control"
                      name="anio"
                      value={formData.anio}
                      onChange={handleInputChange}
                    />
                    {errors.anio && (
                      <span className="text-danger">{errors.anio}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dimensión</label>
                    <input
                      type="text"
                      className="form-control"
                      name="dimension"
                      value={formData.dimension}
                      onChange={handleInputChange}
                    />
                    {errors.dimension && (
                      <span className="text-danger">{errors.dimension}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Número</label>
                    <input
                      type="text"
                      className="form-control"
                      name="art_num"
                      value={formData.art_num}
                      onChange={handleInputChange}
                    />
                    {errors.art_num && (
                      <span className="text-danger">{errors.art_num}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="art_nombre"
                      value={formData.art_nombre}
                      onChange={handleInputChange}
                    />
                    {errors.art_nombre && (
                      <span className="text-danger">{errors.art_nombre}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Código</label>
                    <input
                      type="text"
                      className="form-control"
                      name="art_codigo"
                      value={formData.art_codigo}
                      onChange={handleInputChange}
                    />
                    {errors.art_codigo && (
                      <span className="text-danger">{errors.art_codigo}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Glosa</label>
                    <input
                      type="text"
                      className="form-control"
                      name="art_glosa"
                      value={formData.art_glosa}
                      onChange={handleInputChange}
                    />
                    {errors.art_glosa && (
                      <span className="text-danger">{errors.art_glosa}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Imagen Path</label>
                    <input
                      type="file"
                      className="form-control"
                      name="img"
                      onChange={handleUploadFile}
                    />
                    {errors.img && (
                      <span className="text-danger">{errors.img}</span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Estado del Artículo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="articulo_estado_id"
                      value={formData.articulo_estado_id}
                      onChange={handleInputChange}
                    />
                    {errors.articulo_estado_id && (
                      <span className="text-danger">
                        {errors.articulo_estado_id}
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Categoría ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="categoria_id"
                      value={formData.categoria_id}
                      onChange={handleInputChange}
                    />
                    {errors.categoria_id && (
                      <span className="text-danger">{errors.categoria_id}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Oficina</label>
                    <select name="office_id" className="form-control" onChange={handleInputChange}>
                      <option value="">Seleccione una oficina</option>
                      {oficinas.map((item, index) => (
                        <option key={index} value={item.office_id}>
                          {item.office}
                        </option>
                      ))}
                    </select>
                    {/* <input
                      type="text"
                      className="form-control"
                      name="office_id"
                      value={formData.office_id}
                      onChange={handleInputChange}
                    /> */}
                    {errors.office_id && (
                      <span className="text-danger">{errors.office_id}</span>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={toggleModal}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Agregar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgregarArticulo;
