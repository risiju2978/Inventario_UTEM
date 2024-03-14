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

    return (
        <div>
            <label htmlFor="fechaFin">Fecha Fin:</label>
            <select id="fechaFin" name="fechaFin">
                {fechasFin.map(fecha => (
                    <option key={fecha.id} value={fecha.id}>{fecha.fecha}</option>
                ))}
            </select>

            <label htmlFor="categoria">Categoría:</label>
            <select id="categoria" name="categoria">
                {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                ))}
            </select>
        {/* completa el resto de los campos select */}
            <label htmlFor="departamento">Departamento:</label>
            <select id="departamento" name="departamento">
                {departamentos.map(departamento => (
                    <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
                ))}
            </select>
            
            

            <button type="submit">Filtrar</button>
        </div>
    );
};

export default FiltroReportsComponent;