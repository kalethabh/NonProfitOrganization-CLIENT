import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function TablaProgramas({ programas }) {
  return (
    <div className="">
      <table className="min-w-full border border-gray-300 bg-[#f6f6f6]" style={{ maxWidth: '50em' }}>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Voluntarios</th>
          </tr>
        </thead>
        <tbody>
          {programas.map((programa) => (
            <tr key={programa.nombre}>
              <td className="py-2 px-4 border-b">{programa.nombre}</td>
              <td className="py-2 px-4 border-b">{programa.descripcion}</td>
              <td className="py-2 px-4 border-b">
                {programa.voluntarios && programa.voluntarios.length > 0 ? (
                  programa.voluntarios.map((voluntario, index) => (
                    <span key={index}>
                      {voluntario.nombre} {voluntario.apellido}
                      {index < programa.voluntarios.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>Ningún voluntario</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TablaProgramas.propTypes = {
  programas: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      voluntarios: PropTypes.arrayOf(
        PropTypes.shape({
          nombre: PropTypes.string.isRequired,
          apellido: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

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
    <div className="mt-10 ml-6 overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-4">Programas Disponibles</h1>
      <TablaProgramas programas={programas} />
    </div>
  );
}

export default VerProgramas;
