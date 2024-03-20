import { useEffect, useState } from 'react'
import React from 'react'
import { Api } from '../../../api/api'

const UpdateDepartamento = ({departamentoUpdate}) => {
   const [newDepartamento, setNewDepartamento] = useState([])


const handleUpdateDepartamento = (departament_id) => {
    console.log(departament_id, newDepartamento)
    Api.updateDepartamento(departament_id, newDepartamento)
    .then(res => {
        console.log(res)
        alert("Departamento actualizado correctamente")
        window.location.reload()
    })
    .catch((error) => console.log(error) )
}

const handleNewValue = (e) =>{
    setNewDepartamento(e.target.value)
}


  return (
    <form id="update_departamento">
        <input type="text" defaultValue={departamentoUpdate.departament} name="name_update" id="name_update" onChange={handleNewValue}/>
        <input type="hidden" name="campus_update" id="campus_update" />
        <button type="button" className="btn btn-primary" onClick={() => handleUpdateDepartamento(departamentoUpdate.departament_id)}>
          Actualizar
        </button>
      </form>
  )
}

export default UpdateDepartamento