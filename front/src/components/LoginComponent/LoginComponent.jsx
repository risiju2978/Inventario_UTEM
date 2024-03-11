import React, { useState } from 'react';
import { Api } from '../../api/api';
import { useAuthContext } from '../../context/AuthContext';
import { useUserContext } from '../../context/UserAppContext';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuthContext()
    const { userSetOnSession } = useUserContext()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        if(username === '' || password === ''){
            alert('Todos los campos son requeridos');
            return;
        }

        Api.login(username, password)
            .then((response) => {
                console.log('Usuario logueado', response);
                alert('Usuario logueado con exito');
                login();
                userSetOnSession(response.id, response.username, response.email, response.token, response.rol);
                window.location.reload();
            })
            .catch((error) => {
                console.log('Error al loguear usuario', error);
            });
    };

    return (
        <div className="container">
            <h1>Registro de Usuarios</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Registrar</button>
            </form>
        </div>
    );
};

export default LoginComponent;