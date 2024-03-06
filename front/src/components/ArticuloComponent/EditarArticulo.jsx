import React, { useState, useEffect } from "react";
import axios from "axios";

const EditarArticulo = ({ modalVisible, toggleModal, item }) => {
  const [formData, setFormData] = useState({
    anio: item.anio || "",
    dimension: item.dimension || "",
    art_num: item.art_num || "",
    art_nombre: item.art_nombre || "",
    art_codigo: item.art_codigo || "",
    art_glosa: item.art_glosa || "",
    art_image_path: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      anio: item.anio || "",
      dimension: item.dimension || "",
      art_num: item.art_num || "",
      art_nombre: item.art_nombre || "",
      art_codigo: item.art_codigo || "",
      art_glosa: item.art_glosa || "",
      art_image_path: "",
    });
  }, [item]);

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
      const base64String = reader.result.split(",")[1];

      setFormData({
        ...formData,
        art_image_path: base64String,
      });
    };

    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

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

    setErrors(errors);
    return isValid;
  };

  const Editar = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put("http://localhost:8080/api/articulo/edit_art", formData);
        console.log("Artículo editado correctamente:", response.data);
        toggleModal();
      } catch (error) {
        console.error("Error al editar el artículo:", error);
      }
    }
  };

  return (
    <div>
      <button className="btn btn-warning" onClick={toggleModal}>
        Editar Artículo
      </button>

      {modalVisible && (
        <div className="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Editar Artículo</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="anio" className="form-label">Año</label>
                    <input type="text" className="form-control" id="anio" name="anio" value={formData.anio} onChange={handleInputChange} />
                    {errors.anio && <div className="text-danger">{errors.anio}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dimension" className="form-label">Dimensión</label>
                    <input type="text" className="form-control" id="dimension" name="dimension" value={formData.dimension} onChange={handleInputChange} />
                    {errors.dimension && <div className="text-danger">{errors.dimension}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="art_num" className="form-label">Número</label>
                    <input type="text" className="form-control" id="art_num" name="art_num" value={formData.art_num} onChange={handleInputChange} />
                    {errors.art_num && <div className="text-danger">{errors.art_num}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="art_nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="art_nombre" name="art_nombre" value={formData.art_nombre} onChange={handleInputChange} />
                    {errors.art_nombre && <div className="text-danger">{errors.art_nombre}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="art_codigo" className="form-label">Código</label>
                    <input type="text" className="form-control" id="art_codigo" name="art_codigo" value={formData.art_codigo} onChange={handleInputChange} />
                    {errors.art_codigo && <div className="text-danger">{errors.art_codigo}</div>}
                  </div>
                  <div className="mb-3">
                    
  <label htmlFor="art_glosa" className="form-label">Glosa</label>
  
  <textarea className="form-control" id="art_glosa" name="art_glosa" value={formData.art_glosa} onChange={handleInputChange} />
  {errors.art_glosa && <div className="text-danger">{errors.art_glosa}</div>}
</div>
                  <div className="mb-3">
                    <label htmlFor="art_image_path" className="form-label">Imagen</label>
                    <input type="file" className="form-control" id="art_image_path" name="art_image_path" onChange={handleFileInputChange} />
                    {errors.art_image_path && <div className="text-danger">{errors.art_image_path}</div>}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={toggleModal}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={Editar}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarArticulo;
