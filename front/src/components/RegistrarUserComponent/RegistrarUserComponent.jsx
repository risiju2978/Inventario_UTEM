// componente para registrar un usuario debe contener el formulario para registrar un usuario con los campos username, email, campus_id, rol_id, user_state, password
// los campos campus_id, rol_id y user_state deben ser un select con las opciones que se pueden seleccionar
// utilizar el servicio de crear usuario de la API
// utilizar el servicio de listar campus de la API
// utilizar el servicio de listar roles de la API
// utilizar el servicio de listar estados de usuario de la API
// utilizar clases de bootstrap 5 para el formulario
import React from 'react'

const RegistrarUserComponent = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h1>Registrar Usuario</h1>
            <form>
                <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Nombre de usuario
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                />
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                />
                </div>
                <div className="mb-3">
                <label htmlFor="campus" className="form-label">
                    Campus
                </label>
                <select className="form-select" id="campus">
                    <option selected>Selecciona un campus</option>
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="rol" className="form-label">
                    Rol
                </label>
                <select className="form-select" id="rol">
                    <option selected>Selecciona un rol</option>
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="userState" className="form-label">
                    Estado de usuario
                </label>
                <select className="form-select" id="userState">
                    <option selected>Selecciona un estado</option>
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Contraseña
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                />
                </div>
                <button type="submit" className="btn btn-primary">
                Registrar
                </button>
            </form>
            </div>
        </div>
    </div>
   
  )
}

export default RegistrarUserComponent