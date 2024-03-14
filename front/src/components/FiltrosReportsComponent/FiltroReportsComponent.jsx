import React, { useState, useEffect } from 'react';
import { Api } from '../../api/api';

const FiltroReportsComponent = () => {
    const [fechasFin, setFechasFin] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [oficinas, setOficinas] = useState([]);
    const [campus, setCampus] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [articulosBaja, setArticulosBaja] = useState([]);

    useEffect(() => {
        // Llamadas a los endpoints para obtener los datos necesarios
        Api.getAllDeparments().then(data => setDepartamentos(data))
        Api.getAllOficinas().then(data => setOficinas(data))
        Api.getAllCampus().then(data => setCampus(data))
        Api.getAllCategories().then(data => setCategorias(data))

        console.log(departamentos, oficinas, campus, categorias)
       
        // Repite el proceso para los demás endpoints
    }, []);
// utiliza bootstrap 5 para darle estilo a los campos select
    return (
        <form>
        <div className="container">
            <div className="row">
                <div className="col">
                  <label htmlFor="categoria" className="form-label">Categoría</label>
                    <select id="categoria" className="form-select">
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((categoria, index) => {
                            return <option key={index} value={categoria.categoria_id}>{categoria.categoria}</option>
                        })}
                    </select>
                    </div>
                <div className="col">
                    <label htmlFor="oficina" className="form-label">Oficina</label>
                    <select id="oficina" className="form-select">
                        <option value="">Seleccione una oficina</option>
                        {oficinas.map((oficina, index) => {
                            return <option key={index} value={oficina.office_id}>{oficina.office}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="campus" className="form-label">Campus</label>
                    <select id="campus" className="form-select">
                        <option value="">Seleccione un campus</option>
                        {campus.map((campus, index) => {
                            return <option key={index} value={campus.campus_id}>{campus.campus}</option>
                        })}
                    </select>
                </div>
                <div className="col">
                     <label htmlFor="departamento" className="form-label">Departamento</label>
                    <select id="departamento" className="form-select">
                        <option value="">Seleccione un departamento</option>
                        {departamentos.map((departamento, index) => {
                            return <option key={index} value={departamento.departament_id}>{departamento.departament}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col">
                </div>
            </div>
        </div>
        <div className="d-grid gap-2 pt-3 pb-3">
            <button className="btn btn-primary w-50 mx-auto" type="submit">Generar reporte</button>
        </div>
    </form>
    );
};

export default FiltroReportsComponent;