import React, { useState, useRef, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ hero, onPlayVideo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log("Video play failed:", error);
        });
      }
    }, 500); // 500ms delay before playing
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section 
      className="hero-section"
      style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hero.videoUrl && (
        <video
          ref={videoRef}
          className={`hero-video-preview ${isHovered ? 'visible' : ''}`}
          src={hero.videoUrl}
          muted
          loop
          playsInline
        />
      )}
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          {hero.sponsor && (
            <div className="hero-sponsor">
              <span className="sponsor-label">Presented by</span>
              <span className="sponsor-name">{hero.sponsor}</span>
            </div>
          )}
          <h2 className="hero-title">{hero.title}</h2>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <p className="hero-description">{hero.description}</p>
          <button 
            className="hero-cta"
            onClick={() => onPlayVideo(hero.title, hero.videoUrl)}
          >
            <FaPlay className="play-icon" />
            {hero.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
