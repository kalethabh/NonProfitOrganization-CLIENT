import { useState, useEffect } from "react";

function VerProgramas() {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch("https://fastapitre.onrender.com/programas");
        if (response.ok) {
          const data = await response.json();
          if (data.programas) {
            setProgramas(data.programas);
          }
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchProgramas();
  }, []);

  return (
    <div className="mt-10">
      <h1 className="flex text-3xl font-semibold mb-4 ml-6">Programas Disponibles</h1>
      {programas.length === 0 ? (
        <p className="ml-6">No hay programas disponibles en este momento.</p>
      ) : (
        <ul>
          {programas.map((programa) => (
            <li
              key={programa.nombre}
              className="bg-gray-300 w-60 rounded-lg mt-4 ml-6 p-4 shadow-xl"
            >
              <p className="text-xl font-semibold">{programa.nombre}</p>
              <p>{programa.descripcion}</p>
              <p>
                <strong>Participantes:</strong>{" "}
                {programa.voluntarios && programa.voluntarios.length > 0
                  ? programa.voluntarios.map((voluntario, index) => (
                      <span key={index}>
                        {voluntario.nombre} {voluntario.apellido}
                        {index !== programa.voluntarios.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "Ningún voluntario"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VerProgramas;
