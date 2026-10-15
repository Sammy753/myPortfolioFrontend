import React from 'react'
import { useEffect, useState, useRef } from 'react'
import './ContactLanding.css'
import { useMediaQuery } from '../components/XylophoneWidget/core/useMediaQuery';
import gsap from 'gsap';
import { XYLOPHONE } from '../components/XylophoneWidget/core/XylophoneConfig'
import { XylophoneCoilHandle } from '../components/XylophoneWidget';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import XylophoneCoil from '../components/XylophoneWidget';
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import CountryCodeInput from "./CountryCodeInput.tsx";
import emailjs from "@emailjs/browser";


function ContactLanding() {

  const SocialMedia = [
    {
      name: "WhatsApp",
      icon: "/mingcute_whatsapp-line.png",
      link: "https://wa.me/2349158058282", // your number, digits only, with country code, no +
    },
    {
      name: "Twitter",
      icon: "/twitter.png",
      link: "https://x.com/SMP_CodyPulse",
    },
    {
      name: "Telegram",
      icon: "/telegram.png",
      link: "https://t.me/SMP_CodyPulse",
    },
    {
      name: "Facebook",
      icon: "/facebook.png",
      link: "https://m.me/smp.codypulse",
    },
    {
      name: "LinkedIn",
      icon: "/linkedin.png",
      link: "https://www.linkedin.com/in/samuel-oladele-047ba4314/",
    },
  ];

  const [socialIndex, setSocialIndex] = useState(0);
  const currentSocial = SocialMedia[socialIndex];

  function handleChangeSocial() {
    // the % brings it back to 0 after the last item
    setSocialIndex((prev) => (prev + 1) % SocialMedia.length);
  }

  function handleOpenSocial() {
    window.open(currentSocial.link, "_blank", "noopener,noreferrer");
  }

  console.log("test")

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
  
  const [isTrue, setIsTrue] = useState(false);
  const [isTrue1, setIsTrue1] = useState(false);
  const [isTrue2, setIsTrue2] = useState(false);
  const [isTrue3, setIsTrue3] = useState(false);
  const [isTrue4, setIsTrue4] = useState(false);
  
  return (
    <div className='ContactLanding'>
      <div className="content">
        <h1 className="ContactUs">Contact Us</h1>
        <p>
          Have a project, idea, or opportunity in mind? I’m open to collaborations, freelance work, and creative partnerships. Let’s connect and build meaningful, user-focused digital experiences together.
        </p>
        <div className="buttons">
          <button className="HireMeBut" onClick={() => setIsTrue4(true)}>Hire me</button>
          <button className="gitHub" onClick={() => window.open('https://github.com/Sammy753', "_blank", "noopener,noreferrer")} onMouseEnter={() => setIsTrue(true)} onMouseLeave={() => setIsTrue(false)}>
            <div className={isTrue ? "Github backgC" : "Github"}></div>
          </button>
          <button className="linkedIN" onClick={() => window.open('https://www.linkedin.com/in/samuel-oladele-047ba4314/', "_blank", "noopener,noreferrer")} onMouseEnter={() => setIsTrue1(true)} onMouseLeave={() => setIsTrue1(false)}>
            <div className={isTrue1 ? "Linkedin backgCo" : "Linkedin"}></div>
          </button>
          <button className="twitter" onClick={() => window.open('https://x.com/SMP_CodyPulse', "_blank", "noopener,noreferrer")} onMouseEnter={() => setIsTrue2(true)} onMouseLeave={() => setIsTrue2(false)}>
            <div className={isTrue2 ? "Twitter backgCt" : "Twitter"}></div>
          </button>
          <button className="youtube" onClick={() => window.open('https://www.youtube.com/channel/UC2QpCFd8mA9hvQ943SUL0Dg', "_blank", "noopener,noreferrer")} onMouseEnter={() => setIsTrue3(true)} onMouseLeave={() => setIsTrue3(false)}>
            <div className={isTrue3 ? "Youtube backgCth" : "Youtube"}></div>
          </button>
        </div>
        <button className='SeeMore' onClick={() => setIsTrue4(true)}>See More?</button>
      </div>
      <div className="model3D">
        <XylophoneCoil ref={coilRef} key={deviceKey} onReady={growCoil} background="transparent" autoScrollWithPage/>
      </div>
      
      <div className={ isTrue4 ? "PopPopUp " : "PopPopUp hidden"} >

        <div className='FillSpace'>
          
        </div>

        <div className='PopContent'>
          <div className="header">
            <div className="cancelIcon" onClick={() => setIsTrue4(false)}>
              <img src="/cancel.png" className='cancel' alt="cancel" />
            </div>
            <div className='messageBox'>
              <div className="EmailButton">
                <img src="/ic_round-email (1).png" alt="" />
                <p>Via Email</p>
              </div>
              <div className="socialMediaButton">
                <div className="socialmediaButton" onClick={handleOpenSocial}>
                  <img src={currentSocial.icon} alt={currentSocial.name} />
                  <p>Via {currentSocial.name}</p>
                </div>

                <div className="changeIcon" onClick={handleChangeSocial}>
                  <img src="/ic_baseline-change-circle.png" alt="Change social media" />
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="dataInput">
            <CountryCodeInput />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ContactLanding