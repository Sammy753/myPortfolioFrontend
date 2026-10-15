import React, { useRef } from 'react'
import Navbar from '../mainComponent/Navbar';
import ProjectCards from '../mainComponent/ProjectCards';
import Footer from '../mainComponent/Footer';
import { useMediaQuery } from '../components/XylophoneWidget/core/useMediaQuery';
import gsap from 'gsap';
import { XYLOPHONE } from '../components/XylophoneWidget/core/XylophoneConfig'
import { XylophoneCoilHandle } from '../components/XylophoneWidget';
import { useEffect } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import XylophoneCoil from '../components/XylophoneWidget';
import './Portfolio.css'

function Portfolio() {

   const isMobile = useMediaQuery('(max-width: 480px)')
    const isTablet = useMediaQuery('(min-width: 481px) and (max-width: 1024px)')
    const isDesktop = useMediaQuery('(min-width: 1025px)')
    const deviceKey = isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'unknown'
  
    const coilRef = useRef<XylophoneCoilHandle>(null)
  
  
    gsap.registerPlugin(ScrollTrigger);
  
  
    const growCoil = () => {
      // console.log('STEP 1: growCoil was called')
      const group = coilRef.current?.getGroup()
      // console.log('STEP 2: group is', group)
      if (!group) return
  
      const targetScale = XYLOPHONE.group.scale
      // console.log('STEP 3: targetScale is', targetScale)
  
      group.scale.setScalar(2)
      gsap.to(group.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.8,
        ease: 'power3.inOut',
        // onUpdate: () => console.log('STEP 4: animating, x is', group.scale.x)
      })
  
    }

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".backgroundBlur",
          {
            opacity: 0,
            filter: "blur(0px)",
          },
          {
            opacity: 1,
            delay: 0.8,
            backdropFilter: "blur(5px)",
            duration: 1.2,
            zIndex: 7,
            ease: "power3.inOut",
          }
        );
      });

      return () => ctx.revert(); // cleanup on unmount
    }, []);

  return (
    <div className='portfolio'>
      <div className="backgroundBlur"></div>
      <div className='XylophoneContainer'>
        <XylophoneCoil ref={coilRef} key={deviceKey} onReady={growCoil} background="transparent" autoScrollWithPage/>
      </div>
      <Navbar isHome={false} />
      <ProjectCards />
      <Footer />
    </div>
  )
}

export default Portfolio