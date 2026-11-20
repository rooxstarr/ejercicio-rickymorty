import "../styles/Personaje.css"

interface Props {
    nombre: string;
    imagen: string;
}

function Personaje({ nombre, imagen }: Props) {
    return (
        <div className="tarjeta">
            <img src={imagen} alt={nombre}></img>
            <h3>{nombre}</h3>
        </div>
    )
}

export default Personaje;