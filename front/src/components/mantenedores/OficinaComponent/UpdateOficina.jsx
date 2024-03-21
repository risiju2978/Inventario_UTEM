import React, { useState } from 'react';
import { Api } from '../../../api/api';

const UpdateOficina = ({ oficinaUpdate }) => {
  const [newOficina, setNewOficina] = useState("");

  const handleUpdateOficina = (oficina_id) => {
    if (newOficina === "") {
      alert("Ingrese un nuevo nombre de oficina");
      return;
    }

    Api.updateOficina(oficina_id, newOficina)
      .then(res => {
        console.log(res);
        alert("Oficina actualizada correctamente");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleNewValue = (e) => {
    setNewOficina(e.target.value);
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
          onClick={() => handleUpdateOficina(oficinaUpdate.oficina_id)}
        >
          Actualizar
        </button>
      </form>
    </>
  );
};

export default UpdateOficina;
