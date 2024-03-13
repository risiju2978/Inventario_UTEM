import React from 'react'

const ButtonDescargar = () => {
  return (
    <button
            type="button"
            class="btn btn-info mt-3"
            onClick={() => {
              window.open(
                "http://localhost:8080/api/informe/generator_inf",
                "_blank"
              );
            }}
          >
            Descargar reporte PDF
          </button>
  )
}

export default ButtonDescargar