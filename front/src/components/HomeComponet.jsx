import React, { useEffect, useState } from "react";
import axios from "axios";

export function HomeComponent() {
  const [datos, setDatos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    id_articulo: 0,
    anio: 0,
    dimension: "",
    art_num: 0,
    art_nombre: "",
    art_ingreso: "",
    art_codigo: "",
    art_glosa: "",
    art_image_path: "",
  });


  const editarej = (id) => {
    alert(`Editar producto ${id}`);

    // puedes levantar un modal on boostrap https://getbootstrap.com/docs/5.3/components/modal/
    // hgacer una llamada que lea los datos del producto para llenar el formulario dentro del modal
    //
  };
  const saveDataejm = () => {
    // llamar datos de formulario
    // validar datos
    // guardar valores actualizados en el servicios ( servicio de update de productos ( editArticulos ) )
  };

//####################################################################
const editar = async (id) => {
  try {
  /*  const response = await axios.get(`http://localhost:8080/api/articulo/edit_art/id_articulo?=${id_articulo}`);
    const productData = response.data;
    setSelectedProduct(productData);
    setEditedProduct(productData);
    abrirModal();*/
  } catch (error) {
    console.error('Error al obtener el producto:', error);
  }
};

const abrirModal = () => {
  // Lógica para abrir el modal (esto dependerá de la implementación de tu modal)
};

const cerrarModal = () => {
  setSelectedProduct(null);
  setEditedProduct({
    id_articulo: 0,
    anio: 0,
    dimension: "",
    art_num: 0,
    art_nombre: "",
    art_ingreso: "",
    art_codigo: "",
    art_glosa: "",
    art_image_path: "",
  });
  // Lógica para cerrar el modal (esto dependerá de la implementación de tu modal)
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditedProduct((prevProduct) => ({
    ...prevProduct,
    [name]: value,
  }));
};

const saveData = async () => {
  try {
    // Realizar la solicitud PUT con los datos actualizados del producto
    //const response = await axios.put(`http://localhost:8080/api/articulo/edit_art/${editedProduct.id_articulo}`, editedProduct);
    //console.log('Producto actualizado:', response.data);

    // Cerrar el modal después de guardar cambios
    cerrarModal();
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
};


//################################################################


  const DarDeBaja = (id) => {
    // llamar datos de formulario
    // validar datos
    // guardar valores actualizados en el servicios ( servicio de update de productos ( editArticulos ) )
  };

  const eliminar = (id) => {
    alert(`Eliminar producto ${id}`);
  };

  useEffect(() => {
    const getFakeApi = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setDatos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFakeApi();
  }, []);

  return (
    <div className="row">
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {datos.map((prod, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{prod.title}</td>
                <td>{prod.price}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => editar(prod.id)}
                      className="btn btn-primary"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminar(prod.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => DarDeBaja(prod.id)}
                      type="button"
                      className="btn btn-info"
                    >
                      Baja
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

{/* Modal para editar producto */}
{selectedProduct && (
        <div className="modal" tabIndex="-1" role="dialog">
          {/* ... (estructura del modal) */}
          <div className="modal-body">
            {/* Campos de formulario para editar los datos */}
            <div className="form-group">
              <label htmlFor="anio">Año:</label>
              <input type="number" className="form-control" id="anio" name="anio" value={editedProduct.anio} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="dimension">Dimensión:</label>
              <input type="text" className="form-control" id="dimension" name="dimension" value={editedProduct.dimension} onChange={handleInputChange} />
            </div>
            {/* Agrega campos de formulario similares para las otras propiedades del producto */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={saveData}>
              Guardar Cambios
            </button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );

}
