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
  const [errors, setErrors] = useState({
    ID: "",
    Telefono: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "ID" || name === "Telefono") {
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      setFormData({
        ...formData,
        [name]: sanitizedValue,
      });
  
      if (sanitizedValue !== value) {
        setErrors({ ...errors, [name]: "Solo se permiten números enteros." });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "Nombre" || name === "Apellido") {
      const sanitizedValue = value.replace(/[^\p{L}\s]/gu, "");
      setFormData({
        ...formData,
        [name]: sanitizedValue,
      });
  
      if (sanitizedValue !== value) {
        setErrors({ ...errors, [name]: "Solo se permiten letras y espacios." });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://ds-nonprofitorganization1.onrender.com/create-voluntario", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.mensaje);

        // Limpiar el formulario
        setFormData({
          ID: "",
          Nombre: "",
          Apellido: "",
          Telefono: "",
          Intereses: "",
        });
      } else {
        setResponseMessage("Error al agregar el voluntario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 lg:mt-6 lg:h-[27rem]">
      <form
        onSubmit={handleSubmit}
        className="md:w-96 lg:w-96 w-[22em] bg-white p-4 rounded-lg shadow-2xl"
      >
        <h1 className="text-2xl mb-4">Registre el Voluntario</h1>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="ID" className="w-24 text-gray-600">
              Cedula:
            </label>
            <input
              type="text"
              id="ID"
              name="ID"
              className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
              required
              value={formData.ID}
              onInput={handleInputChange}
            />
          </div>
            {errors.ID && <p className="text-red-500 ml-24 mb-2">{errors.ID}</p>}
        </div>
        <div className="mb-4 ">
        <div className="flex items-center">
          <label htmlFor="Nombre" className="w-24 text-gray-600">
            Nombre:
          </label>
          <input
            type="text"
            id="Nombre"
            name="Nombre"
            className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
            required
            value={formData.Nombre}
            onInput={handleInputChange}
          />
          <div>

          </div>
        </div>
          {errors.Nombre && <p className="text-red-500 ml-24 mb-2">{errors.Nombre}</p>}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="Apellido" className="w-24 text-gray-600">
              Apellido:
            </label>
            <input
              type="text"
              id="Apellido"
              name="Apellido"
              className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
              required
              value={formData.Apellido}
              onInput={handleInputChange}
            />
          </div>
            {errors.Apellido && <p className="text-red-500 ml-24 mb-2">{errors.Apellido}</p>}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="Telefono" className="w-24 text-gray-600">
              Teléfono:
            </label>
            <input
              type="text"
              id="Telefono"
              name="Telefono"
              className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
              required
              value={formData.Telefono}
              onInput={handleInputChange}
            />
          </div>
            {errors.Telefono && <p className="text-red-500 ml-24 mb-2">{errors.Telefono}</p>}
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="Intereses" className="w-24 text-gray-600">
            Intereses:
          </label>
          <input
            type="text"
            id="Intereses"
            name="Intereses"
            className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-20 rounded-md"
            required
            value={formData.Intereses}
            onInput={handleInputChange}
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
