import { useState, useEffect } from "react";
import axios from "axios";

function MostrarVoluntarios() {
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    const fetchVoluntarios = async () => {
      try {
        const response = await axios.get("https://ds-nonprofitorganization1.onrender.com/voluntarios");
        const data = response.data;
        setVoluntarios(data.voluntarios);
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchVoluntarios();
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold mb-4 ml-6">Lista de Voluntarios</h1>
      {voluntarios.length === 0 ? (
        <p className="ml-6">No hay voluntarios disponibles en este momento.</p>
      ) : (
        <div className="ml-6">
          {voluntarios.map((voluntario) => (
            <div key={voluntario.ID} className="bg-gray-300 mt-4 rounded-lg shadow-xl h-[200px] w-[250px]">
              <div className="p-4">
                <p className="text-xl font-semibold">
                  {voluntario.Nombre} {voluntario.Apellido}
                </p>
                <p>
                  <strong>Cedula:</strong> {voluntario.ID}
                </p>
                <p>
                  <strong>Teléfono:</strong> {voluntario.Telefono}
                </p>
                <p>
                  <strong>Intereses:</strong> {voluntario.Intereses}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MostrarVoluntarios;
