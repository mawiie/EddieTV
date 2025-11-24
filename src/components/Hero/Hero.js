import React from 'react';
import { FaPlay } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ hero, onPlayVideo }) => {
  return (
    <section 
      className="hero-section"
      style={{ backgroundImage: `url(${hero.backgroundImage})` }}
    >
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
            onClick={() => onPlayVideo(hero.title)}
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
