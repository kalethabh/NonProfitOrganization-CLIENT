import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function TablaDonaciones({ donaciones, montoTotal }) {
  return (
    <div className="mt-10 ml-6 overflow-x-auto">
      <h2 className="text-3xl font-semibold mb-4">Lista de Donaciones</h2>
      <table className="min-w-full border border-gray-300 bg-white" style={{ maxWidth: '50em' }}>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
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
            <tr key={donacion.ID}>
              <td className="py-2 px-4 border-b">{donacion.ID}</td>
              <td className="py-2 px-4 border-b">{donacion.Cedula}</td>
              <td className="py-2 px-4 border-b">{donacion.Nombre}</td>
              <td className="py-2 px-4 border-b">{donacion.Apellido}</td>
              <td className="py-2 px-4 border-b">{donacion.Ciudad}</td>
              <td className="py-2 px-4 border-b">{donacion.Programa_nombre}</td>
              <td className="py-2 px-4 border-b">{donacion.Monto}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="text-right font-semibold">Monto Total:</td>
            <td className="py-2 px-4 border-b font-semibold">{montoTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

TablaDonaciones.propTypes = {
  donaciones: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.number.isRequired,
      Cedula: PropTypes.string.isRequired,
      Nombre: PropTypes.string.isRequired,
      Apellido: PropTypes.string.isRequired,
      Ciudad: PropTypes.string.isRequired,
      Programa_nombre: PropTypes.string.isRequired,
      Monto: PropTypes.number.isRequired,
    })
  ).isRequired,
  montoTotal: PropTypes.number.isRequired,
};

function TodasDonaciones() {
  const [donaciones, setDonaciones] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);

  useEffect(() => {
    const fetchDonaciones = async () => {
      try {
        const response = await fetch("https://ds-nonprofitorganization1.onrender.com/donaciones");
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Muestra la respuesta en la consola
          if (data.donaciones) {
            setDonaciones(data.donaciones);
            setMontoTotal(data.monto_total);
          }
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
  
    fetchDonaciones();
  }, []);  

  return (
    <TablaDonaciones donaciones={donaciones} montoTotal={montoTotal} />
  );
}

export default TodasDonaciones;
