import "./style.css"
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/Capsulas">Capsulas</Link>
          <Link to="/Cohetes">Cohetes</Link>
          <Link to="/Favoritos">Favoritos</Link>
          <Link to="/Nucleos">Nucleos</Link>
          <Link to="/Satelites">Satelites</Link>
          <Link to="/Tripulacion"><Tripulacion></Tripulacion></Link>
        </nav>
    )
  }
 
  export default Menu