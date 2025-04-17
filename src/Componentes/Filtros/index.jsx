function Filtros({ onTipoChange, tipos = [] }) {
    return (
      <div className="c-filtro">
        {tipos.map((unTipo, index) => (
          <button key={index} onClick={() => onTipoChange(unTipo)}>
            {unTipo}
          </button>
        ))}
      </div>
    )
  }
  
  export default Filtros
  