// component para el login de la aplicación, debe tener un formulario con los campos de usuario y contraseña, además de un botón para enviar la información al servidor.
// Utilizar clases de booststrap 5 para el componente.

import React from 'react'

const LoginComponent = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h1>Login</h1>
            <form>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent