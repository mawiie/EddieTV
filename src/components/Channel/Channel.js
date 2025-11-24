import React, { useRef } from 'react';
import './Channel.css';
import Hero from '../Hero/Hero';
import ShowCard from '../ShowCard/ShowCard';
import { videoSources } from '../../data/channelsData';

const Channel = ({ channel, isActive, onPlayVideo }) => {
  const handlePlayVideo = (showTitle) => {
    const randomVideo = videoSources[Math.floor(Math.random() * videoSources.length)];
    onPlayVideo(showTitle, randomVideo);
  };

  const CarouselSection = ({ shows, sectionTitle }) => {
    const carouselRef = useRef(null);
    
    return (
      <div className="content-section">
        <div className="section-header">
          <h3 className="section-title">{sectionTitle}</h3>
        </div>
        
        <div className="carousel-container">
          <button 
            className="carousel-nav carousel-nav-left"
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.scrollBy({ left: -380, behavior: 'smooth' });
              }
            }}
            aria-label="Scroll links"
          >
            ‹
          </button>
          
          <div className="carousel" ref={carouselRef}>
            {shows.map(show => (
              <ShowCard 
                key={show.id}
                show={show}
                onPlay={handlePlayVideo}
              />
            ))}
          </div>

          <button 
            className="carousel-nav carousel-nav-right"
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.scrollBy({ left: 380, behavior: 'smooth' });
              }
            }}
            aria-label="Scroll rechts"
          >
            ›
          </button>
        </div>
      </div>
    );
  };

  return (
    <section 
      id={channel.id}
      className={`channel-section ${isActive ? 'active' : ''}`}
    >
      <Hero hero={channel.hero} onPlayVideo={handlePlayVideo} />
      
      <div className="channel-content">
        {channel.sections && channel.sections.map(section => (
          <CarouselSection 
            key={section.title}
            shows={section.shows}
            sectionTitle={section.title}
          />
        ))}
      </div>
    </section>
  );
};

export default Channel;
