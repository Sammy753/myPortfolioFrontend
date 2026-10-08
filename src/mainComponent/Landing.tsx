import React from 'react'
import './Landing.css'
import gsap from 'gsap'
import { useEffect, useRef, useState } from "react";
import { blur } from 'three/tsl';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";



function Landing() {

  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      ".arc",
      {
        "--arc-padding": "0px",
        opacity: 0,
        filter: "blur(0px)"
      },
      {
        delay: 0.8,
        "--arc-padding": "10px",
        duration: 0.8,
        ease: "power3.inOut",
        opacity: 1,
        filter: "blur(4px)"
      }
    );

    gsap.fromTo(
      ".arc2",
      {
        "--arc-padding": "0px",
        opacity: 0,
        filter: "blur(0px)"
      },
      {
        delay: 0.8,
        "--arc-padding": "10px",
        duration: 0.8,
        ease: "power3.inOut",
        opacity: 1,
        filter: "blur(0.5px)"
      }
    );

    gsap.fromTo(
      ".landingContent",
      {
        width: "80%",
        right: "10%",
      },
      {
        // width: "51%",
        duration: 0.8,
        delay: 1.7,
        // right: "24.5%"
      }
    );

  }, []);

  useEffect(() => {
    const split = SplitText.create(".LC h1", {
      type: "chars",
    });

    gsap.fromTo(
      split.chars,
      {
        letterSpacing: "1.9rem",
        opacity: 0,
        filter: "blur(0.75px)",
      },
      {
        letterSpacing: "0rem",
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        delay: 1.7,
        stagger: 0.05,
        ease: "power3.inOut",
      }
    );

    // Scroll-out animation
    // gsap.to(split.chars, {
    //   letterSpacing: "1.9rem",
    //   opacity: 0,
    //   filter: "blur(0.75px)",
    //   duration: 0.8,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".Landing",
    //     start: "bottom 30%",
    //     end: "bottom 0%",
    //     // scrub: true,
    //     toggleActions: "play none none reverse",
    //   },
    // });

    return () => {
      split.revert();
    };
  }, []);

  useEffect(() => {
    const split = SplitText.create(".P2", {
      type: "chars",
    });

    gsap.fromTo(
      split.chars,
      {
        y: 30,
        opacity: 0,
        filter: "blur(0.75px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        delay: 1.9,
        stagger: 0.05,
        ease: "power3.inOut",
      }
    );

    return () => {
      split.revert();
    };
  }, []);

  useEffect(() => {
    const split = SplitText.create(".P", {
      type: "chars",
    });

    gsap.fromTo(
      split.chars,
      {
        y: -30,
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        delay: 1.9,
        stagger: 0.05,
        ease: "power3.inOut",
      }
    );

    return () => {
      split.revert();
    };
  }, []);

  return (
    <div className='Landing' id='landing'>
      <div className="AllArk">
        <div className="arc"></div>
        <div className="arc2"></div>
        <div className="arc2"></div>
      </div>
      <div className='landingContent'>
        <div className='LC'>
          <p className=' P text-[#72074B] tracking-[10%]'>UI Engineering</p>
          <h1>OLADELE SAMUEL</h1>
          <p className=' P2 text-black tracking-[10%]'>Building Experience</p>
        </div>
      </div>
    </div>
  )
}

export default Landing