// src/pages/Favorites.jsx (o cualquier componente relacionado)
import { useEffect, useState } from 'react'
import { supabase } from "../../supabaseClient"
 // ajusta la ruta si es necesario

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    async function fetchFavorites() {
      const { data, error } = await supabase.from('favorites').select('*')
      if (error) console.error('Error fetching:', error)
      else setFavorites(data)
    }

    fetchFavorites()
  }, [])

  return (
    <div>
      <h2>Favoritos</h2>
      <ul>
        {favorites.map(fav => (
          <li key={fav.id}>{fav.crew_id}</li>
        ))}
      </ul>
    </div>
  )
}
