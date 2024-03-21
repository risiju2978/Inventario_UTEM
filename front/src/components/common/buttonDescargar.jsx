import React from "react";

const ButtonDescargar = ({ url, tipo, margenTop, marginLeft }) => {
  const [tipoDereporte, setTipoDereporte] = React.useState("");

  const handleTypeOfReport = (e) => {
    
    setTipoDereporte(e.target.value);
    console.log(e.target.value)
  };

  const handleClick = () => {
    if ( tipoDereporte === "todos") {
      window.open(url, "_blank");
    }else if ( tipoDereporte === "1") {
      window.open(url + "?activo=1", "_blank");
    } else if ( tipoDereporte === "2") {
      window.open(url + "?activo=2", "_blank");
    }  
  };
  return (
    <>
      <fomr>
        <div className="d-flex flex-column">
          <button
            type="button"
            style={{ marginTop: margenTop, marginLeft: marginLeft }}
            className={"btn btn-info"}
            onClick={handleClick}
            disabled={tipoDereporte === "" ? true : false}
          >
            Descargar reporte {tipo}
          </button>
          <div className="d-flex flex-row space-between align-items-center my-1">
            <select className="px-1 py-1 border-1 rounded rounded-sm mx-auto" onChange={handleTypeOfReport}>
              <option defaultValue value={""}>Selecciona un tipo</option>
              <option value={"todos"}>Todos</option>
              <option value={"1"}>Activos</option>
              <option value={"2"}>Inactivos</option>
            </select>
       
          </div>
        </div>
      </fomr>
    </>
  );
};

export default ButtonDescargar;
