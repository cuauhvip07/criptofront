import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [file, setFile] = useState(null);
  const [encryptedContent, setEncryptedContent] = useState(null);
  const [decryptedContent, setDecryptedContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [customPublicKey, setCustomPublicKey] = useState('');  // Agregar estado para la clave pública personalizada

  // Fetch para obtener la clave pública al iniciar
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/login';  // Redirigir al login si no hay token
        return;
      }

      try {
        const url = import.meta.env.VITE_API_URL
        const response = await fetch(`${url}/get-public-key`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
          const data = await response.json();
          if (data.success) {
            setUserData(data.publicKey);
          } else {
            setErrorMessage('No se pudo obtener la llave pública: ' + data.message);
          }
        } else {
          throw new Error('La respuesta no es JSON o hubo un problema con la solicitud.');
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setErrorMessage('Error al obtener la llave pública');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Manejo del cambio en el archivo cargado
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Manejo del cambio en la clave pública personalizada
  const handlePublicKeyChange = (e) => {
    setCustomPublicKey(e.target.value);
  };

  // Función para cifrar el archivo con la clave pública
  const handleEncryptFile = async () => {
    if (!file) {
      setErrorMessage('Por favor selecciona un archivo');
      return;
    }

    const publicKey = customPublicKey || userData; // Usar la clave pública personalizada si existe, o la clave obtenida del backend

    if (!publicKey) {
      setErrorMessage('No hay clave pública disponible');
      return;
    }

    // Aquí deberías realizar el cifrado con la clave pública (RSA)
    // Puedes usar una librería como `crypto` para realizar este cifrado
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileContent = reader.result;
        // Cifrado con RSA, aquí deberías hacer la llamada a tu lógica de cifrado
        // setEncryptedContent(encryptedData);
        console.log("Archivo cifrado", fileContent); // Placeholder para cifrado

      };
      reader.readAsText(file); // Leer el archivo como texto
    } catch (error) {
      setErrorMessage('Error al cifrar el archivo: ' + error.message);
    }
  };

  // Función para descifrar el archivo con la clave privada
  const handleDecryptFile = async () => {
    if (!file) {
      setErrorMessage('Por favor selecciona un archivo');
      return;
    }

    // Aquí deberías realizar el descifrado con la clave privada (RSA)
    // setDecryptedContent(decryptedData);
    console.log("Archivo descifrado"); // Placeholder para descifrado
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Bienvenido al Dashboard</h1>

        {/* Información del usuario */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <h2 className="text-2xl font-medium mb-4">Información del Usuario</h2>
          {userData ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Tu Llave Pública:</h3>
              <pre className="bg-gray-800 text-white p-4 rounded-lg">{userData}</pre>
            </div>
          ) : (
            <p className="text-red-500">No se pudo obtener la llave pública</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
