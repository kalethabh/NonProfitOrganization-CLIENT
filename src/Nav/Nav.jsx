import { Link } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const [showVolunteerMenu, setShowVolunteerMenu] = useState(false);
  const [showProgramMenu, setShowProgramMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const toggleVolunteerMenu = () => {
    setShowVolunteerMenu(!showVolunteerMenu);
    setShowProgramMenu(false); // Cerrar el otro menú al abrir este
    setShowMoreMenu(false); // Cerrar el menú "Más" al abrir este
  };

  const toggleProgramMenu = () => {
    setShowProgramMenu(!showProgramMenu);
    setShowVolunteerMenu(false); // Cerrar el otro menú al abrir este
    setShowMoreMenu(false); // Cerrar el menú "Más" al abrir este
  };

  const toggleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu);
    setShowVolunteerMenu(false); // Cerrar el menú de voluntarios al abrir este
    setShowProgramMenu(false); // Cerrar el menú de programas al abrir este
  };

  return (
    <nav className="bg-[#0c9266cc] p-4">
      <div className="flex justify-between items-center md:px-16 lg:px-60">
        <Link to="/" className="md:text-2xl lg:text-2xl text-white font-bold">
          Home
        </Link>
        <div className="group relative">
          <button
            className="md:text-2xl lg:text-2xl text-white font-bold"
            onClick={toggleVolunteerMenu}
          >
            Voluntarios ▼
          </button>
          <ul
            className={`${
              showVolunteerMenu ? "block" : "hidden"
            } mt-2 space-y-1 space-x-4 w-44 md:w-44 lg:w-54 lg:h-30 bg-white text-black p-1 absolute rounded-lg border border-gray-300`}
          >
            {/* Opciones del menú de voluntarios */}
            <li className="ml-4">
              <Link className="" to="/form-voluntarios" onClick={() => setShowVolunteerMenu(false)}>
                Registrar voluntario
              </Link>
            </li>
            <li>
              <Link to="/delete-voluntario" onClick={() => setShowVolunteerMenu(false)}>
                Eliminar voluntario
              </Link>
            </li>
            <li>
              <Link className="flex justify-normal" to="/voluntarios" onClick={() => setShowVolunteerMenu(false)}>
                Ver voluntarios
              </Link>
            </li>
          </ul>
        </div>
        <div className="group relative">
          <button
            className="md:text-2xl lg:text-2xl text-white font-bold"
            onClick={toggleProgramMenu}
          >
            Programas ▼
          </button>
          <ul
            className={`${
              showProgramMenu ? "block" : "hidden"
            } mt-2 space-y-1 space-x-4 w-44 md:w-44 lg:w-48 lg:h-32 bg-white text-black p-1 absolute rounded-lg border border-gray-300`}
          >
            <li className="ml-4">
              <Link to="/form-programas" onClick={() => setShowProgramMenu(false)}>
                Registrar programa
              </Link>
            </li>
            <li>
              <Link to="/unirse-programa" onClick={() => setShowProgramMenu(false)}>
                Unirse a programa
              </Link>
            </li>
            <li>
              <Link to="/programas" onClick={() => setShowProgramMenu(false)}>
                Ver programas
              </Link>
            </li>
            <li>
              <Link to="/delete-programa" onClick={() => setShowProgramMenu(false)}>
                Eliminar programas
              </Link>
            </li>
          </ul>
        </div>
        <div className="group relative">
          <button
            className="md:text-2xl lg:text-2xl text-white font-bold"
            onClick={toggleMoreMenu}
          >
            Donaciones ▼
          </button>
          <ul
            className={`${
              showMoreMenu ? "block" : "hidden"
            } mt-2 space-y-1 space-x-4 w-44 md:w-44 lg:w-48 lg:h-32 bg-white text-black p-1 absolute rounded-lg border border-gray-300`}
          >
            <li className="ml-4">
              <Link to="/form-donacion" onClick={() => setShowMoreMenu(false)}>
                Registrar donacion
              </Link>
            </li>
            <li className="ml-4">
              <Link to="/donaciones" onClick={() => setShowMoreMenu(false)}>
                Ver donaciones
              </Link>
            </li>
            <li className="ml-4">
              <Link to="/buscar-donacion" onClick={() => setShowMoreMenu(false)}>
                Buscar donacion
              </Link>
            </li>
            <li className="ml-4">
              <Link to="/delete-donacion" onClick={() => setShowMoreMenu(false)}>
                Eliminar donacion
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/about" className="md:text-2xl lg:text-2xl text-white font-bold">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
