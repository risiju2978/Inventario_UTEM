import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserAppContext";
import { useAuthContext } from "../../context/AuthContext";

export function MenuComponent() {
  const { user } = useUserContext();
  const { isAuthenticated } = useAuthContext();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (user) setUsuario(user);
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2 justify-content-center">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
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
            {isAuthenticated && usuario !== null ? (
              <button className="nav-link active" >Hola, {usuario.username}</button>
            ) : (
              <li className="nav-item">
                <button className="nav-link active" aria-current="page">
                  <a href="/login">Login </a>
                </button>
              </li>
            )}
            <li className="nav-item">
              <button className="nav-link">Features</button>
            </li>
            <li className="nav-item">
              <button className="nav-link">Pricing</button>
            </li>
            <li className="nav-item">
              <button className="nav-link disabled" aria-disabled="true">
                Disabled
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
