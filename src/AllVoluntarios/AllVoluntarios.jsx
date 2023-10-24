import { useState, useEffect } from "react";
import axios from "axios";

function MostrarVoluntarios() {
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    const fetchVoluntarios = async () => {
      try {
        const response = await axios.get("https://fastapi454.onrender.com/voluntarios");
        const data = response.data;
        setVoluntarios(data.voluntarios);
        console.log(data);
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchVoluntarios();
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-2xl mb-4">Lista de Voluntarios</h1>
      <ul>
        {voluntarios.map((voluntario) => (
          <li key={voluntario.ID}>
            <strong>ID:</strong> {voluntario.ID}<br />
            <strong>Nombre:</strong> {voluntario.Nombre}<br />
            <strong>Apellido:</strong> {voluntario.Apellido}<br />
            <strong>Teléfono:</strong> {voluntario.Telefono}<br />
            <strong>Intereses:</strong> {voluntario.Intereses}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostrarVoluntarios;
