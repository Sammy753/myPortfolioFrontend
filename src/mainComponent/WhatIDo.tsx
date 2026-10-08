import React, { useEffect, useState } from 'react'
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
  
    const [WhatiDo, setWhatiDo] = useState<ProjectDetails[]>([])
  
    useEffect(() => {
      fetch("https://myportfoliobackend-cuaw.onrender.com/api/what-i-do")
        .then((res) => res.json())
        .then(setWhatiDo);
    }, []);
  
  
    return (
      <div className='WhatIDoCards'>
        <Lenis />
        <div className="cardsTitle">
          <h2>What I Do</h2>
          <hr />
        </div>
        <div className="WhatIDos">
          {WhatiDo.map((p) => (
            <div
              key={p.id}
              className="WhatIDoCard"
              style={{
                backgroundImage: `url(${p.thumbnail})`
              }}
            >
              <div className="content">
                <div className="icon"><img src={p.icon} alt={p.title} /></div>
                <h3 className="title">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default WhatIDo