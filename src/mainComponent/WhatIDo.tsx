import React, { useEffect, useState, useRef } from 'react'
import './WhatIDo.css'
import Lenis from '../pages/Lenis';
import { useMediaQuery } from '../components/XylophoneWidget/core/useMediaQuery';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

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


        // remembers which card was active last time, so we only animate cards that changed
    const prevActiveId = useRef<string | null>(null);

    // Animate every card to its open / closed look
    useEffect(() => {
      const root = whatIDosRef.current;
      if (!root) return;

      root.querySelectorAll<HTMLElement>('.WhatIDoCard').forEach((card) => {
        const id = card.dataset.id;
        const active = id === activeId;
        const wasActive = id === prevActiveId.current;

        // nothing changed for this card, leave it alone
        if (active === wasActive) return;

        const css = getComputedStyle(card);
        const idleH = css.getPropertyValue('--idle-h').trim();
        const activeH = css.getPropertyValue('--active-h').trim();

        const icon = card.querySelector<HTMLElement>('.icon');
        const title = card.querySelector('.title');
        const desc = card.querySelector('.Description');
        const ease = 'power3.inOut';

        // card grows, purple overlay fades out, bottom shade fades in
        gsap.to(card, {
          height: active ? activeH : idleH,
          '--overlay': active ? 0 : 1,
          '--shade': active ? 1 : 0,
          duration: 0.5,
          ease,
          overwrite: true,
        });

        // icon glides from the center to the top-left corner and back
        if (icon) {
          gsap.to(icon, {
            x: active ? -icon.offsetLeft : 0,
            y: active ? -icon.offsetTop : 0,
            backgroundColor: active ? 'rgba(223, 233, 255, 0.3)' : 'rgba(236, 241, 255, 0.95)',
            backdropFilter: active ? 'blur(2px)' : 'blur(0px)',
            boxShadow: active
              ? 'inset 0px 0px 1px rgba(0, 0, 0, 0.2)'
              : 'inset 0px 0px 0px rgba(0, 0, 0, 0)',
            duration: 0.5,
            ease,
            overwrite: true,
          });
        }

        // title fades away when open
        gsap.to(title, {
          autoAlpha: active ? 0 : 1,
          duration: 0.25,
          overwrite: true,
        });

        // description slides up and fades in a moment after the card starts opening
        gsap.to(desc, {
          autoAlpha: active ? 1 : 0,
          y: active ? 0 : 20,
          duration: 0.4,
          delay: active ? 0.2 : 0,
          ease: 'power3.out',
          overwrite: true,
        });
      });

      prevActiveId.current = activeId;
    }, [activeId, WhatiDo]);

    // stop tweens when the component unmounts
    useEffect(() => {
      const root = whatIDosRef.current;
      return () => {
        if (root) gsap.killTweensOf(root.querySelectorAll('.WhatIDoCard, .Description, .icon, .title'));
      };
    }, []);
  
  
    return (
      <div className='WhatIDoCards' id='Servicelist'>
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
                data-id={p.id}
                className="WhatIDoCard"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActiveId(p.id)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActiveId(null)}
                onClick={() => setActiveId((prev) => (prev === p.id ? null : p.id))}
                style={{
                  backgroundImage: `url(${p.thumbnail})`,
                }}
              >
                <div className="blurStack">
                  <i /><i /><i /><i /><i />
                </div>
                <div className="content">
                  <div className="icon">
                    <img src={p.icon} alt={p.title} />
                  </div>
                  <h3 className="title">{p.title}</h3>
                </div>
                <p className="Description">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    )
}

export default WhatIDo