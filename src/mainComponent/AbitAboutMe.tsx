import React from 'react'
import './AbitAboutMe.css'

function AbitAboutMe() {
  return (
    <div>
      <div className='AbitAboutMe'>
        <div className="AboutMeContent">
          <h2>A Bit About Me</h2>
          <p>
            Hi, I’m Oladele Samuel Oluwatomiwa, a Frontend Developer and Product Designer passionate about creating intuitive, visually engaging digital experiences. I specialize in turning ideas into functional, user-centered products that not only look good but solve real problems.
          </p>
          <p>
            With a strong foundation in design and development, I bridge the gap between aesthetics and performance—ensuring every interface is both beautiful and efficient. I enjoy working on modern web applications, interactive designs, and scalable digital products.
          </p>
        </div>
        <div className='contentImage'>
          <img src="NativeDress copy2.jpg" className='contentImagE' alt="" />
          <div className="Icon">
            <img src="iconamoon.png" className='iconView' alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AbitAboutMe