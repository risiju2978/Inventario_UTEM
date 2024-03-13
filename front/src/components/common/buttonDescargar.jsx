import React from 'react'

const ButtonDescargar = ({url, tipo, margenTop, marginLeft}) => {
  return (
    <button
            type="button"
            style={{ marginTop: margenTop, marginLeft: marginLeft}}
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