import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserAppContext";
import { useAuthContext } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";



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

  return (<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2 justify-content-center">
      <div className="container-fluid">
        <Link to="/" className="text-decoration-none">
        <span className="navbar-brand">
          Inventario UTEM
        </span>
        </Link>
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
        <div>{usuario && (usuario.rol === 1 || usuario.rol === 2 ) ? <button type="button" className="btn btn-info mx-3"><Link className="text-white text-decoration-none" to={"/admin/usuario"}>Administrar sistema</Link> </button>: null}</div>
        <div>{!loging ? null : <button type="button" className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>}</div>
      </div>
    </nav>
    <Outlet />
    </>
  );
}
