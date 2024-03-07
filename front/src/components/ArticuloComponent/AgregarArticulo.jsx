import React, { useState } from "react";
import axios from "axios";

const AgregarArticulo = ({ modalVisible, toggleModal }) => {
  const [formData, setFormData] = useState({
    usuario_id: "",
    anio: "",
    dimension: "",
    art_num: "",
    art_nombre: "",
    art_codigo: "",
    art_glosa: "",
    art_image_path: '',
    articulo_estado_id: "",
    categoria_id: "",
    office_id: "",  
  });

  const [errors, setErrors] = useState({}); // Estado para manejar los errores de validación

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Una vez que se ha leído completamente el archivo, se convierte a base64
      const base64String = reader.result.split(",")[1];

      setFormData({
        ...formData,
        art_image_path: base64String,
      });
    };

    // Comenzar a leer el archivo como base64
    reader.readAsDataURL(file);
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

    if (!formData.art_image_path) {
      errors.art_image_path = "El path de la imagen es requerido";
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

    if (!formData.office_id) {  // Mantenemos 'office_id'
      errors.office_id = "La oficina es requerida";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const Agregar = async () => {
    if (validateForm()) {
      try {
        console.log("Datos a enviar:", formData); // Verifica los datos que estás enviando
        const response = await axios.post("http://localhost:8080/api/articulo/income_art", formData);
        console.log("Artículo agregado correctamente:", response.data);
        toggleModal(); // Cierra el modal después de agregar el artículo
      } catch (error) {
        console.log("Error al agregar el artículo:", error);
      }
    }
  };

  return (
    <div>
      <button className="btn btn-success" onClick={toggleModal}>
        Agregar Artículo
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
                <form>
                  <div className="mb-3">
                    <label className="form-label">Usuario ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="usuario_id"
                      value={formData.usuario_id}
                      onChange={handleInputChange}
                    />
                    {errors.usuario_id && <span className="text-danger">{errors.usuario_id}</span>}
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
                    {errors.anio && <span className="text-danger">{errors.anio}</span>}
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
                    {errors.dimension && <span className="text-danger">{errors.dimension}</span>}
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
                    {errors.art_num && <span className="text-danger">{errors.art_num}</span>}
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
                    {errors.art_nombre && <span className="text-danger">{errors.art_nombre}</span>}
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
                    {errors.art_codigo && <span className="text-danger">{errors.art_codigo}</span>}
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
                    {errors.art_glosa && <span className="text-danger">{errors.art_glosa}</span>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Imagen Path</label>
                    <input
                      type="file"
                      className="form-control"
                      name="art_image_path"
                      onChange={handleFileInputChange}
                    />
                    {errors.art_image_path && <span className="text-danger">{errors.art_image_path}</span>}
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
                    {errors.articulo_estado_id && <span className="text-danger">{errors.articulo_estado_id}</span>}
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
                    {errors.categoria_id && <span className="text-danger">{errors.categoria_id}</span>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Oficina ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="office_id"
                      value={formData.office_id}
                      onChange={handleInputChange}
                    />
                    {errors.office_id && <span className="text-danger">{errors.office_id}</span>}
                  </div>
                </form>
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
                <button type="button" className="btn btn-primary" onClick={Agregar}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgregarArticulo;
