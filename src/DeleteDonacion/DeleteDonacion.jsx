import { useState } from "react";

function EliminarDonacion() {
  const [donacionId, setDonacionId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [inputError, setInputError] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Verificar que solo se ingresen números
    if (/^\d*$/.test(inputValue)) {
      setDonacionId(inputValue);
      setInputError("");
    } else {
      setInputError("Ingrese solo números enteros.");
    }
    setResponseMessage(""); // Limpiar el mensaje cuando se cambia el ID
  };

  const handleEliminarDonacion = async (event) => {
    event.preventDefault();

    try {
      // Verificar si donacionId es un número antes de enviar la solicitud
      if (!isNaN(donacionId)) {
        const response = await fetch(`https://ds-nonprofitorganization1.onrender.com/eliminar-donacion/${donacionId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const data = await response.json();
          setResponseMessage(data.mensaje);
        } else {
          const data = await response.json();
          if (response.status === 500 && data.error === "") {
            setResponseMessage("La donación no existe. Verifique el ID.");
          } else {
            setResponseMessage(data.error || "Hubo un error al procesar la solicitud."); // Mostrar mensaje de error general
          }
        }
      } else {
        setInputError("Ingrese un ID válido (número entero).");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setResponseMessage("Hubo un error de red. Inténtelo nuevamente más tarde.");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleEliminarDonacion} className="md:w-96 lg:w-96 w-[22em] bg-white p-4 rounded-lg shadow-2xl">
        <h1 className="text-2xl mb-4">Eliminar Donación</h1>
        <div className="mb-4">
          <label htmlFor="donacionId" className="block text-gray-600">
            ID de la Donación a Eliminar
          </label>
          <input
            type="text"
            id="donacionId"
            name="donacionId"
            className={`w-full border-2 border-gray-300 p-2 rounded-md ${inputError ? 'border-red-500' : ''}`}
            required
            value={donacionId}
            onChange={handleInputChange}
          />
          {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#ff0000cc] text-white py-2 px-4 rounded-md"
          >
            Eliminar
          </button>
        </div>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
}

export default EliminarDonacion;
