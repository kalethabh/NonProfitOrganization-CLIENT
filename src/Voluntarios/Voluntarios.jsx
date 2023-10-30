import { useEffect, useState } from 'react';
import axios from 'axios';

function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    axios.get('https://fastapinb.onrender.com/voluntarios')
      .then(response => {
        setVolunteers(response.data.voluntarios);
      })
      .catch(error => {
        console.error('Error fetching volunteers:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Voluntarios</h1>
      <ul>
        {volunteers.map(volunteer => (
          <li key={volunteer.ID} className="mb-2">
            <div className="bg-gray-200 p-2 rounded">
              <p><strong>ID:</strong> {volunteer.ID}</p>
              <p><strong>Nombre:</strong> {volunteer.Nombre} {volunteer.Apellido}</p>
              <p><strong>Teléfono:</strong> {volunteer.Telefono}</p>
              <p><strong>Intereses:</strong> {volunteer.Intereses}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VolunteerList;
