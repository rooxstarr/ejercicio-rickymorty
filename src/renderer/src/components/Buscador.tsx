import { useState, useEffect } from 'react';
import Personaje from './Personaje';
import "../styles/Buscador.css"

interface Datos {
    nombre: string;
    imagen: string;
}

function Buscador() {

    const [texto, setTexto] = useState("");
    const [personajes, setPersonajes] = useState<Datos[]>([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        async function buscarPersonajes() {
            setCargando(true);
            try {
                const respuesta = await fetch("https://rickandmortyapi.com/api/character/?name=" + texto);

                if (!respuesta.ok) {
                    throw new Error("No se han ecnontrado personajes");
                }

                const datos = await respuesta.json();

                const lista: Datos[] = datos.results.map((personajeAPI) => {
                    const personaje: Datos = {
                        nombre: personajeAPI.name,
                        imagen: personajeAPI.image
                    };
                    return personaje;
                });
                setPersonajes(lista);

                console.log(datos)

            } catch (error) {
                console.error(error)
                setPersonajes([])

            } finally {
                setCargando(false);
            }

        }

        const temporizador = setTimeout(() => {
            buscarPersonajes();
        }, 1000);

        return () => clearTimeout(temporizador);

    }, [texto]);

    return (
        <div className="buscador">
            <h1>Rick y Morty</h1>
            <input className="input" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Busca un personaje"></input>

            {cargando === true && <p>Cargando...</p>}
            {cargando === false && personajes.length === 0 && <p>No se encontraron personajes</p>}

            <div className="lista">
                {personajes.map((personaje) => (<Personaje nombre={personaje.nombre} imagen={personaje.imagen} />))}
            </div>
        </div >
    );
}

export default Buscador;