import React from 'react'
import './Landing.css'
import gsap from 'gsap'
import { useEffect, useRef, useState } from "react";
// import { blur } from 'three/tsl';
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
    const split = SplitText.create("h1", {
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
        // stagger: 0.05,
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
    //     trigger: "h1",
    //     start: "bottom 30%",
    //     end: "bottom top",
    //     scrub: true,
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

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.fromTo(
  //       ".backgroundBlur",
  //       {
  //         opacity: 0,
  //         backdropFilter: "blur(0px)",
  //       },
  //       {
  //         opacity: 1,
  //         backdropFilter: "blur(2px)",
  //         duration: 0.2,
  //         zIndex: 7,
  //         scrollTrigger: {
  //           trigger: ".homeContentContainer", // the section you want to trigger the blur
  //           start: "top 80%",        // fires when the next section's top hits 80% down the viewport
  //           toggleActions: "play none none reverse",
  //           // or use scrub: true for a scroll-linked blur instead of a discrete toggle
  //         },
  //       }
  //     );
  //   });

  //   return () => ctx.revert(); // cleanup on unmount
  // }, []);

  return (
    <div className='Landing'>
      <div className="AllArk">
        <div className="arc"></div>
        <div className="arc2"></div>
        <div className="arc2"></div>
      </div>
      <div className='landingContent'>
        <div className='LC'>
          <p className=' P text-[#72074B] text-[20px] tracking-[10%]'>UI Engineering</p>
          <h1>OLADELE SAMUEL</h1>
          <p className=' P2 text-black text-[20px] tracking-[10%]'>Building Experience</p>
        </div>
      </div>
    </div>
  )
}

export default Landing