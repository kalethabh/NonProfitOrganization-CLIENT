// BuscarDonacion.js
import { useState } from 'react';

function BuscarDonacion() {
  const [donacionId, setDonacionId] = useState('');
  const [donacionEncontrada, setDonacionEncontrada] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setDonacionId(event.target.value);
    setError(''); // Limpiar el mensaje de error cuando se cambia el ID
  };

  const handleBuscarDonacion = async (event) => {
    event.preventDefault();

    // Validar que el ID sea un número entero
    if (!/^\d+$/.test(donacionId)) {
      setError('Por favor, ingrese un número entero para el ID de la donación.');
      setDonacionEncontrada(null);
      return;
    }

    try {
      const response = await fetch(`https://ds-nonprofitorganization1.onrender.com/donacion/${donacionId}`);
      
      if (response.ok) {
        const data = await response.json();
        setDonacionEncontrada(data.donacion);
        setError('');
      } else {
        setDonacionEncontrada(null);
        setError('Donación no encontrada');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setDonacionEncontrada(null);
      setError('Error de red');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="md:w-96 lg:w-96 w-[22em] bg-white rounded-lg shadow-2xl">
        <form onSubmit={handleBuscarDonacion} className="p-4">
          <h1 className="text-2xl mb-4">Buscar Donación por ID</h1>
          <div className="mb-4">
            <label htmlFor="donacionId" className="block text-gray-600">
              ID de la Donación
            </label>
            <input
              type="text"
              id="donacionId"
              name="donacionId"
              className="w-full border-2 border-gray-300 p-2 rounded-md"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#3498db] text-white py-2 px-4 rounded-md"
            >
              Buscar
            </button>
          </div>
          {error && <p className="mt-3 text-red-500">{error}</p>}
        </form>
      </div>

      {donacionEncontrada && (
        <div className="md:w-96 lg:w-[50em] w-[22em] bg-white p-4 mt-4 rounded-lg shadow-2xl">
          <h2 className="text-lg font-semibold mb-2">Donación Encontrada</h2>
          <table className="min-w-full border border-gray-300" style={{ backgroundColor: 'transparent' }}>
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
              <tr key={donacionEncontrada.ID}>
                <td className="py-2 px-4 border-b">{donacionEncontrada.Cedula}</td>
                <td className="py-2 px-4 border-b">{donacionEncontrada.Nombre}</td>
                <td className="py-2 px-4 border-b">{donacionEncontrada.Apellido}</td>
                <td className="py-2 px-4 border-b">{donacionEncontrada.Ciudad}</td>
                <td className="py-2 px-4 border-b">{donacionEncontrada.Programa_nombre}</td>
                <td className="py-2 px-4 border-b">{donacionEncontrada.Monto}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BuscarDonacion;
