import React from 'react';
import { FaPlay, FaStar } from 'react-icons/fa';
import { MdFiberManualRecord } from 'react-icons/md';
import './ShowCard.css';

const ShowCard = ({ show, onPlay }) => {
  return (
    <div className="show-card" onClick={() => onPlay(show.title)}>
      <div className="show-card-image-wrapper">
        <img 
          src={show.image} 
          alt={show.title}
          className="show-card-image"
          loading="lazy"
        />
        <div className="show-card-overlay">
          <div className="play-overlay">
            <FaPlay className="play-icon" />
          </div>
        </div>
        {show.isLive && (
          <div className="live-badge">
            <MdFiberManualRecord className="live-dot" />
            LIVE
          </div>
        )}
      </div>
      <div className="show-card-info">
        <h3 className="show-card-title">{show.title}</h3>
        <div className="show-card-meta">
          <span className="show-duration">{show.duration}</span>
          {show.rating && (
            <>
              <span className="meta-separator">•</span>
              <span className="show-rating">
                <FaStar className="rating-icon" /> {show.rating}
              </span>
            </>
          )}
          {show.year && (
            <>
              <span className="meta-separator">•</span>
              <span className="show-year">{show.year}</span>
            </>
          )}
          {show.sponsor && (
            <>
              <span className="meta-separator">•</span>
              <span className="show-sponsor">{show.sponsor}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
