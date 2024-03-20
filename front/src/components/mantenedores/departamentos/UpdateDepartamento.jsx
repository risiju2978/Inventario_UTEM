import { useEffect, useState } from 'react'
import React from 'react'
import { Api } from '../../../api/api'

const UpdateDepartamento = ({departamentoUpdate}) => {
   const [newDepartamento, setNewDepartamento] = useState("")


const handleUpdateDepartamento = (departament_id) => {
    if(newDepartamento === ""){
        alert("Ingrese un nuevo nombre de departamento")
        return
    }

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
    <>
    <form id="update_departamento" className=''>
        <input type="text" placeholder='Nuevo nombre de departamento' name="name_update" id="name_update" onChange={handleNewValue} className='px-3 py-2 border-1 rounded rounded-lg'/>
        <input type="hidden" name="campus_update" id="campus_update" />
        <button type="button" className="btn btn-primary mx-3" onClick={() => handleUpdateDepartamento(departamentoUpdate.departament_id)}>
          Actualizar
        </button>
      </form>
      
      </>
  )
}

export default UpdateDepartamento