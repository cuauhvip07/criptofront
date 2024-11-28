import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Usamos React Router para la redirección

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inicializamos useNavigate para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de las contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Hacemos la solicitud POST al backend
      const apiUrl = process.env.REACT_APP_API_URL
      const response = await axios.post(`${apiUrl}/api/register`, {
        name,
        email,
        password,
        confirmPassword,
      });

      // Si la respuesta es exitosa, mostramos un mensaje de éxito
      if (response.data.success) {
        setMessage('Usuario registrado exitosamente. Revisa tu correo para verificar tu cuenta.');
        
        // Redirigir a la página de verificación del token después de 3 segundos
        setTimeout(() => {
          navigate('/verify-token'); // Esto usa React Router para redirigir
        }, 3000);
      }
    } catch (err) {
      // Si ocurre un error, mostramos un mensaje de error
      setError(err.response?.data?.message || 'Hubo un error al registrar el usuario.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Registrarse</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {message && <p className="text-green-500 text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
