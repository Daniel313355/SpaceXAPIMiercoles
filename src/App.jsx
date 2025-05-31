import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { supabase } from './supabaseClient'
import Auth from './Componentes/Auth' // Asegúrate que el path esté correcto

import Capsulas from './Componentes/Capsulas'
import Descripcion from './Componentes/Descripcion'
import Favoritos from './Componentes/Favoritos'
import Menu from './Componentes/Menu'
import Nucleos from './Componentes/Nucleos'
import Satelites from './Componentes/Satelites'
import Tripulacion from './Componentes/Tripulacion'

function App() {
  const [favoritos, setFavoritos] = useState([])
  const [user, setUser] = useState(null)

  // Obtenemos el usuario al iniciar
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Nos suscribimos a cambios de sesión (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const agregarAFavoritos = (tripulacion) => {
    if (!favoritos.some((fav) => fav.name === tripulacion.name)) {
      setFavoritos((prev) => [...prev, tripulacion])
    }
  }

  // Si el usuario no ha iniciado sesión, muestra el login/registro
  if (!user) {
    return <Auth />
  }

  return (
    <Router>
      <Menu />
      <button onClick={handleLogout} style={{ margin: '1rem' }}>Cerrar sesión</button>
      <Routes>
        <Route path="/Capsulas" element={<Capsulas />} />
        <Route path="/Descripcion" element={<Descripcion />} />
        <Route path="/Favoritos" element={<Favoritos favoritos={favoritos} />} />
        <Route path="/Nucleos" element={<Nucleos />} />
        <Route path="/Satelites" element={<Satelites />} />
        <Route path="/Tripulacion" element={<Tripulacion agregarAFavoritos={agregarAFavoritos} />} />
      </Routes>
    </Router>
  )
}

export default App
