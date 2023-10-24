import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import About from './About/About';
import Footer from './Footer/Footer';
import FormVoluntarios from './FormVoluntarios/FormVoluntarios';
import DeleteVoluntario from './DeleteVoluntario/DeleteVoluntario';
import AllVoluntarios from './AllVoluntarios/AllVoluntarios'
import FormPrograma from './FormPrograma/FormPrograma';
import UnirsePrograma from './UnirsePrograma/UnirsePrograma';

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Home/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/form-voluntarios" element={<FormVoluntarios/>}/>
        <Route path='/delete-voluntario' element={<DeleteVoluntario/>}/>
        <Route path="/voluntarios" element={<AllVoluntarios/>}/>
        <Route path="/form-programas" element={<FormPrograma/>}/>
        <Route path="/unirse-programa" element={<UnirsePrograma/>}/>


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
