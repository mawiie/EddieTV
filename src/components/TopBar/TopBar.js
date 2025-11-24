import React from 'react';
import { HiMenu, HiSearch, HiBell, HiUser } from 'react-icons/hi';
import './TopBar.css';

const TopBar = ({ isSidebarCollapsed, onToggleSidebar }) => {
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
        <div className="search-container">
          <HiSearch className="search-icon" />
          <input
            type="search"
            className="search-input"
            placeholder="Zoek shows, kanalen, artiesten..."
            aria-label="Zoeken"
          />
        </div>
      </div>

      <div className="top-bar-right">
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
