import React, { useState, useEffect } from 'react';
import { Api } from '../../../api/api';

const MantenedorCategoriaComponent = () => {
  const [NuevaCategoria, setNuevaCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
const [CategoriaUpdate, setCategoriaUpdate] = useState('');
const [categoriaEliminar, setCategoriaEliminar] = useState(''); 


  //apartado para actualizar categoria e incluye traer las categorias
  // Define cargarCategorias dentro del componente para poder llamarla después
  const cargarCategorias = async () => {
    try {
      const response = await Api.getAllCategories();
      if (response && Array.isArray(response)) {
        setCategorias(response);
      } else if (response.data && Array.isArray(response.data)) {
        setCategorias(response.data);
      } else {
        console.error('La respuesta no es un arreglo', response);
      }
    } catch (error) {
      console.error('Error al cargar las categorías', error);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);
  
  const handleCategoriaActualizarChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  
  };
  const handleCategoriaUpdateChange = (event) => {
    setCategoriaUpdate(event.target.value);
  };

  const handleUpdateCategoria = async () => {
    if (!categoriaSeleccionada) {
      alert('Por favor, seleciona una Categoria.');
      return;
    }

    try {
      const UpdateCategoria = {
        categoria_id:categoriaSeleccionada ,
        categoria:CategoriaUpdate

      };
      const response = await Api.updateCategoria(UpdateCategoria);
      console.log('Categoría actualizada con éxito', response);
      alert('Categoria actualizada con éxito');
      setCategoriaUpdate(''); // Limpiar el campo después de la actualización
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar la categoría', error);
      alert('Error al actualizar la categoría');
    }
  };
  
//fin apartado actualizar categoria

//apartado para eliminar categoria
const handleCategoriaEliminarChange = (event) => {
  setCategoriaEliminar(event.target.value);
};

const handleDeleteCategoria = async () => {
  if (!categoriaEliminar) {
    alert('Por favor, selecciona una categoría para eliminar.');
    return;
  }

  try {
    const categoriasEliminar = {
      categoria_id:categoriaEliminar ,
    };
    await Api.deleteCategoria(categoriasEliminar); 
    alert('Categoría eliminada con éxito');
    // Actualiza la lista de categorías después de la eliminación
    cargarCategorias();
    window.location.reload();
  } catch (error) {
    console.error('Error al eliminar la categoría', error);
    alert('Error al eliminar la categoría');
  }
};


//fin de categoria eliminar

//apartado para crear categoria
  const handleNuevaCategoriaChange = (event) => {
    setNuevaCategoria(event.target.value);
  };

  const handleCreateCategoria = async () => {
    if (!NuevaCategoria) {
      alert('Por favor, ingresa una nueva Categoria.');
      return;
    }

    try {
      const nombreCategoria = {
        categoria: NuevaCategoria,
      };
      const response = await Api.createCategoria(nombreCategoria);
      console.log('Categoría creada con éxito', response);
      alert('Categoria creada con éxito');
      setNuevaCategoria(''); // Limpiar el campo después de la actualización
      window.location.reload();
    } catch (error) {
      console.error('Error al crear la categoría', error);
      alert('Error al crear la categoría');
    }
  };
//fin de apartado de creacion
 

  return (
    <div className="mantenedor-container">
      {/* Botones para abrir los modales */}
      <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#crearCategoriaModal">Crear Categoría</button>
      <button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#actualizarCategoriaModal">Actualizar Categoría</button>
      <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eliminarCategoriaModal">Eliminar Categoría</button>

      {/* Modal para Crear */}
      <div className="modal fade" id="crearCategoriaModal" tabIndex="-1" aria-labelledby="crearCategoriaModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="crearCategoriaModalLabel">Crear Categoría</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" value={NuevaCategoria} onChange={handleNuevaCategoriaChange} placeholder="Ingrese nueva Categoria" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateCategoria}>Guardar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Actualizar */}
      <div className="modal fade" id="actualizarCategoriaModal" tabIndex="-1" aria-labelledby="actualizarCategoriaModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="actualizarCategoriaModalLabel">Actualizar Categoría</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
            <select value={categoriaSeleccionada} onChange={handleCategoriaActualizarChange} className="form-select mb-3">
  <option value="">Seleccione una categoría</option>
  {categorias.map((categoria, index) => (
    <option key={index} value={categoria.categoria_id}>
      {categoria.categoria}
    </option>
  ))}
</select>

  <input type="text" className="form-control" value={CategoriaUpdate} onChange={handleCategoriaUpdateChange} placeholder="Ingrese nueva Categoria" />
</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateCategoria}>Guardar</button>
            </div>
          </div>
        </div>
      </div>

     {/* Modal para Eliminar */}
     <div className="modal fade" id="eliminarCategoriaModal" tabIndex="-1" aria-labelledby="eliminarCategoriaModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="eliminarCategoriaModalLabel">Eliminar Categoría</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Contenido del modal para eliminar categoría */}
              <select value={categoriaEliminar} onChange={handleCategoriaEliminarChange} className="form-select">
                <option value="">Seleccione una categoría para eliminar</option>
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria.categoria_id}>
                    {categoria.categoria}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteCategoria}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MantenedorCategoriaComponent;
