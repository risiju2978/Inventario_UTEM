import React, { useState } from "react";

const MantenedorCategoriaComponent = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Handlers para abrir/cerrar modales
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  return (
    <div>
      <button onClick={handleShowCreateModal}>Crear Categoría</button>
      <button onClick={handleShowUpdateModal}>Actualizar Categoría</button>
      <button onClick={handleShowDeleteModal}>Eliminar Categoría</button>

      {/* Modal para Crear */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseCreateModal}>&times;</span>
            {/* Contenido del modal para crear categoría */}
          </div>
        </div>
      )}

      {/* Modal para Actualizar */}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseUpdateModal}>&times;</span>
            {/* Contenido del modal para actualizar categoría */}
          </div>
        </div>
      )}

      {/* Modal para Eliminar */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseDeleteModal}>&times;</span>
            {/* Contenido del modal para eliminar categoría */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MantenedorCategoriaComponent;
