import { useState } from 'react'
import React from 'react'
import { Api } from '../../../api/api'

const UpdateCampus = ({campusUpdate}) => {
   const [newCampus, setnewCampus] = useState("")


const handleUpdateCampus = (campus_id) => {
    if(newCampus === ""){
        alert("Ingrese un nuevo nombre de campus")
        return
    }

    console.log(campus_id, newCampus)
    Api.updateSede(newCampus, campus_id)
    .then(res => {
        console.log(res)
        alert("Campus actualizado correctamente")
        window.location.reload()
    })
    .catch((error) => console.log(error) )
}

const handleNewValue = (e) =>{
    setnewCampus(e.target.value)
}


  return (
    <>
    <form id="update_departamento" className=''>
        <input type="text" placeholder='Nuevo nombre de departamento' name="name_update" id="name_update" onChange={handleNewValue} className='px-3 py-2 border-1 rounded rounded-lg'/>
        <input type="hidden" name="campus_update" id="campus_update" />
        <button type="button" className="btn btn-primary mx-3" onClick={() => handleUpdateCampus(campusUpdate.campus_id)}>
          Actualizar
        </button>
      </form>
      
      </>
  )
}

export default UpdateCampus