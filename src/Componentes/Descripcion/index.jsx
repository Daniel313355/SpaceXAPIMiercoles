import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function Descripcion() {
  const { name } = useParams();
  const [datatrip, setDatatrip] = useState(null);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v4/crew/${name}`)
      .then(response => response.json())
      .then(data => setDatatrip(data))
      .catch(error => console.error("Error:", error));
  }, [name]);

  if (!datatrip) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Descripción</h2>

      <img 
        src={datatrip.image} 
        alt={datatrip.name} 
        width="200"
      />

      <p><strong>Nombre:</strong> {datatrip.name}</p>
      <p><strong>Agencia:</strong> {datatrip.agency}</p>
      <p><strong>Status:</strong> {datatrip.status}</p>
      <p>
        <strong>Wikipedia:</strong>{' '}
        <a href={datatrip.wikipedia} target="_blank" rel="noreferrer">
          {datatrip.wikipedia}
        </a>
      </p>
    </div>
  );
}

export default Descripcion;
