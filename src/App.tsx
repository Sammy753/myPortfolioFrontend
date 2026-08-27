import XylophoneCoil from './components/XylophoneWidget'
import { useMediaQuery } from './components/XylophoneWidget/core/useMediaQuery'
import DeviceShowcase from './components/DeviceShowcase'
import { BrowserRouter, Routes, Route } from "react-router-dom"

// export default function App() {

//   const isMobile = useMediaQuery('(max-width: 480px)')
//   const isTablet = useMediaQuery('(min-width: 481px) and (max-width: 1024px)')
//   const isDesktop = useMediaQuery('(min-width: 1025px)')
//   const deviceKey = isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'unknown'

//   const desktopCapture = '/PixVerse_V6_Image_Text_720P_generate_a_video_t.mp4'
//   const laptopCapture = '/315495_medium.mp4'
//   const tabletCapture = '/296958.mp4'
//   const mobileCapture = '/296958.mp4'

//   return (
//     <div className="widget-stage">
//       <XylophoneCoil key={deviceKey} background="transparent" />

//       <DeviceShowcase
//         desktopVideo={desktopCapture}
//         laptopVideo={laptopCapture}
//         tabletVideo={tabletCapture}
//         mobileVideo={mobileCapture}
//       />
//     </div>
//   )
// }

import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Portfolio from "./pages/Portfolio";
import SmoothScroll from './pages/Lenis';

function App() {
  return (
    <div className='all'>
      <div className='box'></div>
      <div className="PageContainer">
        <SmoothScroll />
        <Routes>
          <Route path="/" element={<Home />} />
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