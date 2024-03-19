import React, { useState } from 'react';
import { Api } from '../../api/api';

const ActualizarPasswordComponent = ({ userId }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      alert('Por favor, ingresa una nueva contraseña.');
      return;
    }

    try {
      const userData = {
        user_id: userId,
        password: newPassword,
      };

      const response = await Api.editarPasswordUsuario(userData);
      console.log('Contraseña actualizada con éxito', response);
      alert('Contraseña actualizada con éxito');
      setNewPassword(''); // Limpiar el campo después de la actualización
      // No necesitas manejar el estado del modal aquí
      //recargar para cerrar
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar la contraseña', error);
      alert('Error al actualizar la contraseña');
    }
  };

  return (
    <div className="modal-body">
      <h4>Cambiar Contraseña</h4>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="Nueva Contraseña"
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdatePassword}>Actualizar</button>
    </div>
  );
};

export default ActualizarPasswordComponent;
