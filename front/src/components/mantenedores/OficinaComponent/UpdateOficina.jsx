import React, { useState } from 'react';
import { Api } from '../../../api/api';

const UpdateOficina = ({  oficinaUpdate  }) => {
  const [newNombreOficina, setNewNombreOficina] = useState("");

  const handleUpdateOficina = (oficinaData) => {
    if (newNombreOficina === "") {
      alert("Ingrese un nuevo nombre de oficina");
      return;
    }
  // Usar directamente oficinaData para obtener oficina_id y departament_id
  const { office_id, departament_id } = oficinaData;

    Api.updateOficina(office_id, departament_id, newNombreOficina)
      .then(res => {
        console.log(res);
        alert("Oficina actualizada correctamente");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleNewValue = (e) => {
    setNewNombreOficina(e.target.value);
  };

  return (
    <>
      <form id="update_oficina" className=''>
        <input
          type="text"
          placeholder='Nuevo nombre de oficina'
          name="name_update"
          id="name_update"
          onChange={handleNewValue}
          className='px-3 py-2 border-1 rounded rounded-lg'
        />
        <button
          type="button"
          className="btn btn-primary mx-3"
          onClick={() => handleUpdateOficina(oficinaUpdate)}
        >
          Actualizar
        </button>
      </form>
    </>
  );
};

export default UpdateOficina;
