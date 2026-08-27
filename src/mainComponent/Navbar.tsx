import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


function Navbar() {

  const navLink = useRef<HTMLDivElement>(null);

  useEffect(() => {


    // Navbar style
    gsap.fromTo(
      ".navbar",
      {
        y: -20,
        opacity: 0,
        filter: "blur(1px)",
        position: "relative",
        backdropFilter: "blur(0px)",
        boxShadow: "inset 0 0 3px rgba(223, 233, 255, 0)",
        border: "1px solid rgba(223, 233, 255, 0)",
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        boxShadow: "inset 0 0 3px rgba(223, 233, 255, 0.6)",
        filter: "blur(0px)",
        border: "1px solid rgba(223, 233, 255, 0.6)",
        scrollTrigger: {
          trigger: ".heroSection",
          start: "top 0%",
          toggleActions: "play none none reverse",
        },
        position: "relative",
        backdropFilter: "blur(2px)",
        // delay: 1,
      },

    );

    // Logo style
    gsap.fromTo(
      ".LogoContainer",
      {
        y: -10,
        opacity: 0,
        filter: "blur(0.5)",
        position: "relative"

      },
      {
        delay: 0.8,
        y: 0,
        opacity: 1,
        duration: 1,
        position: "relative",
        scrollTrigger: {
          trigger: ".heroSection",
          start: "top 0%",
          toggleActions: "play none none reverse",
        },
      },

    );

  }, [null]);

  // navlinks style

  useEffect(() => {
    if (!navLink.current) return;
    
    gsap.fromTo(
      navLink.current.children,
      {
        x: -60,
        opacity: 0,
      },
      {
        x: 0,
        delay: 0.35,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.inout",
        scrollTrigger: {
          trigger: ".heroSection",
          start: "top 0%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);



  return (
    <div className='Navbar'>
      <nav className='navbar relative flex justify-between gap-6 items-center' >
        
        <Link to="/" className='LogoContainer flex items-center justify-center gap-1'>
          <div className='LogoNav'>
            {/* <img src="" alt="Logo" className='logo' /> */}
            <img src="/white Logo copy.png" alt="Logo" className='logo' />
          </div>
          <div className='line'></div>
          <p className='LogoText'>CODYPULSE</p>
        </Link>

        <div className='navlinks flex gap-10 items-center justify-center'ref={navLink}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/service">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

      </nav>
    </div>
  )
}

export default Navbar