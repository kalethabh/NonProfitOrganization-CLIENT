import { useState, useEffect } from "react";

function UnirsePrograma() {
  const [programas, setProgramas] = useState([]);
  const [voluntarioID, setVoluntarioID] = useState("");
  const [programaIngresado, setProgramaIngresado] = useState("");
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

  const handleProgramaIngresadoChange = (event) => {
    setProgramaIngresado(event.target.value);
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
          nombre_programa: programaIngresado,
          voluntario_id: voluntarioID,
        }).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.mensaje);
        setVoluntarioID("");
        setProgramaIngresado("");
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
          <label htmlFor="programaIngresado" className="block text-gray-600">
            Nombre del Programa
          </label>
          <input
            type="text"
            id="programaIngresado"
            name="programaIngresado"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            value={programaIngresado}
            onChange={handleProgramaIngresadoChange}
          />
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
