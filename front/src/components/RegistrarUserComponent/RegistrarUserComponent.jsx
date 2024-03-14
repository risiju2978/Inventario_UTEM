
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../api/api";

const RegistrarUserComponent = () => {
  const history = useNavigate();
  const [campus, setCampus] = useState([]);
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [userDataRegister, setUserDataRegister] = useState({
    username: "",
    email: "",
    campus_id: 1,
    rol_id: "",
    user_state: "",
    password: "",
  });

  useEffect(() => {
    Api.getAllCampus()
      .then((response) => {
        setCampus(response);
      })
      .catch((error) => {
        console.log("Error al obtener campus", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setUserDataRegister({
      ...userDataRegister,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userDataRegister)
    if (
      userDataRegister.username === "" ||
      userDataRegister.email === "" ||
      userDataRegister.password === "" ||
      userDataRegister.rol_id === "" ||
      userDataRegister.user_state === ""
    ) {
      alert("Todos los campos son requeridos");
      return;
    }
    Api.createUser(userDataRegister)
        .then((response) => {
            console.log("Usuario registrado", response);
            alert("Usuario registrado con exito");
            window.location.reload();
        })
        .catch((error) => {
            console.log("Error al registrar usuario", error);
        });
    };
       

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Registrar Usuario</h1>
          <form>
            <div className="row">
              <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="emailHelp"
                name="username"
                onChange={handleInputChange}
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
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
            </div>
            <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="campus" className="form-label">
                Campus
              </label>
              <select className="form-select" id="campus" name="campus">
                <option selected>Selecciona un campus</option>
                {campus && campus.map((campus) => (
                  <option key={campus.campus_id} value={campus.campus_id}>
                    {campus.campus}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="rol_id" className="form-label">
                Rol
              </label>
              <select className="form-select" id="rol_id" name="rol_id" onChange={handleInputChange}>
                <option selected>Selecciona un rol</option>
                <option value="1">Super administrador</option>
                <option value="2">Administrador</option>
                <option value="3">Usuario</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="user_state" className="form-label">
                Estado de usuario
              </label>
              <select
                className="form-select"
                id="user_state"
                name="user_state"
                onChange={handleInputChange}
              >
                <option selected>Selecciona un estado</option>
                <option value="1">Activo</option>
                <option value="0">Baneado</option>
              </select> 
            </div>
            </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarUserComponent;
