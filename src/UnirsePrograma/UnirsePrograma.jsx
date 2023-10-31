import { useState, useEffect } from "react";

function UnirsePrograma() {
  const [programas, setProgramas] = useState([]);
  const [voluntarioID, setVoluntarioID] = useState("");
  const [programaIngresado, setProgramaIngresado] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({
    voluntarioID: "",
    programaIngresado: "",
  });

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch("https://fastapitre.onrender.com/programas");
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
    const value = event.target.value;
  
    // Si el valor es un número o está vacío, actualiza el estado
    if (/^\d*$/.test(value)) {
      setVoluntarioID(value);
      setErrors({ ...errors, voluntarioID: "" });
    } else {
      // Si el valor no es un número, muestra un mensaje de error
      setErrors({ ...errors, voluntarioID: "ID de voluntario inválido." });
    }
  };
  
  const handleProgramaIngresadoChange = (event) => {
    const value = event.target.value;
    
    // Permitir solo letras, números y caracteres especiales sin espacios
    const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
    
    setProgramaIngresado(sanitizedValue);
    setErrors({ ...errors, programaIngresado: "" });
  };
  
   

  const validateForm = () => {
    let valid = true;

    if (voluntarioID === "" || isNaN(voluntarioID)) {
      setErrors({ ...errors, voluntarioID: "ID de voluntario inválido." });
      valid = false;
    }

    if (programaIngresado.trim() === "") {
      setErrors({ ...errors, programaIngresado: "Nombre del programa no puede estar vacío." });
      valid = false;
    }

    return valid;
  };

  const handleUnirsePrograma = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("https://fastapitre.onrender.com/unirse-programa", {
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
        console.error("Error de red:", error)
      }
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleUnirsePrograma} className="md:w-96 lg:w-96 w-[20em] bg-white p-4 rounded-lg shadow-xl">
        <h1 className="text-2xl mb-4">Unirse a un Programa</h1>
        <div className="mb-4">
          <label htmlFor="voluntarioID" className="block text-gray-600">
            Cedula del Voluntario
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
          {errors.voluntarioID && <p className="text-red-500">{errors.voluntarioID}</p>}
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
          {errors.programaIngresado && <p className="text-red-500">{errors.programaIngresado}</p>}
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
