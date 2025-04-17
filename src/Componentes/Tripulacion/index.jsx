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
        if (tipoSeleccionado === 'Todos') {
          const res = await fetch('https://api.spacexdata.com/v4/crew')
          const json = await res.json()
          setData(json) // ✅ usamos el array directamente
        } else {
          setData([]) // 👈 puedes implementar filtros personalizados más adelante
        }
      } catch (error) {
        console.error('Error al obtener datos de tripulación:', error)
      }
    }

    obtenerDatos()
  }, [tipoSeleccionado])

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo)
  }

  let resultados = data

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = data.filter((tripulacion) =>
      tripulacion.name.toLowerCase().includes(busqueda.toLowerCase())
    )
  }

  if (!isNaN(busqueda)) {
    resultados = data.filter((tripulacion) =>
      tripulacion.url?.includes('/' + busqueda)
    )
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

      <section className="c-lista">
        {Array.isArray(resultados) &&
          resultados.map((tripulacion, index) => {
            const id = tripulacion?.url?.split('/')[6]

            return (
              <div
                className="c-lista-tripulacion"
                onClick={() => navigate(`/Descripcion/${tripulacion.name}`)}
                key={index}
              >
                <p>{id}</p>
                <img
                  src={`https://i.imgur.com/${id}.png`}
                  alt={`tripulacion ${tripulacion.name}`}
                  width="auto"
                  height="60"
                  loading="lazy"
                />
                <p>{tripulacion.name}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    agregarAFavoritos({ name: tripulacion.name, id })
                  }}
                >
                  Agregar a Favoritos
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/Descripcion/${tripulacion.name}`)
                  }}
                >
                  Ver Detalle
                </button>
              </div>
            )
          })}
      </section>
    </>
  )
}

export default Tripulacion
