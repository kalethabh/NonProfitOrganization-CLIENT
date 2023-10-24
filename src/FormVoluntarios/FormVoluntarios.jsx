import { useState } from "react";

function Voluntarios() {
  const [formData, setFormData] = useState({
    ID: "",
    Nombre: "",
    Apellido: "",
    Telefono: "",
    Intereses: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://fastapi454.onrender.com/create-voluntario", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.mensaje);
      } else {
        setResponseMessage("Error al agregar el voluntario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-4 rounded-lg shadow-2xl"
      >
        <h1 className="text-2xl mb-4">Registre el Voluntario</h1>
        <div className="mb-4">
          <label htmlFor="ID" className="block text-gray-600">
            ID
          </label>
          <input
            type="text"
            id="ID"
            name="ID"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Nombre" className="block text-gray-600">
            Nombre
          </label>
          <input
            type="text"
            id="Nombre"
            name="Nombre"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Apellido" className="block text-gray-600">
            Apellido
          </label>
          <input
            type="text"
            id="Apellido"
            name="Apellido"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Telefono" className="block text-gray-600">
            Teléfono
          </label>
          <input
            type="text"
            id="Telefono"
            name="Telefono"
            className="w-full border-2 border-gray-300 p-2 rounded-md"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Intereses" className="block text-gray-600">
            Intereses
          </label>
          <input
            type="text"
            id="Intereses"
            name="Intereses"
            className="w-full border-2 border-gray-300 p-2 rounded-md h-20"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#0e7c57cc] text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
}

export default Voluntarios;
