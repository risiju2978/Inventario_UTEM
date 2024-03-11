import React from 'react'

const LoginComponent = () => {


    
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <h1>Acceder al sistema</h1>
            <form>
                <div className="mb-3">
                <label htmlFor="username-login" className="form-label">Nombre de usuario</label>
                <input type="username" className="form-control" id="username-login" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                <label htmlFor="username-login" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password-login" />
                </div>
                <div className="mb-3 form-check">
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent