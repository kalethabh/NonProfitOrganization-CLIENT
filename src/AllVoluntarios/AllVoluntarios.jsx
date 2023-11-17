import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function TablaVoluntarios({ voluntarios }) {
  return (
    <div className="mt-10 ml-6 overflow-x-auto">
      <h2 className="text-3xl font-semibold mb-4">Lista de Voluntarios</h2>
      <table className="min-w-full border border-gray-300 bg-[#f6f6f6]" style={{ maxWidth: '80em' }}>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Intereses</th>
          </tr>
        </thead>
        <tbody>
          {voluntarios.map((voluntario) => (
            <tr key={voluntario.ID}>
              <td className="py-2 px-4 border-b">{voluntario.ID}</td>
              <td className="py-2 px-4 border-b">{voluntario.Nombre}</td>
              <td className="py-2 px-4 border-b">{voluntario.Apellido}</td>
              <td className="py-2 px-4 border-b">{voluntario.Telefono}</td>
              <td className="py-2 px-4 border-b">{voluntario.Intereses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TablaVoluntarios.propTypes = {
  voluntarios: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.string.isRequired,
      Nombre: PropTypes.string.isRequired,
      Apellido: PropTypes.string.isRequired,
      Telefono: PropTypes.string.isRequired,
      Intereses: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function Voluntarios() {
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    const fetchVoluntarios = async () => {
      try {
        const response = await fetch("https://ds-nonprofitorganization1.onrender.com/voluntarios");
        if (response.ok) {
          const data = await response.json();
          setVoluntarios(data.voluntarios);
        } else {
          console.error("Error al cargar voluntarios");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchVoluntarios();
  }, []); 

  return (
    <TablaVoluntarios voluntarios={voluntarios} />
  );
}

export default Voluntarios;
