import { useState, useEffect} from 'react'
import  {useParams} from "react-router-dom";
import './style.css'

function Detalle() {
  const {name} = useParams();
  const [datatrip, setDatatrip] = useState([]);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v4/crew/${name}`)
      .then(response => response.json())
      .then(responseData => setDatatrip(responseData))
      .catch(error => console.error("Error:", error));
  }, [name]); 

  if (!datatrip) return <p>Cargando...</p>;
  return (
    <div>
      <img 
        src={`https://api.spacexdata.com/v4/crew${datatrip.id}.png`} 
        alt={datatrip.name} 
        width="200"
      />

        <p>{datatrip.name}</p>
        <p>{datatrip.id}</p>
        <p>Altura: {datatrip.height/ 10} m / Peso: {datatrip.weight/ 10} km</p>
    </div>
  
  )
}

export default Detalle
