import React, { useState } from 'react';
import { HiMenu, HiSearch, HiBell, HiUser } from 'react-icons/hi';
import './TopBar.css';

const TopBar = ({ isSidebarCollapsed, onToggleSidebar, userName }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        {isSidebarCollapsed && (
          <button
            className="hamburger-btn"
            onClick={onToggleSidebar}
            aria-label="Open menu"
          >
            <HiMenu />
          </button>
        )}
      </div>

      <div className="top-bar-center">
        {isSearchOpen ? (
          <div className="search-container expanded">
            <HiSearch className="search-icon" />
            <input
              type="search"
              className="search-input"
              placeholder="Zoek shows, kanalen, artiesten..."
              aria-label="Zoeken"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>
        ) : (
          userName && (
            <div className="welcome-section-large">
              <span className="welcome-text">Welcome back,</span>
              <span className="welcome-username">{userName}!</span>
            </div>
          )
        )}
      </div>

      <div className="top-bar-right">
        {!isSearchOpen && (
          <button
            className="icon-btn"
            aria-label="Zoeken"
            onClick={() => setIsSearchOpen(true)}
          >
            <HiSearch />
          </button>
        )}
        <button className="icon-btn" aria-label="Notificaties">
          <HiBell />
        </button>
        <button className="icon-btn" aria-label="Gebruikersprofiel">
          <HiUser />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
