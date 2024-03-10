import React, { useState } from "react";
import axios from "axios";

const DarDeBaja = ({ modalVisible, toggleModal, item }) => {
  const [motivoBaja, setMotivoBaja] = useState("");
  const [autorizacion, setAutorizacion] = useState("");
  const [error, setError] = useState("");

  const darDeBaja = async () => {
    try {
      const fechaBaja = new Date().toISOString().slice(0, 19).replace("T", " ");
      const response = await axios.post("http://localhost:8080/api/articulo/baja_art", {
        id_articulo: item,
        motivo_baja: motivoBaja,
        autorizacion: autorizacion,
        articulo_estado_id: 1,
        fecha_baja: fechaBaja
      });
      console.log("Artículo dado de baja correctamente:", response.data);
      toggleModal();
    } catch (error) {
      setError("Error al dar de baja el artículo");
      console.error("Error al dar de baja el artículo:", error);
    }
  };

  return (  
    <>
      <button className="btn btn-danger" style={{ marginRight: "20px" }} onClick={toggleModal}>
      <i class="bi bi-file-earmark-x"></i>
      </button>
      {modalVisible && (
        <div className="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Dar de Baja Artículo</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="motivoBaja" className="form-label">Motivo de Baja:</label>
                    <input type="text" className="form-control" id="motivoBaja" value={motivoBaja} onChange={(e) => setMotivoBaja(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="autorizacion" className="form-label">Autorización:</label>
                    <input type="text" className="form-control" id="autorizacion" value={autorizacion} onChange={(e) => setAutorizacion(e.target.value)} />
                  </div>
                  {error && <div className="text-danger">{error}</div>}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={darDeBaja}>Confirmar Baja</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DarDeBaja;
