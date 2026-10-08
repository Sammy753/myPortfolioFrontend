import React from 'react'
import {useEffect, useState} from 'react'
import './SkillsTools.css'

function SkillsTools() {

  interface SkillsTools {
    id: number;
    title: string;
    description: string;
    icon: string;
  }

  const [SkillsTools, setSkillsTools] = useState<SkillsTools[]>([])

  
  useEffect(() => {
    fetch("https://myportfoliobackend-cuaw.onrender.com/api/skills-tools")
      .then((res) => res.json())
      .then(setSkillsTools);
  }, []);
  
  return (
    <div className='SkillsTools'>
      <div className="SkillsToolsTitle">
        <h2>Skills & Tools</h2>
        <hr />
      </div>
      <div className="SkillsToolsCards">
        {SkillsTools.map((p) => (
          <div
            key={p.id}
            className="SkillsToolsCard"
          >
            <div className='icon'>
              <img src={p.icon} alt={p.title} />
            </div>

            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsTools