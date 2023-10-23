import { Link } from "react-router-dom"

function Nav(){
    return (
        <nav className="flex mt-14 bg-[#0c9266cc] h-[5em]">
                <ul className="flex flex-grow text-center mt-4">
                    <li className="w-full text-2xl text-white font-bold"><Link to="/">Home</Link></li>
                    <li className="w-full text-2xl text-white font-bold"><Link to="/about">About</Link></li>

                    {/* <li className="w-full text-2xl text-white font-bold"><Link to="/form-voluntarios">Registrar voluntario</Link></li>
                    <li className="w-full text-2xl text-white font-bold"><a href="#">Programas</a></li>
                    <li className="w-full text-2xl text-white font-bold"><a href="#">Donar</a></li>
                    <li className="w-full text-2xl text-white font-bold"><a href="#">Soporte</a></li> */}
                </ul>
        </nav>
    )
}

export default Nav