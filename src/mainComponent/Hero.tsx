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

  function handleDownload() {
    const link = document.createElement("a");
    link.href = "/SMP_CodyPulse_CV.pdf"; // file inside /public
    link.download = "SMP_CodyPulse_CV.pdf"; // name the user sees
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (

    <div className="hero" id='hero'>
      <div className="content">
        <h1 className="name text-white">OLADELE SAMUEL</h1>
        <div className="titles">
          <h2 className='h2 text-white'>I’m a Software Engineer</h2>
          <div className='tc'>
            <h2 className='tC'>:</h2>

            {whatIdo.map((p, index) => (
              <div key={p.id}>
                <span
                  className="title"
                  style={{ "--i": index } as React.CSSProperties}
                  data-text={p.title}
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
          <button className="downloadCV" onClick={handleDownload}>Download CV</button>
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