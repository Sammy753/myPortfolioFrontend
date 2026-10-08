import React from 'react'
import './Process.css'

function Process() {
  return (
    <div>
      <div className='ProcessOverview'>
        <div className="contentP">
          <h2>Process Overview</h2>
          <p>
            I follow a structured approach that combines research, strategy, design, and development to deliver complete digital solutions. I begin by understanding project goals, user needs, and brand direction, then plan the structure and user experience.
          </p>
          <p>
            From there, I create visual designs, brand identities, and interactive prototypes before bringing them to life through modern frontend development. Finally, I test, refine, and optimize the product to ensure it is user-friendly, visually appealing, and ready for launch.
          </p>
        </div>
        <div className='componentCont'>
          <video src="/Overview.mp4" autoPlay muted loop playsInline />
        </div>
      </div>
    </div>
  )
}

export default Process