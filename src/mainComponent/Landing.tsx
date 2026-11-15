
import React, { useLayoutEffect, useRef } from "react";
import "./Landing.css";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

function Landing() {
  const landingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const title = landingRef.current?.querySelector(".LC h1");
      const subtitle = landingRef.current?.querySelector(".P");
      const description = landingRef.current?.querySelector(".P2");

      if (!title || !subtitle || !description) return;

      // Split text into individual characters
      const titleSplit = SplitText.create(title, {
        type: "chars",
      });

      const subtitleSplit = SplitText.create(subtitle, {
        type: "chars",
      });

      const descriptionSplit = SplitText.create(description, {
        type: "chars",
      });

      // Main landing animation timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Arc reveal
      tl.from(".arc", {
        opacity: 0,
        autoAlpha: 0,
        scaleY: 0.9,
        duration: 1,
        transformOrigin: "center bottom",
      }, 0);

      tl.from(".arc2", {
        opacity: 0,
        autoAlpha: 0,
        scaleY: 0.9,
        duration: 1,
        transformOrigin: "center bottom",
        // stagger: 0.12,
      }, 0);

      // Landing content reveal
      tl.from(".landingContent", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
      }, 0.7);

      // Main heading
      tl.from(titleSplit.chars, {
        autoAlpha: 0,
        y: 35,
        duration: 1,
        stagger: 0.035,
        ease: "power3.out",
      }, 1);

      // First paragraph
      tl.from(subtitleSplit.chars, {
        autoAlpha: 0,
        y: -15,
        duration: 0.6,
        stagger: 0.025,
      }, 1.5);

      // Second paragraph
      tl.from(descriptionSplit.chars, {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.025,
      }, 1.6);

      // Cleanup SplitText instances
      return () => {
        titleSplit.revert();
        subtitleSplit.revert();
        descriptionSplit.revert();
      };

    }, landingRef);

    return () => ctx.revert();

  }, []);

  return (
    <div className="Landing" id="landing" ref={landingRef}>
      <div className="AllArk">
        <div className="arc"></div>
        <div className="arc2"></div>
        <div className="arc2"></div>
      </div>

      <div className="landingContent">
        <div className="LC">
          <p className="P text-[#72074B] tracking-[10%]">
            UI Engineering
          </p>

          <h1>OLADELE SAMUEL</h1>

          <p className="P2 text-black tracking-[10%]">
            Building Experience
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;