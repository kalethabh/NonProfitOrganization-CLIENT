import { useState } from "react";

function DeletePrograma() {
  const [programaNombre, setProgramaNombre] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (event) => {
    setProgramaNombre(event.target.value);
    setResponseMessage(""); // Limpiar el mensaje cuando se cambia el nombre del programa
  };

  const handleEliminarPrograma = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://ds-nonprofitorganization1.onrender.com/eliminar-programa", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ Nombre: programaNombre }).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.mensaje);
      } else {
        const data = await response.json();
        if (response.status === 500 && data.error === "") {
          setResponseMessage("El programa no existe. Verifique el nombre.");
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
      <form onSubmit={handleEliminarPrograma} className="md:w-96 lg:w-96 w-[22em] bg-white p-4 rounded-lg shadow-2xl">
        <h1 className="text-2xl mb-4">Eliminar Programa</h1>
        <div className="mb-4">
          <label htmlFor="programaNombre" className="block text-gray-600">
            Nombre del Programa a Eliminar
          </label>
          <input
            type="text"
            id="programaNombre"
            name="programaNombre"
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
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
}

export default DeletePrograma;
