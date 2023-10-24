import { useState, useEffect } from "react";

function UnirsePrograma() {
  const [programas, setProgramas] = useState([]);
  const [voluntarioID, setVoluntarioID] = useState("");
  const [programaSeleccionado, setProgramaSeleccionado] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch("https://fastapi454.onrender.com/programas");
        const data = await response.json();
        setProgramas(data.programas);
        console.log(data);
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchProgramas();
  }, []);

  const handleVoluntarioIDChange = (event) => {
    setVoluntarioID(event.target.value);
  };

  const handleProgramaChange = (event) => {
    setProgramaSeleccionado(event.target.value);
  };

  const handleUnirsePrograma = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://fastapi454.onrender.com/unirse-programa", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          nombre_programa: programaSeleccionado,
          voluntario_id: voluntarioID,
        }).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.mensaje);
        setVoluntarioID("");
        setProgramaSeleccionado("");
      } else {
        setResponseMessage("Error al unirse al programa");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setResponseMessage("Error de red al unirse al programa");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleUnirsePrograma} className="w-96 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl mb-4">Unirse a un Programa</h1>
        <div className="mb-4">
          <label htmlFor="voluntarioID" className="block text-gray-600">
            ID del Voluntario
          </label>
          <input
            type="text"
            id="voluntarioID"
            name="voluntarioID"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            value={voluntarioID}
            onChange={handleVoluntarioIDChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="programaSeleccionado" className="block text-gray-600">
            Programa
          </label>
          <select
            id="programaSeleccionado"
            name="programaSeleccionado"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            value={programaSeleccionado}
            onChange={handleProgramaChange}
          >
            <option value="" disabled>
              Seleccione un programa
            </option>
            {programas.map((programa) => (
              <option key={programa.nombre} value={programa.nombre}>
                {programa.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#0e7c57cc] text-white py-2 px-4 rounded-md"
          >
            Unirse
          </button>
        </div>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
}

export default UnirsePrograma;
