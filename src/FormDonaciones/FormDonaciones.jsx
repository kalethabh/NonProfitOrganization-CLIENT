import { useState } from "react";

function Donaciones() {
  const [formData, setFormData] = useState({
    Cedula: "",
    NombreDonante: "",
    ApellidoDonante: "",
    CiudadResidencia: "",
    ProgramaDonacion: "",
    MontoDonacion: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({
    Cedula: "",
    MontoDonacion: "",
    ProgramaDonacion: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "Cedula" || name === "MontoDonacion") {
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      setFormData({
        ...formData,
        [name]: sanitizedValue,
      });

      if (sanitizedValue !== value) {
        setErrors({
          ...errors,
          [name]: "Solo se permiten números enteros.",
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    } else if (
      name === "NombreDonante" ||
      name === "ApellidoDonante" ||
      name === "CiudadResidencia"
    ) {
      const sanitizedValue = value.replace(/[^\p{L}\s]/gu, "");
      setFormData({
        ...formData,
        [name]: sanitizedValue,
      });

      if (sanitizedValue !== value) {
        setErrors({
          ...errors,
          [name]: "Solo se permiten letras y espacios.",
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://ds-nonprofitorganization1.onrender.com/registrar-donacion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData).toString(),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.mensaje);

        // Limpiar el formulario
        setFormData({
          Cedula: "",
          NombreDonante: "",
          ApellidoDonante: "",
          CiudadResidencia: "",
          ProgramaDonacion: "",
          MontoDonacion: "",
        });
      } else {
        setResponseMessage("Error al agregar la donación");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 lg:mt-6 lg:h-[27rem]">
      <form
        onSubmit={handleSubmit}
        className="md:w-96 lg:w-[30em] w-[22em] bg-white p-4 rounded-lg shadow-2xl"
      >
        <h1 className="text-2xl mb-4">Registre la Donación</h1>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="Cedula" className="w-44 text-gray-600">
              Cédula:
            </label>
            <input
              type="text"
              id="Cedula"
              name="Cedula"
              className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
              required
              value={formData.Cedula}
              onInput={handleInputChange}
            />
          </div>
          {errors.Cedula && (
            <p className="text-red-500 ml-44 mb-2">{errors.Cedula}</p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="NombreDonante" className="w-44 text-gray-600">
              Nombre del Donante:
            </label>
            <input
              type="text"
              id="NombreDonante"
              name="NombreDonante"
              className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
              required
              value={formData.NombreDonante}
              onInput={handleInputChange}
            />
          </div>
          {errors.NombreDonante && (
            <p className="text-red-500 ml-44 mb-2">{errors.NombreDonante}</p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="ApellidoDonante" className="w-44 text-gray-600">
              Apellido del Donante:
            </label>
            <input
              type="text"
              id="ApellidoDonante"
              name="ApellidoDonante"
              className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
              required
              value={formData.ApellidoDonante}
              onInput={handleInputChange}
            />
          </div>
          {errors.ApellidoDonante && (
            <p className="text-red-500 ml-44 mb-2">{errors.ApellidoDonante}</p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="CiudadResidencia" className="w-44 text-gray-600">
              Ciudad de Residencia:
            </label>
            <input
              type="text"
              id="CiudadResidencia"
              name="CiudadResidencia"
              className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
              required
              value={formData.CiudadResidencia}
              onInput={handleInputChange}
            />
          </div>
          {errors.CiudadResidencia && (
            <p className="text-red-500 ml-44 mb-2">{errors.CiudadResidencia}</p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="ProgramaDonacion" className="w-44 text-gray-600">
              Programa de Donación:
            </label>
            <input
              type="text"
              id="ProgramaDonacion"
              name="ProgramaDonacion"
              className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
              required
              value={formData.ProgramaDonacion}
              onInput={handleInputChange}
            />
          </div>
          {errors.ProgramaDonacion && (
            <p className="text-red-500 ml-44 mb-2">{errors.ProgramaDonacion}</p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="MontoDonacion" className="w-44 text-gray-600">
              Monto de Donación:
            </label>
            <input
              type="text"
              id="MontoDonacion"
              name="MontoDonacion"
              className="w-64 ml-2 lg:ml-0 border-2 border-gray-300 p-2 lg:h-8 rounded-md"
              required
              value={formData.MontoDonacion}
              onInput={handleInputChange}
            />
          </div>
          {errors.MontoDonacion && (
            <p className="text-red-500 ml-44 mb-2">{errors.MontoDonacion}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#0e7c57cc] text-white py-2 px-4 rounded-md"
          >
            Registrar Donación
          </button>
        </div>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
}

export default Donaciones;
