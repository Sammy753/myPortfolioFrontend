import React from 'react'
import Navbar from '../mainComponent/Navbar';
import { Link } from 'react-router-dom';
import './Home.css'
// import XylophoneCoil from '../components/XylophoneWidget';
import { useMediaQuery } from '../components/XylophoneWidget/core/useMediaQuery'
import Landing from '../mainComponent/Landing';
import XylophoneCoil, { type XylophoneCoilHandle } from '../components/XylophoneWidget'
import { useRef } from 'react';
import gsap from 'gsap';
import { XYLOPHONE } from '../components/XylophoneWidget/core/XylophoneConfig'
import { useEffect } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from '../mainComponent/Hero';
import ProjectCards from '../mainComponent/ProjectCards';
import Subcribe from '../mainComponent/Subcribe';
import Footer from '../mainComponent/Footer';



function Home() {

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
          backdropFilter: "blur(5px)",
          duration: 0.8,
          zIndex: 7,
          scrollTrigger: {
            trigger: ".heroSection", // the section you want to trigger the blur
            start: "top 80%",        // fires when the next section's top hits 80% down the viewport
            toggleActions: "play none none reverse",
            // or use scrub: true for a scroll-linked blur instead of a discrete toggle
          },
        }
      );
    });

    return () => ctx.revert(); // cleanup on unmount
  }, []);


  return (
    <div className='homeContainer'>
      <div className="backgroundBlur"></div>
      <div className='nav'><Navbar /></div>
      <div className='XylophoneContainer'>
        <XylophoneCoil ref={coilRef} key={deviceKey} onReady={growCoil} background="transparent" autoScrollWithPage/>
      </div>
      <Landing />
      <div className="heroSection"><Hero /></div>
      <div className="curatedWorks"><ProjectCards /></div>
      <div className="subscribeSection"><Subcribe /></div>
      <div className="footer"><Footer /></div>
    </div>
  )
}

export default Home