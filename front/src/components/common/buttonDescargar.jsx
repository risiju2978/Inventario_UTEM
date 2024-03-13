import React from 'react'

const ButtonDescargar = ({url, tipo}) => {
  return (
    <button
            type="button"
            class="btn btn-info"
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