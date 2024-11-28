import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate(); // Usamos useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === 'user@example.com' && password === 'password') {
      // Redirige al dashboard si las credenciales son correctas
      navigate('/dashboard');
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
