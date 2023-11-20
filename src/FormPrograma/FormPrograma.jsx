import { useState } from "react";

function FormPrograma() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorNombre, setErrorNombre] = useState("");

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
    setErrorNombre("");
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleRegistrarPrograma = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://ds-nonprofitorganization1.onrender.com/create-programa", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ nombre, descripcion }).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.mensaje);
        setNombre("");
        setDescripcion("");
      } else {
        const data = await response.json();
        if (data.error && data.error.includes("duplicate key value violates unique constraint")) {
          setErrorNombre("Ya existe un programa con ese nombre.");
        } else {
          setResponseMessage("Error al registrar el programa");
        }
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleRegistrarPrograma} className="md:w-96 lg:w-96 w-[20em] bg-white p-4 rounded-lg shadow-xl">
        <h1 className="text-2xl mb-4">Registrar Programa</h1>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-600">
            Nombre del Programa
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            value={nombre}
            onChange={handleNombreChange}
          />
          {errorNombre && <p className="text-red-500 ml-24 mb-2">{errorNombre}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-gray-600">
            Descripción del Programa
          </label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            value={descripcion}
            onChange={handleDescripcionChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#0e7c57cc] text-white py-2 px-4 rounded-md"
          >
            Registrar
          </button>
        </div>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
}

export default FormPrograma;
