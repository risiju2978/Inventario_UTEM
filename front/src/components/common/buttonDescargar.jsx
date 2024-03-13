import React from 'react'

const ButtonDescargar = ({url, tipo, margenTop}) => {
  return (
    <button
            type="button"
            style={{ marginTop: margenTop }}
            className={"btn btn-info"}
            onClick={() => {
              window.open(
                url,
                "_blank"
              );
            }}
          >
            Descargar reporte {tipo}
          </button>
  )
}

export default ButtonDescargar