import { useState, useEffect } from "react";
import axios from "axios";

function VerProgramas() {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await axios.get("https://fastapitre.onrender.com/programas");
        const data = response.data;
        setProgramas(data.programas);
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchProgramas();
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold mb-4 ml-6">Programas Disponibles</h1>
      {programas.length === 0 ? (
        <p className="ml-6">No hay programas disponibles en este momento.</p>
      ) : (
        <ul>
          {programas.map((programa) => (
            <li
              key={programa.nombre}
              className="bg-gray-300 rounded-lg mt-4 ml-6 p-4 shadow-xl h-[200px] w-[250px]"
            >
              <p className="text-xl font-semibold">{programa.nombre}</p>
              <p>{programa.descripcion}</p>
              <p>
                <strong>Participantes:</strong>{" "}
                {programa.participantes && programa.participantes.length > 0
                  ? programa.participantes.map((participante, index) => (
                      <span key={index}>
                        {participante.Nombre} {participante.Apellido}
                        {index !== programa.participantes.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "Ningún participante"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VerProgramas;
