import './Footer.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Footer() {

  
    const [isTrue, setIsTrue] = useState(false);
    const [isTrue1, setIsTrue1] = useState(false);
    const [isTrue2, setIsTrue2] = useState(false);
    const [isTrue3, setIsTrue3] = useState(false);

  return (
    <footer className="footer">

      <div className="footerContent">
        <nav className="footer__section">
          <h2>Home</h2>
          <Link to="/home#landing">Landing</Link>
          <Link to="/home#hero">Hero</Link>
          <Link to="/home#recent-posts">Project Overview</Link>
        </nav>

        <nav className="footer__section" aria-label="Footer navigation">
          <h2>Portfolio</h2>
          <Link to="/portfolio#work">Project Filter</Link>
          <Link to="/portfolio#work">Grid/list view</Link>
          <Link to="/portfolio#work">Project Detail</Link>
        </nav>

        <nav className="footer__section" aria-label="Footer navigation">
          <h2>About Me</h2>
          <Link to="/about#introduction">Introduction</Link>
          <Link to="/about#skills">Skills & Tools</Link>
          <Link to="/about#experience">Experience Overview</Link>
        </nav>

        <nav className="footer__section" aria-label="Footer navigation">
          <h2>Service</h2>
          <Link to="/service#Servicelist">Service list</Link>
          <Link to="/contact">Hire me</Link>
          <Link to="/service#ProcessOverview">Process Overview</Link>
        </nav>

        <nav className="footer__section" aria-label="Footer navigation">
          <h2>Blog</h2>
          <Link to="/home#recent-posts">Recent Post</Link>
          <Link to="/portfolio#work">My Work</Link>
          <Link to="/home#subscribe">Newsletter</Link>
        </nav>

        <nav className="footer__section" aria-label="Footer navigation">
          <h2>Contact Me</h2>
          <Link to="/contact">Email</Link>
          <Link to="/contact">Contact form</Link>
          <Link to="/contact">Message</Link>
        </nav>
      </div>

      <div className="footer_section">

        <Link to="/">
          <div className="FooterLogo">
            <img src="white Logo copy.png" alt="CODYPULSE Logo" />
            <h2>CODYPULSE</h2>
          </div>
        </Link>
        
        <div className="buttons">
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

      <hr />

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} SMP_CodyPulse. Built with passion. All rights reserved. </span>
        <a href="mailto:oladelesamue210@gmail.com">oladelesamue210@gmail.com</a>
      </div>
    </footer>
  )
}

export default Footer;