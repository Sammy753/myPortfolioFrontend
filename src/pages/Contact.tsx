import React from 'react'
import Navbar from '../mainComponent/Navbar';
import ContactLanding from '../mainComponent/ContactLanding';

function Contact() {
  return (
    <div>
        <Navbar isHome={false} />
        <ContactLanding />
    </div>
  )
}

export default Contact