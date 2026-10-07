import React from 'react'
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

function Front_img() {

     const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const opacity = Math.max(1 - scrollY / 500, 0);
  const translateY = -scrollY * 0.5;


  return (
    <section className="front_img">
      <div className="hero-text"
        style={{
          opacity: '2px',
          transform: `translate(-50%, calc(-50% + ${translateY}px))`
        }}
      >
        <h1>Trusted by leading OEMs across the globe</h1>
        <p>Since 1983, BAXY | Engineering has been designing, manufacturing, and distributing high-quality lightweight Aluminum casting automotive components. The division supplies its products to major OEMs across the globe.</p>
      </div>

      <video autoPlay muted loop playsInline className="bg-video" style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            paddingTop: "10px",
            height: '100%',
            width: '100%',
            
           
            // backgroundAttachment: "fixed",
          }}>
        <source src="src\assets\bannervideo.mp4" type="video/mp4" />
      </video>
    </section>
  )
}

export default Front_img

