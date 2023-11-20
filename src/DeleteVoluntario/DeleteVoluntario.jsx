import { useState } from "react";

function DeleteVoluntario() {
  const [voluntarioId, setVoluntarioId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (event) => {
    setVoluntarioId(event.target.value);
    setResponseMessage(""); // Limpiar el mensaje cuando se cambia el ID
  };

  const handleEliminarVoluntario = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("https://ds-nonprofitorganization1.onrender.com/eliminar-voluntario", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ ID: voluntarioId }).toString(),
      });
  
      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.mensaje);
      } else {
        const data = await response.json();
        if (response.status === 500 && data.error === "") {
          setResponseMessage("El voluntario no existe. Verifique el ID.");
        } else {
          setResponseMessage(data.error || "Hubo un error al procesar la solicitud."); // Mostrar mensaje de error general
        }
      }
    } catch (error) {
      console.error("Error de red:", error);
      setResponseMessage("Hubo un error de red. Inténtelo nuevamente más tarde.");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleEliminarVoluntario} className="md:w-96 lg:w-96 w-[22em] bg-white p-4 rounded-lg shadow-2xl">
        <h1 className="text-2xl mb-4">Eliminar Voluntario</h1>
        <div className="mb-4">
          <label htmlFor="voluntarioId" className="block text-gray-600">
            Cedula del Voluntario a Eliminar
          </label>
          <input
            type="text"
            id="voluntarioId"
            name="voluntarioId"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#ff0000cc] text-white py-2 px-4 rounded-md"
          >
            Eliminar
          </button>
        </div>
        {responseMessage && <p className={responseMessage.includes("Error") ? "text-red-600" : ""}>{responseMessage}</p>}
      </form>
    </div>
  );
}

export default DeleteVoluntario;
