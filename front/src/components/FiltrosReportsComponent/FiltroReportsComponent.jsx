import React, { useState, useEffect } from 'react';

const FiltroReportsComponent = () => {
    const [fechasFin, setFechasFin] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [oficinas, setOficinas] = useState([]);
    const [campus, setCampus] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [articulosBaja, setArticulosBaja] = useState([]);

    useEffect(() => {
        // Llamadas a los endpoints para obtener los datos necesarios
        // Ejemplo:
        fetch('/api/fechasFin')
            .then(response => response.json())
            .then(data => setFechasFin(data));

        fetch('/api/categorias')
            .then(response => response.json())
            .then(data => setCategorias(data));

        // Repite el proceso para los demás endpoints
    }, []);
// utiliza bootstrap 5 para darle estilo a los campos select
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <label htmlFor="fechaFin" className="form-label">Fecha de fin</label>
                    <select id="fechaFin" className="form-select">
                        <option value="">Seleccione una fecha</option>
                        {fechasFin.map((fecha, index) => {
                            return <option key={index} value={fecha}>{fecha}</option>
                        })}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <select id="categoria" className="form-select">
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((categoria, index) => {
                            return <option key={index} value={categoria.id}>{categoria.nombre}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="oficina" className="form-label">Oficina</label>
                    <select id="oficina" className="form-select">
                        <option value="">Seleccione una oficina</option>
                        {oficinas.map((oficina, index) => {
                            return <option key={index} value={oficina.id}>{oficina.nombre}</option>
                        })}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="campus" className="form-label">Campus</label>
                    <select id="campus" className="form-select">
                        <option value="">Seleccione un campus</option>
                        {campus.map((campus, index) => {
                            return <option key={index} value={campus.id}>{campus.nombre}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="departamento" className="form-label">Departamento</label>
                    <select id="departamento" className="form-select">
                        <option value="">Seleccione un departamento</option>
                        {departamentos.map((departamento, index) => {
                            return <option key={index} value={departamento.id}>{departamento.nombre}</option>
                        })}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="articuloBaja" className="form-label">Artículo dado de baja</label>
                    <select id="articuloBaja" className="form-select">
                        <option value="">Seleccione un artículo</option>
                        {articulosBaja.map((articulo, index) => {
                            return <option key={index} value={articulo.id}>{articulo.nombre}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FiltroReportsComponent;