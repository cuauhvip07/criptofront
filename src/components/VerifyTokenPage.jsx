import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const VerifyTokenPage = () => {
  const navigate = useNavigate(); // Usamos useNavigate
  const [token, setToken] = useState('');
  const [email, setEmail] = useState(''); // Asumimos que el email también será ingresado
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL
      // Enviar una solicitud POST con el email y el token
      const response = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirigir al dashboard si el token es válido
        navigate('/dashboard');
      } else {
        // Mostrar error si el token es inválido
        setError(data.message || 'Token inválido. Por favor, inténtelo de nuevo.');
      }
    } catch (err) {
      // Mostrar error si la solicitud falla
      console.error('Error de red:', err);
      setError('Hubo un problema al verificar el token. Intente nuevamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Verificar Token</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            className="w-full p-2 mt-1 border rounded-md"
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Código del Token</label>
          <input 
            type="text" 
            value={token} 
            onChange={(e) => setToken(e.target.value)} 
            required
            className="w-full p-2 mt-1 border rounded-md"
            placeholder="Ingresa el token"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Verificar Token</button>
      </form>
    </div>
  );
};

export default VerifyTokenPage;
