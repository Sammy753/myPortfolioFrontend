import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  isHome: boolean;
}

function Navbar({ isHome }: NavbarProps) {

  const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };

  //   handleResize();
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const navLink = useRef<HTMLDivElement>(null);
  const navLinkMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {


    // Navbar style
    if (isHome) {
      gsap.fromTo(
      ".navbar, .navbarMobile",
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
    }else {
      gsap.fromTo(
      ".navbar, .navbarMobile",
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
      },

    );
    }

  }, [null]);

  // navlinks style

  useEffect(() => {
    if (!navLink.current) return;
    if (isHome) {
      
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
    }else {
      
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
      }
    );
    }
  }, []);

  useEffect(() => {
    if (!navLinkMobile.current) return;
    if (isMobile) {
      
      gsap.fromTo(
        navLinkMobile.current.children,
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
        }
      );
    }else {
      
    gsap.fromTo(
      navLinkMobile.current.children,
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
      }
    );
    }
  }, []);



  return (
    <>
      <div className='Navbar'>
        <nav className='navbar relative flex justify-between gap-6 items-center' >
          
          <Link to="/" className='LogoContainer flex items-start justify-center gap-1'>
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

        <nav className='navbarMobile flex justify-between items-center' >
          
          <Link to="/" className='LogoContainer flex items-start justify-center gap-1'>
            <div className='LogoNav'>
              <img src="/white Logo copy.png" alt="Logo" className='logo' />
            </div>
            <div className='line'></div>
            <p className='LogoText'>CODYPULSE</p>
          </Link>

          <div className="hamburger" onClick={() => setIsMobile(true)}>
            <img src="/Sideopen.png" alt="Hamburger" />
          </div>

        </nav>

      </div>
      
      <div className={isMobile ? 'navlinksMobile flex flex-col gap-10 items-center justify-center' : 'hidden'} ref={navLinkMobile}>
        <div className="hamburgerClose" onClick={() => setIsMobile(!isMobile)}>
          <img src="/cancel.png" alt="Close" />
        </div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/service">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

    </>
  )
}

export default Navbar