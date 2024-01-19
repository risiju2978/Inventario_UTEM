import React, { useEffect, useState } from "react";
import axios from "axios";

export function HomeComponent() {
  const [datos, setDatos] = useState([]);

  const editar = (id) => {
    alert(`Editar producto ${id}`);

    // puedes levantar un modal on boostrap https://getbootstrap.com/docs/5.3/components/modal/
    // hgacer una llamada que lea los datos del producto para llenar el formulario dentro del modal
    //
  };

  const saveData = () => {
    // llamar datos de formulario
    // validar datos
    // guardar valores actualizados en el servicios ( servicio de update de productos ( editArticulos ) )
  };

  const baja = (id) => {
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
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => editar(prod.id)}
                      class="btn btn-primary"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminar(prod.id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      Borrar
                    </button>
                    <button
                      onClick={() => baja(prod.id)}
                      type="button"
                      class="btn btn-info"
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
    </div>
  );
}
