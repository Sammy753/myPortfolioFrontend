import React from 'react'
import './Subcribe.css'

function Subcribe() {
  return (
    <div className="Subcribe">
      <div className="subBanner">
        <div className="image">
          <img src="./sammy logo copy2.jpg" alt="Subscription Banner" className="subImage" />
        </div>
        <div className="subContent">
          <div className="icon">
            <img src="./fluent_design-ideas-28-filled.png" alt="" className="subIcon" />
          </div>
          <h2>Let’s Stay Connected</h2>
          <p>Stay connected for exclusive updates, creative insights, and newly crafted projects. Get valuable ideas and inspiration delivered straight to your inbox, designed to keep you informed, inspired, and ahead.</p>
          <div className="input">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subcribe