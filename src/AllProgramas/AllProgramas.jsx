import { useState, useEffect } from "react";

function VerProgramas() {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch("https://ds-nonprofitorganization1.onrender.com/programas");
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
      <h1 className="text-3xl font-semibold mb-4 ml-6">Programas Disponibles</h1>
      {programas.length === 0 ? (
        <p className="ml-6">No hay programas disponibles en este momento.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex">
            {programas.map((programa) => (
              <div key={programa.nombre} className="bg-gray-300 rounded-lg m-4 p-4 shadow-xl" style={{ width: "300px" }}>
                <h2 className="text-xl font-semibold">{programa.nombre}</h2>
                <p>{programa.descripcion}</p>
                <strong>Voluntarios:</strong>
                <ul>
                  {programa.voluntarios && programa.voluntarios.length > 0 ? (
                    programa.voluntarios.map((voluntario, index) => (
                      <li key={index}>
                        <p>
                          {voluntario.nombre} {voluntario.apellido}
                        </p>
                      </li>
                    ))
                  ) : (
                    <li>Ningún voluntario</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VerProgramas;
