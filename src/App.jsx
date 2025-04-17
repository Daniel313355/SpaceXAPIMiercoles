import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Capsulas from './Componentes/Capsulas'
import Descripcion from './Componentes/Descripcion'
import Favoritos from './Componentes/Favoritos'
import Menu from './Componentes/Menu'
import Nucleos from './Componentes/Nucleos'
import Satelites from './Componentes/Satelites'
import Tripulacion from './Componentes/Tripulacion'

function App() {
const [favoritos, setFavoritos] = useState([]);

  const agregarAFavoritos = (tripulacion) => {
    if (!favoritos.some((fav) => fav.name === tripulacion.name)) {
      setFavoritos((prev) => [...prev, tripulacion]);
    }
  };
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/Capsulas" element={<Capsulas />} />
        <Route path="/Descripcion" element={<h1>Descripción</h1>} />
        <Route path="/Favoritos" element={<Favoritos favoritos={favoritos} />} />
        <Route path="/Nucleos" element={<Nucleos />} />
        <Route path="/Satelites" element={<Satelites />} /> 
        <Route path="/Tripulacion" element={<Tripulacion agregarAFavoritos={agregarAFavoritos} />} />
      </Routes>
    </Router>
  )
}
export default App