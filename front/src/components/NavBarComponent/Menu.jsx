<<<<<<< HEAD
import { Link } from "react-router-dom";
import React from "react";
=======
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserAppContext";
import { useAuthContext } from "../../context/AuthContext";

>>>>>>> origin2/develop
export function MenuComponent() {
  const { user, userSetOffSession } = useUserContext();
  const { isAuthenticated, logout } = useAuthContext();
  const [usuario, setUsuario] = useState(null);
  const [loging, setLoging] = useState(false)


  useEffect(() => {
    if (user) setUsuario(user);
    if (isAuthenticated)  setLoging(true)
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    logout();
    userSetOffSession();
   window.location.href = '/';
  }

  const handleClickAdmin = () => {
    window.location.href = '/admin/usuario';
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2 justify-content-center">
      <div className="container-fluid">
<<<<<<< HEAD
        <span className="navbar-brand" href="/home">
=======
        <span className="navbar-brand">
>>>>>>> origin2/develop
          Inventario UTEM
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
<<<<<<< HEAD
            <li className="nav-item">
              <Link to="/home" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/articulo" className="nav-link">
                Tabla Articulos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/usuario" className="nav-link">
                Panel Usuario
              </Link>
            </li>
          </ul>
        </div>
=======
            {isAuthenticated && usuario !== null ? (
              <button className="nav-link active" >Hola, {usuario && usuario.username}</button>
            ) : (
              <li className="nav-item">
                <button className="nav-link active" aria-current="page">
                  <a href="/login">Login </a>
                </button>
              </li>
            )}
            
          </ul>
        </div>
        <div>{usuario && usuario.rol === 1 ? <button type="button" className="btn btn-info mx-3" onClick={handleClickAdmin}>Administrar sistema</button>: null}</div>
        <div>{!loging ? null : <button type="button" className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>}</div>
>>>>>>> origin2/develop
      </div>
    </nav>
  );
}
