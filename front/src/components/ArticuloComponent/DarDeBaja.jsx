import React, { useState } from "react";
import { useEffect } from "react";
import { Api } from "../../api/api";

const DarDeBaja = ({ articulo, usuario }) => {
  const [motivoBaja, setMotivoBaja] = useState("");
  const [autorizacion, setAutorizacion] = useState("");
  const [error, setError] = useState("");

  const darDeBaja = async () => {
    try {
      const fechaBaja = new Date().toISOString().slice(0, 19).replace("T", " ");
      const response = await Api.darBajaArticulo({
        id_articulo: articulo,
        motivo_baja: motivoBaja,
        autorizacion: autorizacion,
        articulo_estado_id: 1,
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
    if (usuario) {
      setAutorizacion(usuario);
    }
  }
  , [usuario]);

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
          <p>Uuario activo: <strong>{usuario}</strong></p>
        </div>
        {error && <div className="text-danger">{error}</div>}
        <button type="button" className="btn btn-danger" onClick={darDeBaja}>
          Confirmar Baja
        </button>
      </form>
    </>
  );
};

export default DarDeBaja;