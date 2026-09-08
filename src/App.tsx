
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Portfolio from "./pages/Portfolio";
import SmoothScroll from './pages/Lenis';
import ScrollToHash from './pages/scroll';

function App() {
  return (
    <div className='all'>
      <div className='box'></div>
      <div className="PageContainer">
        <SmoothScroll />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
      
    </div>
    
  );
}

export default App;