import React, { useState, useEffect } from "react";
import { Api } from "../../api/api";
import axios from "axios";
import FileSaver from 'file-saver';
import { variables } from "../../config/const";

const FiltroReportsComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [oficinas, setOficinas] = useState([]);
  const [campus, setCampus] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [dataParaReporte, setDataParaReporte] = useState({});

  const handleChange = (e) => {
    setDataParaReporte({
      ...dataParaReporte,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !dataParaReporte.categoria_id ||
      !dataParaReporte.office_id ||
      !dataParaReporte.campus_id ||
      !dataParaReporte.departament_id ||
      !dataParaReporte.tipo_formato
    ) {
      alert("Todos los campos son requeridos");
      return;
    }

    const dataFormat = {
      categoria_id: parseInt(dataParaReporte.categoria_id),
      office_id: parseInt(dataParaReporte.office_id),
      campus_id: parseInt(dataParaReporte.campus_id),
      departament_id: parseInt(dataParaReporte.departament_id),
      tipo_formato: dataParaReporte.tipo_formato,
    };

    if (dataFormat.tipo_formato === "PDF") {

    const config = {
      responseType: "blob", // Indica que la respuesta será un Blob
    };

    axios
      .post(`${variables.urlBaseBack}/informe/generator_inf`, dataFormat, config)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reporte.pdf");
        link.click();

        // Libera la URL del Blob después de descargar el archivo
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          link.remove();
        }, 100);
      }) // procesa la respuesta como Blob
      .catch((error) => {
        alert("Error al generar el reporte, intente nuevamente.");
        console.log(error);
      });
    } else {
        axios({
            url:`${variables.urlBaseBack}/informe/generator_inf`,
            method: 'POST',
            responseType: 'blob', // Indica que la respuesta será un Blob
            data: dataFormat,
          }).then((response) => {
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            FileSaver.saveAs(blob, 'reporte.xlsx');
          }).catch((error) => {
            alert('Error al generar el reporte, intente nuevamente.');
            console.log(error);
          });
    }

    setDataParaReporte({});
    document.getElementById("categoria_id").value = "";
    document.getElementById("office_id").value = "";
    document.getElementById("campus_id").value = "";
    document.getElementById("departament_id").value = "";
    document.getElementById("tipo_formato").value = "";
  };

  useEffect(() => {
    // Llamadas a los endpoints para obtener los datos necesarios
    Api.getAllDeparments().then((data) => setDepartamentos(data));
    Api.getAllOficinas().then((data) => setOficinas(data));
    Api.getAllCampus().then((data) => setCampus(data));
    Api.getAllCategories().then((data) => setCategorias(data));
  }, []);
  return (
    <>
    <form>
      <div className="container">
        <div className="row">
          <div className="col">
            <label htmlFor="categoria_id" className="form-label">
              Categoría
            </label>
            <select
              id="categoria_id"
              className="form-select"
              onChange={handleChange}
            >
              <option defaultValue>Seleccione una categoría</option>
              {categorias.map((categoria, index) => {
                return (
                  <option key={index} value={categoria.categoria_id}>
                    {categoria.categoria}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col">
            <label htmlFor="office_id" className="form-label">
              Oficina
            </label>
            <select
              id="office_id"
              className="form-select"
              onChange={handleChange}
            >
              <option defaultValue>Seleccione una oficina</option>
              {oficinas.map((oficina, index) => {
                return (
                  <option key={index} value={oficina.office_id}>
                    {oficina.office}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="campus_id" className="form-label">
              Campus
            </label>
            <select
              id="campus_id"
              className="form-select"
              onChange={handleChange}
            >
              <option defaultValue>Seleccione un campus</option>
              {campus.map((campus, index) => {
                return (
                  <option key={index} value={campus.campus_id}>
                    {campus.campus}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col">
            <label htmlFor="departament_id" className="form-label">
              Departamento
            </label>
            <select
              id="departament_id"
              className="form-select"
              onChange={handleChange}
            >
              <option defaultValue>Seleccione un departamento</option>
              {departamentos.map((departamento, index) => {
                return (
                  <option key={index} value={departamento.departament_id}>
                    {departamento.departament}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="tipo_formato" className="form-label">
              Tipo de Formato
            </label>
            <select
              id="tipo_formato"
              className="form-control"
              onChange={handleChange}
            >
              <option defaultValue>Seleccione un tipo de formato</option>
              <option value="PDF">PDF</option>
              <option value="XLS">XLS</option>
            </select>
          </div>
        </div>
      </div>
      <div className="d-grid gap-2 pt-3 pb-3">
        <button
          className="btn btn-primary w-50 mx-auto"
          type="button"
          onClick={handleSubmit}
        >
          Generar reporte
        </button>
      </div>
    </form>
    </>
  );
};

export default FiltroReportsComponent;