import React, { useState } from "react";

const MantenedorOficinaComponent = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="mantenedor-container">
      <button className="btn btn-create" onClick={() => setShowCreateModal(true)}>Crear Oficina</button>
      <button className="btn btn-update" onClick={() => setShowUpdateModal(true)}>Actualizar Oficina</button>
      <button className="btn btn-delete" onClick={() => setShowDeleteModal(true)}>Eliminar Oficina</button>

      {/* Modal para Crear */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowCreateModal(false)}>&times;</span>
            {/* Contenido del modal para crear oficina */}
          </div>
        </div>
      )}

      {/* Modal para Actualizar */}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
            {/* Contenido del modal para actualizar oficina */}
          </div>
        </div>
      )}

      {/* Modal para Eliminar */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
            {/* Contenido del modal para eliminar oficina */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MantenedorOficinaComponent;
