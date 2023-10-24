import { Link } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const [showVolunteerMenu, setShowVolunteerMenu] = useState(false);
  const [showProgramMenu, setShowProgramMenu] = useState(false);

  const toggleVolunteerMenu = () => {
    setShowVolunteerMenu(!showVolunteerMenu);
    setShowProgramMenu(false); // Cerrar el otro menú al abrir este
  };

  const toggleProgramMenu = () => {
    setShowProgramMenu(!showProgramMenu);
    setShowVolunteerMenu(false); // Cerrar el otro menú al abrir este
  };

  return (
    <nav className="flex mt-14 bg-[#0c9266cc] h-[5em]">
      <ul className="flex flex-grow text-center mt-4">
        <li className="w-full text-2xl text-white font-bold"><Link to="/">Home</Link></li>
        <li className="w-full text-2xl text-white font-bold relative">
          <a href="#" onClick={toggleVolunteerMenu}>Voluntarios</a>
          {showVolunteerMenu && (
            <ul className="absolute left-0 mt-2 space-y-2 bg-white border border-gray-300 text-black p-2 rounded-lg">
              <li><Link to="/form-voluntarios" onClick={() => setShowVolunteerMenu(false)}>Registrar voluntario</Link></li>
              <li><Link to="/delete-voluntario" onClick={() => setShowVolunteerMenu(false)}>Eliminar voluntario</Link></li>
              <li><Link to="/voluntarios" onClick={() => setShowVolunteerMenu(false)}>Ver voluntarios</Link></li>

            </ul>
          )}
        </li>
        <li className="w-full text-2xl text-white font-bold relative">
          <a href="#" onClick={toggleProgramMenu}>Programas</a>
          {showProgramMenu && (
            <ul className="absolute left-0 mt-2 space-y-2 bg-white border border-gray-300 text-black p-2 rounded-lg">
              <li><Link to="/form-programas" onClick={() => setShowProgramMenu(false)}>Registrar programa</Link></li>
              <li><Link to="/unirse-programa" onClick={() => setShowProgramMenu(false)}>Unirse a programa</Link></li>
              <li><Link to="/ver-programas" onClick={() => setShowProgramMenu(false)}>Ver programas</Link></li>

            </ul>
          )}
        </li>
        <li className="w-full text-2xl text-white font-bold"><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
