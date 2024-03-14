import { Link } from "react-router-dom";
import React from "react";
export function MenuComponent() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2 justify-content-center">
      <div className="container-fluid">
        <span className="navbar-brand" href="/home">
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
      </div>
    </nav>
  );
}
