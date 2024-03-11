import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Api } from "../../api/api";

const LoginComponent = () => {
  const history = useNavigate();
  const { login } = useAuthContext();
  const [userDataLogin, setUserDataLogin] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setUserDataLogin({
      ...userDataLogin,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userDataLogin.username === "" || userDataLogin.password === "") {
      alert("Todos los campos son requeridos");
      return;
    }

    Api.login(userDataLogin.username, userDataLogin.password)
      .then((res) => {
        console.log(res);
        // if (res.status !== 200) {
        //   console.log(res.error);
        //   return;
        // }
        login();
      })
      .catch((error) => {
        console.log(error);
        alert("Error al iniciar sesión", error.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Acceder al sistema</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="username-login" className="form-label">
                Nombre de usuario
              </label>
              <input
                type="username"
                className="form-control"
                id="username-login"
                aria-describedby="emailHelp"
                onChange={handleInputChange}
                name="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username-login" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password-login"
                onChange={handleInputChange}
                name="password"
              />
            </div>
            <div className="mb-3 form-check"></div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
