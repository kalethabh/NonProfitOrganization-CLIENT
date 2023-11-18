import { useState, useEffect } from 'react';

function VerDonaciones() {
  const [donaciones, setDonaciones] = useState([]);

  useEffect(() => {
    const fetchDonaciones = async () => {
      try {
        const response = await fetch("https://ds-nonprofitorganization1.onrender.com/donaciones");
        if (response.ok) {
          const data = await response.json();
          if (data.donaciones) {
            setDonaciones(data.donaciones);
          }
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchDonaciones();
  }, []);

  return (
    <div className="mt-10 ml-6 overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-4">Donaciones Realizadas</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white" style={{ maxWidth: '50em' }}>
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Cedula</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Apellido</th>
              <th className="py-2 px-4 border-b">Ciudad</th>
              <th className="py-2 px-4 border-b">Programa</th>
              <th className="py-2 px-4 border-b">Monto</th>
            </tr>
          </thead>
          <tbody>
            {donaciones.map((donacion) => (
              <tr key={donacion.Cedula}>
                <td className="py-2 px-4 border-b">{donacion.Cedula}</td>
                <td className="py-2 px-4 border-b">{donacion.Nombre}</td>
                <td className="py-2 px-4 border-b">{donacion.Apellido}</td>
                <td className="py-2 px-4 border-b">{donacion.Ciudad}</td>
                <td className="py-2 px-4 border-b">{donacion.Programa_nombre}</td>
                <td className="py-2 px-4 border-b">{donacion.Monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VerDonaciones;
