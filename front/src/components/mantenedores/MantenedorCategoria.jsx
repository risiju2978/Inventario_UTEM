import React, { useState } from "react";

const MantenedorCategoriaComponent = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="mantenedor-container">
      <button className="btn btn-create" onClick={() => setShowCreateModal(true)}>Crear Categoría</button>
      <button className="btn btn-update" onClick={() => setShowUpdateModal(true)}>Actualizar Categoría</button>
      <button className="btn btn-delete" onClick={() => setShowDeleteModal(true)}>Eliminar Categoría</button>

      {/* Modal para Crear */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowCreateModal(false)}>&times;</span>
            {/* Contenido del modal para crear categoría */}
          </div>
        </div>
      )}

      {/* Modal para Actualizar */}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
            {/* Contenido del modal para actualizar categoría */}
          </div>
        </div>
      )}

      {/* Modal para Eliminar */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
            {/* Contenido del modal para eliminar categoría */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MantenedorCategoriaComponent;
