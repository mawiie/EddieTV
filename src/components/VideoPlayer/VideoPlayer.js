import React, { useEffect, useRef } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ title, videoUrl, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Scroll to top when video opens
    window.scrollTo(0, 0);

    // Keyboard event listener for ESC key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Play video
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing successfully');
          })
          .catch(err => {
            console.log('Auto-play prevented:', err);
          });
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="video-player-page">
      <button 
        className="video-close-btn"
        onClick={onClose}
        aria-label="Sluit video"
      >
        ✕
      </button>

      <div className="video-player-content">
        <div className="video-player-wrapper">
          <video 
            ref={videoRef}
            controls
            autoPlay
            className="video-player"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-info">
          <h1 className="video-title">{title}</h1>
          <p className="video-description">
            Geniet van {title}! Deze preview toont een demonstratievideo. In de volledige versie 
            zou u hier de complete aflevering kunnen bekijken met alle functies zoals ondertiteling, 
            kwaliteitsinstellingen en meer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
