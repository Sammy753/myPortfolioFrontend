import React from 'react'
import { useEffect, useState } from 'react';
import "./ProjectCards.css"
import DeviceShowcase from '../components/DeviceShowcase'
import { Bounds } from '@react-three/drei';

function ProjectCards() {

  const desktopCapture = '/PixVerse_V6_Image_Text_720P_generate_a_video_t.mp4'
  const laptopCapture = '/315495_medium.mp4'
  const tabletCapture = '/296958.mp4'
  const mobileCapture = '/296958.mp4'

  interface ProjectDetails {
    id: number;
    title: string;
    description: string;
  }

  const [ProjectDetails, setProjectDetails] = useState<ProjectDetails[]>([])

  useEffect(() => {
    fetch("https://myportfoliobackend-cuaw.onrender.com/api/project")
      .then((res) => res.json())
      .then(setProjectDetails);
  }, []);


  return (
    <div className='ProductCards' id='work'>
      <div className="cardsTitle">
        <h2>Curated Works</h2>
        <hr />
      </div>
      <div className="cardsContainer">
        <div className="ProductCard">
          <div className="videos">
            <DeviceShowcase 
              desktopVideo={desktopCapture}
              laptopVideo={laptopCapture}
              tabletVideo={tabletCapture}
              mobileVideo={mobileCapture}
            />
          </div>
          <div className="CardContent">
            
          </div>
        </div>
      </div>
      <a href='/portfolio'><button className='SeeMore'>See more</button></a>
    </div>
  )
}

export default ProjectCards