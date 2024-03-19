// crear componente para actualizar usuario, se utilizaran los campos username, email, password, user_id. Utilizar boostrap 5 para el formulario.

import React from "react";

const UpdateUserComponent = () => {
  return (
    <div className="container">
      <h1>Actualizar usuario</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
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
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Actualizar usuario
        </button>
      </form>
    </div>
  );
};

export default UpdateUserComponent;
