function Filtros({onTipoChange}) {
    const tipos = [
        "Todos",
        "agency", "status", "launches"
    ];

return ( 
<div className="c-filtro">
    {tipos.map((unTipo, index)=>(
        <button className= '' key={index} onClick={() =>onTipoChange(unTipo)}> 
        {unTipo}
        </button>
    ))}
</div>
);
}
export default Filtros;