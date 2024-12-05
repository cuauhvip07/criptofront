import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PublicKeyDisplay = () => {
  const [publicKey, setPublicKey] = useState('');

  useEffect(() => {
    // Hacer la solicitud GET al backend para obtener la llave pública
    axios.get('http://localhost:4000/api/generar-llaves')
      .then(response => {
        setPublicKey(response.data.publicKey); // Guardamos la llave pública en el estado
      })
      .catch(error => {
        console.error('Hubo un error al obtener la llave pública:', error);
      });
  }, []); // El array vacío [] hace que esta solicitud solo se haga una vez al montar el componente

  // Función para descargar la llave pública
  const downloadPublicKey = () => {
    const element = document.createElement('a');
    const file = new Blob([publicKey], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'public_key.pem'; // Nombre del archivo de descarga
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <h2>Llave Pública</h2>
      {publicKey ? (
        <div>
          <pre>{publicKey}</pre> {/* Muestra la llave pública */}
          <button onClick={downloadPublicKey}>Descargar Llave Pública</button>
        </div>
      ) : (
        <p>Cargando la llave pública...</p>
      )}
    </div>
  );
};

export default PublicKeyDisplay;
