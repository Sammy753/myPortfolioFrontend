import React from 'react'
import './Hero.css'
import { useEffect, useState } from 'react'

function Hero() {

  const [isTrue, setIsTrue] = useState(false);
  const [isTrue1, setIsTrue1] = useState(false);
  const [isTrue2, setIsTrue2] = useState(false);
  const [isTrue3, setIsTrue3] = useState(false);

  interface WhatIDo {
  id: number;
  title: string;
  description: string;
}

const [whatIdo, setWhatIdo] = useState<WhatIDo[]>([]);

useEffect(() => {
  fetch("https://myportfoliobackend-cuaw.onrender.com/api/what-i-do")
    .then((res) => res.json())
    .then(setWhatIdo);
}, []);

  return (

    <div className="hero">
      <div className="content">
        <h1 className="name text-[50px] text-white">OLADELE SAMUEL</h1>
        <div className="titles">
          <h2 className='text-white text-[32px]'>I’m a Software Engineer</h2>
            <div className=''>
              <h2>:</h2>

              {whatIdo.map((p) => (
                <div key={p.id}>
                  <span
                    className="title"
                    style={{ "--i": p.id } as React.CSSProperties}
                  >
                    {p.title}
                  </span>
                </div>
              ))}
            </div>
        </div>
        <p>
          I create sophisticated digital experiences that seamlessly blend design, functionality, and strategy. Every project I touch is crafted with precision, clarity, and a focus on impactful, user-centered results.
        </p>
        <div className="buttons">
          <button className="downloadCV">Download CV</button>
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
      </div>
      <div className="portrait">
        <img src="/Big Sam.png" alt="portrait" />
        
        <svg className="ring" viewBox="0 0 400 400">
          <circle
            cx="200" cy="200" r="190"
            fill="none"
            stroke="#6366f1"
            stroke-width="4"
            stroke-dasharray="480 100"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default Hero