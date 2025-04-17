import { useState } from 'react'
import './style.css'

function Favoritos({ favoritos })  {

  return (
    <div>
    <h1>Favoritos</h1>
    <ul>
      {favoritos.map((tripulacion) => (
        <li key={tripulacion.id}>
         <img
          src={tripulacion.image}
          alt={tripulacion.name}
          width="50"
        />
          <p>{tripulacion.name}</p>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Favoritos
