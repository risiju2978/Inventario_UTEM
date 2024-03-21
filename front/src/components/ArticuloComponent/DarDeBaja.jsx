import React, { useState } from "react";
import { useEffect } from "react";
import { Api } from "../../api/api";

const DarDeBaja = ({ articulo, usuario }) => {
  const [motivoBaja, setMotivoBaja] = useState("");
  const [autorizacion, setAutorizacion] = useState("");
  const [error, setError] = useState("");
  const [articuloId, setArticuloId] = useState("");

  const darDeBaja = async () => {
    console.log(articuloId, autorizacion, motivoBaja)
    if(!articuloId || !autorizacion || !motivoBaja){
      setError("Debe completar todos los campos");
      return;
    }
    try {
      const fechaBaja = new Date().toDateString()
      console.log("Datos baja");
      const response = await Api.darBajaArticulo({
        id_articulo: articulo,
        motivo_baja: motivoBaja,
        autorizacion: autorizacion,
        articulo_estado_id: 2,
        fecha_baja: fechaBaja,
      });
      console.log("Artículo dado de baja correctamente:", response.data);
      alert("Artículo dado de baja correctamente");
      window.location.reload();
    } catch (error) {
      setError("Error al dar de baja el artículo");
      console.error("Error al dar de baja el artículo:", error);
    }
  };

  useEffect(() => {
   
      setAutorizacion(usuario);
      setArticuloId(articulo);
  
  }, [articulo, usuario]);

  const limpiarForm = () => {
    setAutorizacion("");
    setMotivoBaja("");
    setError("");
    document.getElementById("motivoBaja");
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="motivoBaja" className="form-label">
            Motivo de Baja:
          </label>
          <input
            type="text"
            className="form-control"
            id="motivoBaja"
            value={motivoBaja}
            onChange={(e) => setMotivoBaja(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="autorizacion" className="form-label">
            Autorización:
          </label>
          <p>
            Usuario activo: <strong>{usuario}</strong>
          </p>
        </div>
        {error && <div className="text-danger">{error}</div>}
        <button type="button" className="btn btn-danger" onClick={darDeBaja}>
          Confirmar Baja
        </button>
      </form>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={limpiarForm}>
          Cerrar
        </button>
      </div>
    </>
  );
};

export default DarDeBaja;
