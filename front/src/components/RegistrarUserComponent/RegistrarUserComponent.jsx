// componente para registrar un usuario debe contener el formulario para registrar un usuario con los campos username, email, campus_id, rol_id, user_state, password
// los campos campus_id, rol_id y user_state deben ser un select con las opciones que se pueden seleccionar
// utilizar el servicio de crear usuario de la API
// utilizar el servicio de listar campus de la API
// utilizar el servicio de listar roles de la API
// utilizar el servicio de listar estados de usuario de la API
// utilizar clases de bootstrap 5 para el formulario
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
    rol_id: 1,
    user_state: 1,
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
    if (
      userDataRegister.username === "" ||
      userDataRegister.email === "" ||
      userDataRegister.password === ""
    ) {
      alert("Todos los campos son requeridos");
      return;
    }
    Api.createUser(userDataRegister)
        .then((response) => {
            console.log("Usuario registrado", response);
            history("/admin/registrar")
        })
        .catch((error) => {
            console.log("Error al registrar usuario", error);
        });
    };
       

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
              <label htmlFor="campus" className="form-label">
                Campus
              </label>
              <select className="form-select" id="campus" name="campus">
                <option selected>Selecciona un campus</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="rol" className="form-label">
                Rol
              </label>
              <select className="form-select" id="rol" name="rol">
                <option selected>Selecciona un rol</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="estado_user" className="form-label">
                Estado de usuario
              </label>
              <select
                className="form-select"
                id="estado_user"
                name="estado_user"
              >
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
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <button type="button" className="btn btn-primary">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarUserComponent;
