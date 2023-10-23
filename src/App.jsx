import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Nav from './Nav/Nav';
import About from './About/About';
import Footer from './Footer/Footer';

function App() {

  return (
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      <Footer/>
      </BrowserRouter>
  );
}

export default App