import { useState, useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import Filtro from '../Filtros'

function Tripulacion({ agregarAFavoritos }) {
  const [data, setData] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Todos')
  const navigate = useNavigate()

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch('https://api.spacexdata.com/v4/crew')
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error('Error al obtener datos de tripulación:', error)
      }
    }

    obtenerDatos()
  }, [])

  // 👉 Generamos filtros dinámicamente
  const agencias = [...new Set(data.map((item) => item.agency))]
  const estados = [...new Set(data.map((item) => item.status))]
  const tipos = ['Todos', ...agencias, ...estados]

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo)
  }

  // 👉 Aplicamos búsqueda y filtro
  let resultados = data.filter((tripulacion) => {
    const coincideBusqueda =
      busqueda.length < 3 ||
      tripulacion.name.toLowerCase().includes(busqueda.toLowerCase())
    const coincideFiltro =
      tipoSeleccionado === 'Todos' ||
      tripulacion.agency === tipoSeleccionado ||
      tripulacion.status === tipoSeleccionado

    return coincideBusqueda && coincideFiltro
  })

  return (
    <>
      <input
        type="text"
        placeholder="Buscar tripulante"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onTipoChange={handleTipoChange} tipos={tipos} />

      <section className="c-lista">
        {Array.isArray(resultados) &&
          resultados.map((tripulacion, index) => (
            <div
              className="c-lista-tripulacion"
              onClick={() => navigate(`/Descripcion/${tripulacion.id}`)}
              key={index}
            >
              <img
                src={tripulacion.image}
                alt={`tripulante ${tripulacion.name}`}
                width="auto"
                height="60"
                loading="lazy"
              />
              <p>{tripulacion.name}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  agregarAFavoritos({
                    name: tripulacion.name,
                    id: tripulacion.id, // este es el ID correcto, mejor usar tripulacion.id directamente
                    image: tripulacion.image // agregamos la imagen
                  });                  
                }}
              >
                Agregar a Favoritos
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/Descripcion/${tripulacion.id}`)
                }}
              >
                Ver Detalle
              </button>
            </div>
          ))}
      </section>
    </>
  )
}

export default Tripulacion
