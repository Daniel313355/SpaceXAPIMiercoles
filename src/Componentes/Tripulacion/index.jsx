import { useState, useEffect} from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import Filtros from '../Filtros';

function Tripulacion({ agregarAFavoritos }) {

    const [data, setData] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [tipoSeleccionado, setTipoSeleccionado] = useState('Todos');
    const navigate = useNavigate();
  

  useEffect(() => {
    const obtenerDatos = async () => {
      if (tipoSeleccionado === 'Todos') {
        const res = await fetch("https://api.spacexdata.com/v4/crew");
        const json = await res.json();
        setData(json.results);
      } else {
        const res = await fetch(`https://api.spacexdata.com/v4/crew${tipoSeleccionado}`);
        const json = await res.json();
        const listaFiltrada = json.tripulacion.map((p) => p.tripulacion);
        setData(listaFiltrada);
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  let resultados = data;

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = data.filter(tripulacion =>
      tripulacion.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  if (!isNaN(busqueda)) {
    resultados = data.filter(tripulacion =>
      tripulacion.url.includes('/' + busqueda)
    );
  }

  return (
    <>
    <input
        type="text"
        placeholder="Buscar tripulante"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

    <Filtro onTipoChange={handleTipoChange} />
      <section className='c-lista'>

{resultados.map((tripulacion, index) => (
  <div className='c-lista-tripulacion'
  onClick={() => navigate(`/Descripcion/${tripulacion.name}`)}
  key={index}>
    <p>{tripulacion.url.split("/")[6]}</p>
    <img src={`"https://i.imgur.com/${tripulacion.url.split("/")[6]}.png`} 
          alt={`tripulacion ${tripulacion.name}`} width='auto' height='60' loading='lazy'
        />
    <p>{tripulacion.name}</p>
    <button onClick={() => agregarAFavoritos({ name: tripulacion.name, id: tripulacion.url.split('/')[6] })}>
              Agregar a Favoritos
            </button>
            <button onClick={() => navigate(`/Descripcion/${tripulacion.name}`)}>Ver Detalle</button>
  </div>
))}
</section>
    </>
  )
}

export default Tripulacion
