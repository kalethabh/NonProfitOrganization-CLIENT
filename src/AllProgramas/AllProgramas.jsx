import { useState, useEffect } from "react";
import axios from "axios";

function MostrarProgramas() {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await axios.get("https://ds-nonprofitorganization1.onrender.com/programas");
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
        <div className="ml-6">
          {programas.map((programa) => (
            <div key={programa.nombre} className="bg-gray-300 mt-4 rounded-lg shadow-xl h-[200px] w-[250px]">
              <div className="p-4">
                <p className="text-xl font-semibold">{programa.nombre}</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MostrarProgramas;
