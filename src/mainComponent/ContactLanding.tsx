import React from 'react'
import { useEffect, useState, useRef } from 'react'
import './ContactLanding.css'
import { useMediaQuery } from '../components/XylophoneWidget/core/useMediaQuery';
import gsap from 'gsap';
import { XYLOPHONE } from '../components/XylophoneWidget/core/XylophoneConfig'
import { XylophoneCoilHandle } from '../components/XylophoneWidget';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import XylophoneCoil from '../components/XylophoneWidget';
import * as THREE from 'three'
import { getCountries, getCountryCallingCode } from "libphonenumber-js";


function ContactLanding() {

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
  const SocialMedia = ['Whatsapp', 'twitter', 'telegram', 'facebook', 'linkedIn']


  const countries = getCountries();

  countries.forEach(country => {
    console.log(
      country,
      `+${getCountryCallingCode(country)}`
    );
  });

  console.log('hhhh')
  
  return (
    <div className='ContactLanding'>
      <div className="content">
        <h1 className="ContactUs">Contact Us</h1>
        <p>
          Have a project, idea, or opportunity in mind? I’m open to collaborations, freelance work, and creative partnerships. Let’s connect and build meaningful, user-focused digital experiences together.
        </p>
        <div className="buttons">
          <button className="HireMeBut">Hire me</button>
          <button className="gitHub" onMouseEnter={() => setIsTrue(true)} onMouseLeave={() => setIsTrue(false)}>
            <div className={isTrue ? "Github backgC" : "Github"}></div>
          </button>
          <button className="linkedIN" onMouseEnter={() => setIsTrue1(true)} onMouseLeave={() => setIsTrue1(false)}>
            <div className={isTrue1 ? "Linkedin backgCo" : "Linkedin"}></div>
          </button>
          <button className="twitter" onMouseEnter={() => setIsTrue2(true)} onMouseLeave={() => setIsTrue2(false)}>
            <div className={isTrue2 ? "Twitter backgCt" : "Twitter"}></div>
          </button>
          <button className="youtube" onMouseEnter={() => setIsTrue3(true)} onMouseLeave={() => setIsTrue3(false)}>
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
                <div className='socialmediaButton'>
                  <img src="/mingcute_whatsapp-line.png" alt="" />
                  <p>Via WhatsApp</p>
                </div>
                <div className="shareIcon"><img src="/ic_baseline-change-circle.png" alt="" /></div>
              </div>
            </div>
            <hr />
          </div>
          <input type="text" className="Name" placeholder='Enter your name'/>
          <input type="email" className="Email" placeholder='Enter your email'/>
          <div className="NumberCode">
            <input type="" placeholder=''className='Code'/>
            <input type="tel" name="phone" placeholder='Enter your phone number' className='Number'/>
          </div>
          <textarea name="Message" placeholder='Send your message' className="Message"/>
          <button className='send' onClick={() => {
            console.log("I'm here");
            console.warn("Warning test");
            console.error("Error test");
          }}>Send</button>
        </div>
      </div>

    </div>
  )
}

export default ContactLanding