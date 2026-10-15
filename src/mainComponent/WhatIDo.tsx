import React, { useEffect, useState, useRef } from 'react'
import './WhatIDo.css'
import Lenis from '../pages/Lenis';

function WhatIDo() {

  interface ProjectDetails {
      id: string;
      title: string;
      icon: string;
      thumbnail: string;
      description: string;
    }

    const whatIDosRef = useRef<HTMLDivElement>(null);

    const scrollWhatIDos = (dir: 1 | -1) => {
      const el = whatIDosRef.current;
      if (!el) return;
      el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
    };
  
    const [WhatiDo, setWhatiDo] = useState<ProjectDetails[]>([])
    const [activeId, setActiveId] = useState<string | null>(null);
  
    useEffect(() => {
      fetch("https://myportfoliobackend-cuaw.onrender.com/api/what-i-do")
        .then((res) => res.json())
        .then(setWhatiDo);
    }, []);
  
  
    return (
      <div className='WhatIDoCards' id='Servicelist'>
        <Lenis />
        <div className="cardsTitle">
          <div className='flex justify-between items-center'>
            <h2>What I Do</h2>
            <div className='PageNextBack'>
              <img src="/next.png" className='next' alt="Page next" onClick={() => scrollWhatIDos(1)} />
              <img src="/back.png" className='next' alt="Page back" onClick={() => scrollWhatIDos(-1)} />
            </div>
          </div>
          <hr />
        </div>
        <div className="WhatIDos" ref={whatIDosRef}>
          {WhatiDo.map((p) => {
            const isActive = activeId === p.id;

            return (
              <div
                key={p.id}
                className={`WhatIDoCard transition-all duration-300 ${
                  isActive ? "h-100" : "h-60"
                }`}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActiveId(p.id)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActiveId(null)}
                onClick={() => setActiveId((prev) => (prev === p.id ? null : p.id))}
                style={{
                  backgroundImage: `url(${p.thumbnail})`,
                }}
              >
                <div className="content">
                  <div className="icon">
                    <img src={p.icon} alt={p.title} />
                  </div>
                  <h3 className="title">{p.title}</h3>
                  <p className={isActive ? "Description" : "hidden"}>{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
}

export default WhatIDo