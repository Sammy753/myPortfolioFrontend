import React, { useEffect, useRef } from 'react'
import Navbar from '../mainComponent/Navbar';
import WhatIDo from '../mainComponent/WhatIDo';
import Process from '../mainComponent/Process';
import Footer from '../mainComponent/Footer';
import './Service.css'
import { XYLOPHONE } from '../components/XylophoneWidget/core/XylophoneConfig';
import XylophoneCoil, { XylophoneCoilHandle } from '../components/XylophoneWidget';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from '../components/XylophoneWidget/core/useMediaQuery';



function Service() {

    const isMobile = useMediaQuery('(max-width: 480px)')
    const isTablet = useMediaQuery('(min-width: 481px) and (max-width: 768px)')
    const isLaptop = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
    const isDesktop = useMediaQuery('(min-width: 1025px)')
    const deviceKey = isMobile ? 'mobile' : isTablet ? 'tablet' : isLaptop ? 'laptop' : isDesktop ? 'desktop' : 'desktop'
  
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
    <div>
      <div className="backgroundBlur"></div>
      <div className='XylophoneContainer'>
        <XylophoneCoil ref={coilRef} key={deviceKey} device={deviceKey} onReady={growCoil} background="transparent" autoScrollWithPage/>
      </div>
      <div className='ServiceContainer'>
        <Navbar isHome={false} />
        <WhatIDo />
        <Process />
        <Footer />
      </div>
    </div>
  )
}

export default Service